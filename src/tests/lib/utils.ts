import { execSync } from "child_process";

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
