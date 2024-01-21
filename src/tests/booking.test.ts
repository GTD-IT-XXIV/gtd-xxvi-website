import "server-only";

import {
  generateTestPrismaClient,
  getTestDatabaseUri,
  resetTestDatabase,
} from "@/tests/lib/utils";
import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { db } from "@/server/db";
import { createCaller } from "@/server/root";

vi.mock("server-only", () => ({
  // mock server-only module
}))

vi.mock("@/server/db", async () => {
  const db = await generateTestPrismaClient();
  return { db };
});

describe("tRPC bookingRouter", async () => {
  type Booking = Prisma.BookingCreateInput;
  type Event = Prisma.EventCreateInput;
  type Bundle = Prisma.BundleCreateInput;
  type Timeslot = Prisma.TimeslotCreateInput;

  const event: Event = {
    name: "Test Event 1",
    startDate: new Date(2024, 0),
    endDate: new Date(2024, 0, 1, 23, 59, 59),
    description: "Test event 1 description.",
  };

  const bundle: Bundle = {
    name: "Individual",
    quantity: 1,
    price: 5,
    remainingAmount: null,
    event: { connect: { name: event.name } },
  };

  const timeslot: Timeslot = {
    startTime: new Date(2024, 0, 1, 10),
    endTime: new Date(2024, 0, 1, 11),
    remainingSlots: 3,
    event: { connect: { name: event.name } },
  };

  const booking: Booking = {
    name: "Test User",
    email: "test_user@email.com",
    telegramHandle: "testuser",
    phoneNumber: "89998999",
    quantity: 1,
    event: { connect: { name: event.name } },
    bundle: { create: bundle },
    timeslot: { create: timeslot },
  };

  const caller = createCaller({ db, session: null, headers: new Headers() });

  beforeEach(async () => {
    resetTestDatabase(await getTestDatabaseUri());
  });

  test("getById with valid id returns booking with that id", async () => {
    await db.event.create({ data: event });
    const createdBooking = await db.booking.create({ data: booking });
    const queriedBooking = await caller.booking.getById({
      id: createdBooking.id,
    });

    expect(queriedBooking).toEqual(createdBooking);
  });

  test("getById with invalid id throws error", async () => {
    await db.event.create({ data: event });
    await db.booking.create({ data: booking });
    const id = 2;
    try {
      await caller.booking.getById({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(TRPCError);
      if (error instanceof TRPCError) {
        expect(error.message).toContain(`No booking with id '${id}'`);
      }
    }
  });
});
