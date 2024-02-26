import "server-only";

import { env } from "@/env";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { db } from "@/server/db";

import { MAX_TRANSACTION_RETRIES } from "@/lib/constants";

dayjs.extend(utc);

export async function retryPrismaTransaction<T>(
  transaction: () => Promise<T>,
): Promise<T> {
  for (let retries = 0; retries < MAX_TRANSACTION_RETRIES; retries++) {
    try {
      const booking = await transaction();
      return booking;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        continue;
      }
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred during interactive transaction",
      });
    }
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Interactive transaction reached maximum retries",
  });
}

export function extendPrismaTransaction(tx: Prisma.TransactionClient) {
  return new Proxy(tx, {
    get: (target, property) => {
      if (property === "$transaction") {
        type Transaction = InstanceType<typeof PrismaClient>["$transaction"];
        return (func: Parameters<Transaction>[0]) => func(tx);
      }
      return Reflect.get(target, property) as unknown;
    },
  }) as Prisma.TransactionClient & Pick<PrismaClient, "$transaction">;
}
