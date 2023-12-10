import { PrismaClient } from "@prisma/client";

// Remove eslint disable comment once schema.prisma is initialized
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const db = new PrismaClient({
  log: process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] 
    : ["error"],
});
