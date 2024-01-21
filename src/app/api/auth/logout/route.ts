import * as context from "next/headers";
import { type NextRequest } from "next/server";

import { auth } from "@/server/auth";

export async function POST(request: NextRequest) {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return new Response(null, {
    status: 302,
    headers: { Location: "/dashboard" },
  });
}
