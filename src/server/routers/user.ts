import { TRPCError } from "@trpc/server";
import { LuciaError } from "lucia";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const userRouter = createTRPCRouter({});
