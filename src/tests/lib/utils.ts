import { PrismaClient } from "@prisma/client";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "child_process";

let uri: string | undefined = undefined;

export async function generateTestPrismaClient() {
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
  execSync("pwd", { stdio: "inherit" });
  execSync("npx prisma db push --force-reset", {
    env: {
      ...process.env,
      DATABASE_URL: uri,
    },
    stdio: "inherit",
  });
}
