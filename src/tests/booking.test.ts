// @vitest-environment node
import "server-only";

import {
  generateTestPrismaClient,
  getTestDatabaseUri,
  resetTestDatabase,
} from "@/tests/lib/utils";
import type { Booking, Bundle, Event, Prisma, Timeslot } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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
  close: new Date(2024, 0, 1, 23, 59, 59),
};

const testTimeslot: Omit<Prisma.TimeslotCreateInput, "event"> = {
  startTime: new Date(2024, 0, 1, 10),
  endTime: new Date(2024, 0, 1, 11),
  remainingSlots: 3,
};

const testBooking: Omit<
  Prisma.BookingCreateInput,
  "event" | "bundle" | "timeslot" | "sessionId"
> = {
  name: "Test User",
  email: "test_user@email.com",
  telegramHandle: "testuser",
  phoneNumber: "89998999",
  quantity: 1,
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
        data: { ...testBundle, eventId: event.id },
      });
      const timeslot = await db.timeslot.create({
        data: { ...testTimeslot, eventId: event.id },
      });
      booking = await db.booking.create({
        data: {
          ...testBooking,
          eventId: event.id,
          bundleId: bundle.id,
          timeslotId: timeslot.id,
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
        data: { ...testBundle, eventId: event.id },
      });
      timeslot = await db.timeslot.create({
        data: { ...testTimeslot, eventId: event.id },
      });

      expect(anotherEvent.id).not.toBe(event.id);
    });

    test("with consistent eventIds returns booking", async () => {
      const booking: Omit<Booking, "id" | "created"> = {
        ...testBooking,
        eventId: event.id,
        bundleId: bundle.id,
        timeslotId: timeslot.id,
        sessionId: null,
        valid: true,
      };

      const createdBooking = await caller.booking.create({
        ...testBooking,
        eventId: event.id,
        bundleId: bundle.id,
        timeslotId: timeslot.id,
      });

      expect(createdBooking).toMatchObject(booking);
    });

    describe("with inconsistent", async () => {
      test("different booking.eventId throws error", async () => {
        const promise = caller.booking.create({
          ...testBooking,
          eventId: anotherEvent.id,
          bundleId: bundle.id,
          timeslotId: timeslot.id,
        });
        await expect(promise).rejects.toThrow(TRPCError);
        await expect(promise).rejects.toThrow(
          "Event ids of booking, bundle and timeslot do not match",
        );
      });

      test("different booking.bundle.eventId throws error", async () => {
        const anotherBundle = await db.bundle.create({
          data: { ...testBundle, eventId: anotherEvent.id },
        });
        const promise = caller.booking.create({
          ...testBooking,
          eventId: event.id,
          bundleId: anotherBundle.id,
          timeslotId: timeslot.id,
        });
        await expect(promise).rejects.toThrow(TRPCError);
        await expect(promise).rejects.toThrow(
          "Event ids of booking, bundle and timeslot do not match",
        );
      });

      test("different booking.timeslot.eventId throws error", async () => {
        const anotherTimeslot = await db.timeslot.create({
          data: { ...testTimeslot, eventId: anotherEvent.id },
        });
        const promise = caller.booking.create({
          ...testBooking,
          eventId: event.id,
          bundleId: bundle.id,
          timeslotId: anotherTimeslot.id,
        });
        await expect(promise).rejects.toThrow(TRPCError);
        await expect(promise).rejects.toThrow(
          "Event ids of booking, bundle and timeslot do not match",
        );
      });
    });

    describe("with nonexisting", async () => {
      test("booking.bundleId throws error", async () => {
        const bundleId = 2;
        const promise = caller.booking.create({
          ...testBooking,
          eventId: event.id,
          bundleId,
          timeslotId: timeslot.id,
        });
        await expect(promise).rejects.toThrow(TRPCError);
        await expect(promise).rejects.toThrow(
          "Event ids of booking, bundle and timeslot do not match",
        );
      });

      test("booking.timeslotId throws error", async () => {
        const timeslotId = 2;
        const promise = caller.booking.create({
          ...testBooking,
          eventId: event.id,
          bundleId: bundle.id,
          timeslotId,
        });
        await expect(promise).rejects.toThrow(TRPCError);
        await expect(promise).rejects.toThrow(
          "Event ids of booking, bundle and timeslot do not match",
        );
      });
    });

    describe("with 0 bundle.remainingAmount", async () => {
      let soldOutBundle: Bundle;

      beforeEach(async () => {
        soldOutBundle = await db.bundle.create({
          data: {
            ...testBundle,
            name: "Sold Out Bundle",
            eventId: event.id,
            remainingAmount: 0,
          },
        });
      });

      test("throws error", async () => {
        const promise = caller.booking.create({
          ...testBooking,
          eventId: event.id,
          bundleId: soldOutBundle.id,
          timeslotId: timeslot.id,
        });
        await expect(promise).rejects.toThrow(TRPCError);
        await expect(promise).rejects.toThrow("Insufficient number of bundles");
      });

      test("does not reduce bundle.remainingAmount to below 0", async () => {
        try {
          await caller.booking.create({
            ...testBooking,
            eventId: event.id,
            bundleId: soldOutBundle.id,
            timeslotId: timeslot.id,
          });
        } catch (ignored) {}
        const bundle = await db.bundle.findUnique({
          where: { id: soldOutBundle.id },
        });
        expect(bundle?.remainingAmount).toBe(0);
      });
    });

    describe("with nonnull bundle.remainingAmount", async () => {
      let limitedBundle: Bundle;

      beforeEach(async () => {
        limitedBundle = await db.bundle.create({
          data: {
            ...testBundle,
            name: "Limited Bundle",
            eventId: event.id,
            remainingAmount: 8,
          },
        });
      });

      test("decrements bundle.remainingAmount", async () => {
        await caller.booking.create({
          ...testBooking,
          eventId: event.id,
          bundleId: limitedBundle.id,
          timeslotId: timeslot.id,
        });
        const bundle = await db.bundle.findUnique({
          where: { id: limitedBundle.id },
        });
        expect(bundle?.remainingAmount).toBe(7);
      });
    });

    describe("with 0 timeslot.remainingSlots", async () => {
      let soldOutTimeslot: Timeslot;

      beforeEach(async () => {
        soldOutTimeslot = await db.timeslot.create({
          data: {
            ...testTimeslot,
            endTime: new Date(2024, 0, 1, 12),
            eventId: event.id,
            remainingSlots: 0,
          },
        });
      });

      test("throws error", async () => {
        const promise = caller.booking.create({
          ...testBooking,
          eventId: event.id,
          bundleId: bundle.id,
          timeslotId: soldOutTimeslot.id,
        });
        await expect(promise).rejects.toThrow(TRPCError);
        await expect(promise).rejects.toThrow(
          "Insufficient number of timeslots",
        );
      });

      test("does not reduce bundle.remainingSlots to below 0", async () => {
        try {
          await caller.booking.create({
            ...testBooking,
            eventId: event.id,
            bundleId: bundle.id,
            timeslotId: soldOutTimeslot.id,
          });
        } catch (ignored) {}
        const timeslot = await db.timeslot.findUnique({
          where: { id: soldOutTimeslot.id },
        });
        expect(timeslot?.remainingSlots).toBe(0);
      });
    });
  });
});

describe("Concurrent tRPC bookingRouter", async () => {
  beforeAll(async () => {
    resetTestDatabase(await getTestDatabaseUri());
  });

  describe("create with nonnull bundle.remainingAmount", () => {
    let event: Event, bundle: Bundle, timeslot: Timeslot;

    beforeAll(async () => {
      event = await db.event.create({ data: testEvent });
      bundle = await db.bundle.create({
        data: { ...testBundle, eventId: event.id, remainingAmount: 1 },
      });
      timeslot = await db.timeslot.create({
        data: { ...testTimeslot, eventId: event.id },
      });
    });

    describe.concurrent(
      "never decrements bundle.remainingAmount below 0",
      async () => {
        for (const _ of Array(5).keys()) {
          test("Concurrent call", async ({ expect }) => {
            try {
              await caller.booking.create({
                ...testBooking,
                eventId: event.id,
                bundleId: bundle.id,
                timeslotId: timeslot.id,
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
          "bundle.remainingAmount not below 0",
          async ({ expect }) => {
            const updatedBundle = await db.bundle.findUnique({
              where: { id: bundle.id },
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
