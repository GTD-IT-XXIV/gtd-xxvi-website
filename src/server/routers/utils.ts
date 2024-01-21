import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

import { MAX_TRANSACTION_RETRIES } from "@/lib/constants";

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
        message: (error as Error).message,
        // message: `error: ${(error as Error).message}`,
        // message: "An error occurred during interactive transaction",
      });
    }
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Interactive transaction reached maximum retries",
  });
}
