"use server";

import { synchronizeTicketsToGoogleSheets } from "@/server/routers/utils";

export async function sync() {
  await synchronizeTicketsToGoogleSheets();
}
