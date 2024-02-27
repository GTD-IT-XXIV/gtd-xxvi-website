import { z } from "zod";

export const nameKeySchema = z.string().min(1).max(255);
