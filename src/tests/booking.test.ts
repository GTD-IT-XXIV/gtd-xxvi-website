// @vitest-environment node
import "server-only";

import {
  generateTestPrismaClient,
  getTestDatabaseUri,
  resetTestDatabase,
} from "@/tests/lib/utils";
import type { Booking, Bundle, Event, Prisma, Timeslot } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Session } from "lucia";
import type React from "react";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import { db } from "@/server/db";
import { createCaller } from "@/server/root";

vi.mock("server-only", () => ({
  // mock server-only module
}));

vi.mock("react", async (importOriginal) => {
  const testCache = <T extends (...args: unknown[]) => unknown>(func: T) =>
    func;
  const originalModule = await importOriginal<typeof React>();
  return {
    ...originalModule,
    cache: testCache,
  };
});

vi.mock("@/server/auth", async () => {
  const getPageSession = (): Session => ({
    user: {
      role: "ADMIN",
      userId: "test_user",
      username: "test_user",
      name: "Test User",
      email: "test_user@testemail.com",
    },
    sessionId: "test_session",
    fresh: true,
    state: "active",
    idlePeriodExpiresAt: new Date(),
    activePeriodExpiresAt: new Date(),
  });

  return { getPageSession };
});

vi.mock("@/server/db", async () => {
  const db = await generateTestPrismaClient();
  return { db };
});

const testEvent: Prisma.EventCreateInput = {
  name: "Test Event 1",
  startDate: new Date(2024, 0),
  endDate: new Date(2024, 0, 1, 23, 59, 59),
  description: "Test event 1 description.",
  location: "Test Event Location",
};

const testBundle: Omit<Prisma.BundleCreateInput, "event"> = {
  name: "Test Bundle",
  quantity: 1,
  price: 5,
  remainingAmount: null,
  maxPurchases: 100,
  open: new Date(2024, 0),
  close: new Date(2034, 0, 1, 23, 59, 59),
};

const testTimeslot: Omit<Prisma.TimeslotCreateInput, "event"> = {
  startTime: new Date(2024, 0, 1, 10),
  endTime: new Date(2024, 0, 1, 11),
  remainingSlots: 3,
};

const testBooking: Omit<
  Prisma.BookingCreateInput,
  "names" | "event" | "bundle" | "timeslot" | "sessionId"
> & { names: string[] } = {
  name: "Test User",
  email: "test_user@email.com",
  telegramHandle: "testuser",
  phoneNumber: "89998999",
  names: ["Test User"],
};

const caller = createCaller({ db, headers: new Headers() });

describe("tRPC bookingRouter", async () => {
  beforeEach(async () => {
    resetTestDatabase(await getTestDatabaseUri());
  });

  describe("getById", async () => {
    let booking: Booking;

    beforeEach(async () => {
      const event = await db.event.create({ data: testEvent });
      const bundle = await db.bundle.create({
        data: { ...testBundle, eventName: event.name },
      });
      const timeslot = await db.timeslot.create({
        data: { ...testTimeslot, eventName: event.name },
      });
      booking = await db.booking.create({
        data: {
          ...testBooking,
          eventName: event.name,
          bundleName: bundle.name,
          startTime: timeslot.startTime,
          endTime: timeslot.endTime,
        },
      });
    });

    test("with valid id returns booking with that id", async () => {
      const queriedBooking = await caller.booking.getById({
        id: booking.id,
      });

      expect(queriedBooking).toEqual(booking);
    });

    test("with nonexisting id throws error", async () => {
      const id = 2;
      const promise = caller.booking.getById({ id });
      await expect(promise).rejects.toThrow(TRPCError);
      await expect(promise).rejects.toThrow(`No booking with id '${id}'`);
    });
  });

  describe("create", async () => {
    let event: Event, anotherEvent: Event, bundle: Bundle, timeslot: Timeslot;

    beforeEach(async () => {
      event = await db.event.create({ data: testEvent });
      anotherEvent = await db.event.create({
        data: {
          ...testEvent,
          name: "Test Event 2",
          description: "Test event 2 description.",
        },
      });
      bundle = await db.bundle.create({
        data: { ...testBundle, eventName: event.name },
      });
      timeslot = await db.timeslot.create({
        data: { ...testTimeslot, eventName: event.name },
      });

      expect(anotherEvent.name).not.toBe(event.name);
    });

    test("with consistent event names returns booking", async () => {
      const booking: Omit<Booking, "id" | "created"> = {
        ...testBooking,
        eventName: event.name,
        bundleName: bundle.name,
        startTime: timeslot.startTime,
        endTime: timeslot.endTime,
        sessionId: null,
        valid: true,
      };

      const createdBooking = await caller.booking.create({
        ...testBooking,
        eventName: event.name,
        bundleName: bundle.name,
        startTime: timeslot.startTime,
        endTime: timeslot.endTime,
      });

      expect(createdBooking).toMatchObject(booking);
    });

    describe("with inconsistent", async () => {
      test("event throws error", async () => {
        const promise = caller.booking.create({
          ...testBooking,
          eventName: anotherEvent.name,
          bundleName: bundle.name,
          startTime: timeslot.startTime,
          endTime: timeslot.endTime,
        });
        await expect(promise).rejects.toThrow(TRPCError);
        await expect(promise).rejects.toThrow("Bundle or timeslot not found");
      });

      describe("with 0 bundle remaining amount", async () => {
        let soldOutBundle: Bundle;

        beforeEach(async () => {
          soldOutBundle = await db.bundle.create({
            data: {
              ...testBundle,
              name: "Sold Out Bundle",
              eventName: event.name,
              remainingAmount: 0,
            },
          });
        });

        test("throws error", async () => {
          const promise = caller.booking.create({
            ...testBooking,
            eventName: event.name,
            bundleName: soldOutBundle.name,
            startTime: timeslot.startTime,
            endTime: timeslot.endTime,
          });
          await expect(promise).rejects.toThrow(TRPCError);
          await expect(promise).rejects.toThrow(
            "Insufficient number of bundles",
          );
        });

        test("does not reduce bundle remaining amount to below 0", async () => {
          try {
            await caller.booking.create({
              ...testBooking,
              eventName: event.name,
              bundleName: soldOutBundle.name,
              startTime: timeslot.startTime,
              endTime: timeslot.endTime,
            });
          } catch (ignored) {}
          const bundle = await db.bundle.findUnique({
            where: {
              name_eventName: {
                name: soldOutBundle.name,
                eventName: event.name,
              },
            },
          });
          expect(bundle?.remainingAmount).toBe(0);
        });
      });

      describe("with nonnull bundle remaining amount", async () => {
        let limitedBundle: Bundle;

        beforeEach(async () => {
          limitedBundle = await db.bundle.create({
            data: {
              ...testBundle,
              name: "Limited Bundle",
              eventName: event.name,
              remainingAmount: 8,
            },
          });
        });

        test("decrements bundle remaining amount", async () => {
          await caller.booking.create({
            ...testBooking,
            eventName: event.name,
            bundleName: limitedBundle.name,
            startTime: timeslot.startTime,
            endTime: timeslot.endTime,
          });
          const bundle = await db.bundle.findUnique({
            where: {
              name_eventName: {
                name: limitedBundle.name,
                eventName: event.name,
              },
            },
          });
          expect(bundle?.remainingAmount).toBe(7);
        });
      });

      describe("with 0 timeslot remaining slots", async () => {
        let soldOutTimeslot: Timeslot;

        beforeEach(async () => {
          soldOutTimeslot = await db.timeslot.create({
            data: {
              ...testTimeslot,
              endTime: new Date(2024, 0, 1, 12),
              eventName: event.name,
              remainingSlots: 0,
            },
          });
        });

        test("throws error", async () => {
          const promise = caller.booking.create({
            ...testBooking,
            eventName: event.name,
            bundleName: bundle.name,
            startTime: soldOutTimeslot.startTime,
            endTime: soldOutTimeslot.endTime,
          });
          await expect(promise).rejects.toThrow(TRPCError);
          await expect(promise).rejects.toThrow(
            "Insufficient number of timeslots",
          );
        });

        test("does not reduce timeslot remaining slots to below 0", async () => {
          try {
            await caller.booking.create({
              ...testBooking,
              eventName: event.name,
              bundleName: bundle.name,
              startTime: soldOutTimeslot.startTime,
              endTime: soldOutTimeslot.endTime,
            });
          } catch (ignored) {}
          const updatedTimeslot = await db.timeslot.findUnique({
            where: {
              startTime_endTime_eventName: {
                startTime: soldOutTimeslot.startTime,
                endTime: soldOutTimeslot.endTime,
                eventName: event.name,
              },
            },
          });
          expect(updatedTimeslot?.remainingSlots).toBe(0);
        });
      });
    });
  });

  describe.skip("Concurrent tRPC bookingRouter", async () => {
    beforeAll(async () => {
      resetTestDatabase(await getTestDatabaseUri());
    });

    describe("create with nonnull bundle.remainingAmount", () => {
      let event: Event, bundle: Bundle, timeslot: Timeslot;

      beforeAll(async () => {
        event = await db.event.create({ data: testEvent });
        bundle = await db.bundle.create({
          data: { ...testBundle, eventName: event.name, remainingAmount: 1 },
        });
        timeslot = await db.timeslot.create({
          data: { ...testTimeslot, eventName: event.name },
        });
      });

      describe.concurrent(
        "never decrements bundle remaining amount below 0",
        async () => {
          for (const _ of Array(5).keys()) {
            test("Concurrent call", async ({ expect }) => {
              try {
                await caller.booking.create({
                  ...testBooking,
                  eventName: event.name,
                  bundleName: bundle.name,
                  startTime: timeslot.startTime,
                  endTime: timeslot.endTime,
                });
              } catch (error) {
                expect(error).toBeInstanceOf(TRPCError);
                if (error instanceof TRPCError) {
                  expect(error.message).toContain(
                    "Insufficient number of bundles",
                  );
                }
              }
            }, 10_000);
          }

          test.sequential(
            "bundle remaining amount not below 0",
            async ({ expect }) => {
              const updatedBundle = await db.bundle.findUnique({
                where: {
                  name_eventName: {
                    name: bundle.name,
                    eventName: event.name,
                  },
                },
              });
              expect(updatedBundle?.remainingAmount).toBe(0);
            },
          );
        },
      );
    });

    afterAll(async () => {
      resetTestDatabase(await getTestDatabaseUri());
    });
  });
});
