import { PrismaClient } from "@prisma/client";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "node:child_process";

let uri: string | undefined = undefined;

export async function generateTestPrismaClient() {
  const container = await new PostgreSqlContainer(
    "postgres:15.1-bullseye",
  ).start();
  uri = container.getConnectionUri();

  const db = new PrismaClient({ datasourceUrl: uri });

  execSync("npx prisma db push", {
    env: {
      ...process.env,
      DATABASE_URL: uri,
      DIRECT_URL: uri,
    },
    stdio: "ignore",
  });

  return db;
}

export async function getTestDatabaseUri(): Promise<string> {
  if (uri === undefined) {
    await generateTestPrismaClient();
  }
  return uri!;
}

export function resetTestDatabase(uri: string) {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Not in test environment!");
  }
  execSync("npx prisma db push --force-reset", {
    env: {
      ...process.env,
      DATABASE_URL: uri,
      DIRECT_URL: uri,
    },
    stdio: "ignore",
  });
}
