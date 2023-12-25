import { env } from "@/env";
import "server-only";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);
