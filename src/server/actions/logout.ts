"use server";

import * as context from "next/headers";

import { auth } from "@/server/auth";

export async function logout() {
  const authRequest = auth.handleRequest("POST", context);
  const session = await authRequest.validate();
  if (!session) {
    throw new Error("Unauthorized");
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
}
