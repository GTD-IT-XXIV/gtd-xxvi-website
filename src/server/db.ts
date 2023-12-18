import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
