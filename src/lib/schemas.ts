import { z } from "zod";

export const eventIdSchema = z.coerce.number().positive();
export type EventId = z.infer<typeof eventIdSchema>;

export const bundlesPageQueryParamsSchema = z
  .object({
    id: z.number().positive(),
    timeslotId: z.number().positive(),
  })
  .array();
export type BundlesPageQueryParams = z.infer<
  typeof bundlesPageQueryParamsSchema
>;
