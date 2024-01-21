import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "child_process";

let uri: string | undefined = undefined;

async function generateTestPrismaClient() {
  const container = await new PostgreSqlContainer("postgres:15.1").start();
  uri = container.getConnectionUri();

  const db = new PrismaClient({ datasourceUrl: uri });

  execSync("npx prisma db push", {
    env: {
      ...process.env,
      DATABASE_URL: uri,
    },
    stdio: "inherit",
  });

  return db;
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ??
  (process.env.NODE_ENV !== "test"
    ? new PrismaClient({
        log:
          env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      })
    : await generateTestPrismaClient());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export async function getTestDatabaseUri(): Promise<string> {
  if (uri === undefined) {
    await generateTestPrismaClient();
  }
  return uri!;
}
