import { z } from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.function(z.tuple([]), z.string()),
})

export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const EventScalarFieldEnumSchema = z.enum(['id','name','description','startDate','endDate']);

export const BundleScalarFieldEnumSchema = z.enum(['id','name','details','price','quantity','remainingAmount','eventId']);

export const TimeslotScalarFieldEnumSchema = z.enum(['id','startTime','endTime','remainingSlots','eventId']);

export const TicketScalarFieldEnumSchema = z.enum(['id','bookingId','bundleId','timeslotId','paymentIntentId']);

export const BookingScalarFieldEnumSchema = z.enum(['id','name','email','telegramHandle','phoneNumber','valid','created','paymentIntentId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// BUNDLE SCHEMA
/////////////////////////////////////////

export const BundleSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  details: z.string().array(),
  price: z.instanceof(Prisma.Decimal, { message: "Field 'price' must be a Decimal. Location: ['Models', 'Bundle']"}),
  /**
   * Number of slots this bundle occupies; number of people in this bundle
   */
  quantity: z.number().int(),
  /**
   * Number of bundles available; number is limited by timeslots if this is null
   */
  remainingAmount: z.number().int().nullable(),
  eventId: z.number().int(),
})

export type Bundle = z.infer<typeof BundleSchema>

/////////////////////////////////////////
// TIMESLOT SCHEMA
/////////////////////////////////////////

export const TimeslotSchema = z.object({
  id: z.number().int(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int(),
  eventId: z.number().int(),
})

export type Timeslot = z.infer<typeof TimeslotSchema>

/////////////////////////////////////////
// TICKET SCHEMA
/////////////////////////////////////////

export const TicketSchema = z.object({
  id: z.number().int(),
  bookingId: z.number().int(),
  bundleId: z.number().int(),
  timeslotId: z.number().int(),
  /**
   * Reference for Stripe PaymentIntent ID; not a foreign key
   */
  paymentIntentId: z.string(),
})

export type Ticket = z.infer<typeof TicketSchema>

/////////////////////////////////////////
// BOOKING SCHEMA
/////////////////////////////////////////

export const BookingSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  /**
   * Validity of the booking; Stripe webhook will check this; can be manually set to invalidate the booking
   */
  valid: z.boolean(),
  created: z.coerce.date(),
  /**
   * Reference for Stripe PaymentIntent ID; not a foreign key
   */
  paymentIntentId: z.string().nullable(),
})

export type Booking = z.infer<typeof BookingSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  bundles: z.union([z.boolean(),z.lazy(() => BundleFindManyArgsSchema)]).optional(),
  timeslots: z.union([z.boolean(),z.lazy(() => TimeslotFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z.object({
  bundles: z.boolean().optional(),
  timeslots: z.boolean().optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  bundles: z.union([z.boolean(),z.lazy(() => BundleFindManyArgsSchema)]).optional(),
  timeslots: z.union([z.boolean(),z.lazy(() => TimeslotFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BUNDLE
//------------------------------------------------------

export const BundleIncludeSchema: z.ZodType<Prisma.BundleInclude> = z.object({
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  tickets: z.union([z.boolean(),z.lazy(() => TicketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BundleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BundleArgsSchema: z.ZodType<Prisma.BundleDefaultArgs> = z.object({
  select: z.lazy(() => BundleSelectSchema).optional(),
  include: z.lazy(() => BundleIncludeSchema).optional(),
}).strict();

export const BundleCountOutputTypeArgsSchema: z.ZodType<Prisma.BundleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BundleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BundleCountOutputTypeSelectSchema: z.ZodType<Prisma.BundleCountOutputTypeSelect> = z.object({
  tickets: z.boolean().optional(),
}).strict();

export const BundleSelectSchema: z.ZodType<Prisma.BundleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  details: z.boolean().optional(),
  price: z.boolean().optional(),
  quantity: z.boolean().optional(),
  remainingAmount: z.boolean().optional(),
  eventId: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  tickets: z.union([z.boolean(),z.lazy(() => TicketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BundleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TIMESLOT
//------------------------------------------------------

export const TimeslotIncludeSchema: z.ZodType<Prisma.TimeslotInclude> = z.object({
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  tickets: z.union([z.boolean(),z.lazy(() => TicketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TimeslotCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TimeslotArgsSchema: z.ZodType<Prisma.TimeslotDefaultArgs> = z.object({
  select: z.lazy(() => TimeslotSelectSchema).optional(),
  include: z.lazy(() => TimeslotIncludeSchema).optional(),
}).strict();

export const TimeslotCountOutputTypeArgsSchema: z.ZodType<Prisma.TimeslotCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TimeslotCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TimeslotCountOutputTypeSelectSchema: z.ZodType<Prisma.TimeslotCountOutputTypeSelect> = z.object({
  tickets: z.boolean().optional(),
}).strict();

export const TimeslotSelectSchema: z.ZodType<Prisma.TimeslotSelect> = z.object({
  id: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  remainingSlots: z.boolean().optional(),
  eventId: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  tickets: z.union([z.boolean(),z.lazy(() => TicketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TimeslotCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TICKET
//------------------------------------------------------

export const TicketIncludeSchema: z.ZodType<Prisma.TicketInclude> = z.object({
  booking: z.union([z.boolean(),z.lazy(() => BookingArgsSchema)]).optional(),
  bundle: z.union([z.boolean(),z.lazy(() => BundleArgsSchema)]).optional(),
  timeslot: z.union([z.boolean(),z.lazy(() => TimeslotArgsSchema)]).optional(),
}).strict()

export const TicketArgsSchema: z.ZodType<Prisma.TicketDefaultArgs> = z.object({
  select: z.lazy(() => TicketSelectSchema).optional(),
  include: z.lazy(() => TicketIncludeSchema).optional(),
}).strict();

export const TicketSelectSchema: z.ZodType<Prisma.TicketSelect> = z.object({
  id: z.boolean().optional(),
  bookingId: z.boolean().optional(),
  bundleId: z.boolean().optional(),
  timeslotId: z.boolean().optional(),
  paymentIntentId: z.boolean().optional(),
  booking: z.union([z.boolean(),z.lazy(() => BookingArgsSchema)]).optional(),
  bundle: z.union([z.boolean(),z.lazy(() => BundleArgsSchema)]).optional(),
  timeslot: z.union([z.boolean(),z.lazy(() => TimeslotArgsSchema)]).optional(),
}).strict()

// BOOKING
//------------------------------------------------------

export const BookingIncludeSchema: z.ZodType<Prisma.BookingInclude> = z.object({
  tickets: z.union([z.boolean(),z.lazy(() => TicketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BookingCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BookingArgsSchema: z.ZodType<Prisma.BookingDefaultArgs> = z.object({
  select: z.lazy(() => BookingSelectSchema).optional(),
  include: z.lazy(() => BookingIncludeSchema).optional(),
}).strict();

export const BookingCountOutputTypeArgsSchema: z.ZodType<Prisma.BookingCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BookingCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BookingCountOutputTypeSelectSchema: z.ZodType<Prisma.BookingCountOutputTypeSelect> = z.object({
  tickets: z.boolean().optional(),
}).strict();

export const BookingSelectSchema: z.ZodType<Prisma.BookingSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  telegramHandle: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  valid: z.boolean().optional(),
  created: z.boolean().optional(),
  paymentIntentId: z.boolean().optional(),
  tickets: z.union([z.boolean(),z.lazy(() => TicketFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BookingCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bundles: z.lazy(() => BundleListRelationFilterSchema).optional(),
  timeslots: z.lazy(() => TimeslotListRelationFilterSchema).optional()
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  bundles: z.lazy(() => BundleOrderByRelationAggregateInputSchema).optional(),
  timeslots: z.lazy(() => TimeslotOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bundles: z.lazy(() => BundleListRelationFilterSchema).optional(),
  timeslots: z.lazy(() => TimeslotListRelationFilterSchema).optional()
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BundleWhereInputSchema: z.ZodType<Prisma.BundleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BundleWhereInputSchema),z.lazy(() => BundleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BundleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BundleWhereInputSchema),z.lazy(() => BundleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  details: z.lazy(() => StringNullableListFilterSchema).optional(),
  price: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  remainingAmount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketListRelationFilterSchema).optional()
}).strict();

export const BundleOrderByWithRelationInputSchema: z.ZodType<Prisma.BundleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  remainingAmount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional(),
  tickets: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BundleWhereUniqueInputSchema: z.ZodType<Prisma.BundleWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name_eventId: z.lazy(() => BundleNameEventIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name_eventId: z.lazy(() => BundleNameEventIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name_eventId: z.lazy(() => BundleNameEventIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => BundleWhereInputSchema),z.lazy(() => BundleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BundleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BundleWhereInputSchema),z.lazy(() => BundleWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  details: z.lazy(() => StringNullableListFilterSchema).optional(),
  price: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  remainingAmount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketListRelationFilterSchema).optional()
}).strict());

export const BundleOrderByWithAggregationInputSchema: z.ZodType<Prisma.BundleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  remainingAmount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BundleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BundleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BundleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BundleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BundleSumOrderByAggregateInputSchema).optional()
}).strict();

export const BundleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BundleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BundleScalarWhereWithAggregatesInputSchema),z.lazy(() => BundleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BundleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BundleScalarWhereWithAggregatesInputSchema),z.lazy(() => BundleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  details: z.lazy(() => StringNullableListFilterSchema).optional(),
  price: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  remainingAmount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  eventId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TimeslotWhereInputSchema: z.ZodType<Prisma.TimeslotWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TimeslotWhereInputSchema),z.lazy(() => TimeslotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TimeslotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TimeslotWhereInputSchema),z.lazy(() => TimeslotWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  remainingSlots: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketListRelationFilterSchema).optional()
}).strict();

export const TimeslotOrderByWithRelationInputSchema: z.ZodType<Prisma.TimeslotOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  remainingSlots: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional(),
  tickets: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TimeslotWhereUniqueInputSchema: z.ZodType<Prisma.TimeslotWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TimeslotWhereInputSchema),z.lazy(() => TimeslotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TimeslotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TimeslotWhereInputSchema),z.lazy(() => TimeslotWhereInputSchema).array() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  remainingSlots: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketListRelationFilterSchema).optional()
}).strict());

export const TimeslotOrderByWithAggregationInputSchema: z.ZodType<Prisma.TimeslotOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  remainingSlots: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TimeslotCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TimeslotAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TimeslotMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TimeslotMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TimeslotSumOrderByAggregateInputSchema).optional()
}).strict();

export const TimeslotScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TimeslotScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TimeslotScalarWhereWithAggregatesInputSchema),z.lazy(() => TimeslotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TimeslotScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TimeslotScalarWhereWithAggregatesInputSchema),z.lazy(() => TimeslotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  remainingSlots: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  eventId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TicketWhereInputSchema: z.ZodType<Prisma.TicketWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TicketWhereInputSchema),z.lazy(() => TicketWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TicketWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TicketWhereInputSchema),z.lazy(() => TicketWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bookingId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bundleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  timeslotId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  paymentIntentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  booking: z.union([ z.lazy(() => BookingRelationFilterSchema),z.lazy(() => BookingWhereInputSchema) ]).optional(),
  bundle: z.union([ z.lazy(() => BundleRelationFilterSchema),z.lazy(() => BundleWhereInputSchema) ]).optional(),
  timeslot: z.union([ z.lazy(() => TimeslotRelationFilterSchema),z.lazy(() => TimeslotWhereInputSchema) ]).optional(),
}).strict();

export const TicketOrderByWithRelationInputSchema: z.ZodType<Prisma.TicketOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  bundleId: z.lazy(() => SortOrderSchema).optional(),
  timeslotId: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.lazy(() => SortOrderSchema).optional(),
  booking: z.lazy(() => BookingOrderByWithRelationInputSchema).optional(),
  bundle: z.lazy(() => BundleOrderByWithRelationInputSchema).optional(),
  timeslot: z.lazy(() => TimeslotOrderByWithRelationInputSchema).optional()
}).strict();

export const TicketWhereUniqueInputSchema: z.ZodType<Prisma.TicketWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TicketWhereInputSchema),z.lazy(() => TicketWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TicketWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TicketWhereInputSchema),z.lazy(() => TicketWhereInputSchema).array() ]).optional(),
  bookingId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  bundleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  timeslotId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  paymentIntentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  booking: z.union([ z.lazy(() => BookingRelationFilterSchema),z.lazy(() => BookingWhereInputSchema) ]).optional(),
  bundle: z.union([ z.lazy(() => BundleRelationFilterSchema),z.lazy(() => BundleWhereInputSchema) ]).optional(),
  timeslot: z.union([ z.lazy(() => TimeslotRelationFilterSchema),z.lazy(() => TimeslotWhereInputSchema) ]).optional(),
}).strict());

export const TicketOrderByWithAggregationInputSchema: z.ZodType<Prisma.TicketOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  bundleId: z.lazy(() => SortOrderSchema).optional(),
  timeslotId: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TicketCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TicketAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TicketMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TicketMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TicketSumOrderByAggregateInputSchema).optional()
}).strict();

export const TicketScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TicketScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TicketScalarWhereWithAggregatesInputSchema),z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TicketScalarWhereWithAggregatesInputSchema),z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  bookingId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  bundleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  timeslotId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  paymentIntentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BookingWhereInputSchema: z.ZodType<Prisma.BookingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  telegramHandle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  valid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  paymentIntentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tickets: z.lazy(() => TicketListRelationFilterSchema).optional()
}).strict();

export const BookingOrderByWithRelationInputSchema: z.ZodType<Prisma.BookingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  telegramHandle: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  valid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BookingWhereUniqueInputSchema: z.ZodType<Prisma.BookingWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  telegramHandle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  valid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  paymentIntentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tickets: z.lazy(() => TicketListRelationFilterSchema).optional()
}).strict());

export const BookingOrderByWithAggregationInputSchema: z.ZodType<Prisma.BookingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  telegramHandle: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  valid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => BookingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BookingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BookingSumOrderByAggregateInputSchema).optional()
}).strict();

export const BookingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BookingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BookingScalarWhereWithAggregatesInputSchema),z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingScalarWhereWithAggregatesInputSchema),z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  telegramHandle: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  valid: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  paymentIntentId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  bundles: z.lazy(() => BundleCreateNestedManyWithoutEventInputSchema).optional(),
  timeslots: z.lazy(() => TimeslotCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  bundles: z.lazy(() => BundleUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  timeslots: z.lazy(() => TimeslotUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bundles: z.lazy(() => BundleUpdateManyWithoutEventNestedInputSchema).optional(),
  timeslots: z.lazy(() => TimeslotUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bundles: z.lazy(() => BundleUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  timeslots: z.lazy(() => TimeslotUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BundleCreateInputSchema: z.ZodType<Prisma.BundleCreateInput> = z.object({
  name: z.string(),
  details: z.union([ z.lazy(() => BundleCreatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().int(),
  remainingAmount: z.number().int().optional().nullable(),
  event: z.lazy(() => EventCreateNestedOneWithoutBundlesInputSchema),
  tickets: z.lazy(() => TicketCreateNestedManyWithoutBundleInputSchema).optional()
}).strict();

export const BundleUncheckedCreateInputSchema: z.ZodType<Prisma.BundleUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  details: z.union([ z.lazy(() => BundleCreatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().int(),
  remainingAmount: z.number().int().optional().nullable(),
  eventId: z.number().int(),
  tickets: z.lazy(() => TicketUncheckedCreateNestedManyWithoutBundleInputSchema).optional()
}).strict();

export const BundleUpdateInputSchema: z.ZodType<Prisma.BundleUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutBundlesNestedInputSchema).optional(),
  tickets: z.lazy(() => TicketUpdateManyWithoutBundleNestedInputSchema).optional()
}).strict();

export const BundleUncheckedUpdateInputSchema: z.ZodType<Prisma.BundleUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketUncheckedUpdateManyWithoutBundleNestedInputSchema).optional()
}).strict();

export const BundleCreateManyInputSchema: z.ZodType<Prisma.BundleCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  details: z.union([ z.lazy(() => BundleCreatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().int(),
  remainingAmount: z.number().int().optional().nullable(),
  eventId: z.number().int()
}).strict();

export const BundleUpdateManyMutationInputSchema: z.ZodType<Prisma.BundleUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BundleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BundleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TimeslotCreateInputSchema: z.ZodType<Prisma.TimeslotCreateInput> = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int(),
  event: z.lazy(() => EventCreateNestedOneWithoutTimeslotsInputSchema),
  tickets: z.lazy(() => TicketCreateNestedManyWithoutTimeslotInputSchema).optional()
}).strict();

export const TimeslotUncheckedCreateInputSchema: z.ZodType<Prisma.TimeslotUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int(),
  eventId: z.number().int(),
  tickets: z.lazy(() => TicketUncheckedCreateNestedManyWithoutTimeslotInputSchema).optional()
}).strict();

export const TimeslotUpdateInputSchema: z.ZodType<Prisma.TimeslotUpdateInput> = z.object({
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutTimeslotsNestedInputSchema).optional(),
  tickets: z.lazy(() => TicketUpdateManyWithoutTimeslotNestedInputSchema).optional()
}).strict();

export const TimeslotUncheckedUpdateInputSchema: z.ZodType<Prisma.TimeslotUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketUncheckedUpdateManyWithoutTimeslotNestedInputSchema).optional()
}).strict();

export const TimeslotCreateManyInputSchema: z.ZodType<Prisma.TimeslotCreateManyInput> = z.object({
  id: z.number().int().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int(),
  eventId: z.number().int()
}).strict();

export const TimeslotUpdateManyMutationInputSchema: z.ZodType<Prisma.TimeslotUpdateManyMutationInput> = z.object({
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TimeslotUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TimeslotUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketCreateInputSchema: z.ZodType<Prisma.TicketCreateInput> = z.object({
  paymentIntentId: z.string(),
  booking: z.lazy(() => BookingCreateNestedOneWithoutTicketsInputSchema),
  bundle: z.lazy(() => BundleCreateNestedOneWithoutTicketsInputSchema),
  timeslot: z.lazy(() => TimeslotCreateNestedOneWithoutTicketsInputSchema)
}).strict();

export const TicketUncheckedCreateInputSchema: z.ZodType<Prisma.TicketUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  bookingId: z.number().int(),
  bundleId: z.number().int(),
  timeslotId: z.number().int(),
  paymentIntentId: z.string()
}).strict();

export const TicketUpdateInputSchema: z.ZodType<Prisma.TicketUpdateInput> = z.object({
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateOneRequiredWithoutTicketsNestedInputSchema).optional(),
  bundle: z.lazy(() => BundleUpdateOneRequiredWithoutTicketsNestedInputSchema).optional(),
  timeslot: z.lazy(() => TimeslotUpdateOneRequiredWithoutTicketsNestedInputSchema).optional()
}).strict();

export const TicketUncheckedUpdateInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bundleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timeslotId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketCreateManyInputSchema: z.ZodType<Prisma.TicketCreateManyInput> = z.object({
  id: z.number().int().optional(),
  bookingId: z.number().int(),
  bundleId: z.number().int(),
  timeslotId: z.number().int(),
  paymentIntentId: z.string()
}).strict();

export const TicketUpdateManyMutationInputSchema: z.ZodType<Prisma.TicketUpdateManyMutationInput> = z.object({
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bundleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timeslotId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateInputSchema: z.ZodType<Prisma.BookingCreateInput> = z.object({
  name: z.string(),
  email: z.string(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  valid: z.boolean().optional(),
  created: z.coerce.date().optional(),
  paymentIntentId: z.string().optional().nullable(),
  tickets: z.lazy(() => TicketCreateNestedManyWithoutBookingInputSchema).optional()
}).strict();

export const BookingUncheckedCreateInputSchema: z.ZodType<Prisma.BookingUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  valid: z.boolean().optional(),
  created: z.coerce.date().optional(),
  paymentIntentId: z.string().optional().nullable(),
  tickets: z.lazy(() => TicketUncheckedCreateNestedManyWithoutBookingInputSchema).optional()
}).strict();

export const BookingUpdateInputSchema: z.ZodType<Prisma.BookingUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramHandle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  valid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tickets: z.lazy(() => TicketUpdateManyWithoutBookingNestedInputSchema).optional()
}).strict();

export const BookingUncheckedUpdateInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramHandle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  valid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tickets: z.lazy(() => TicketUncheckedUpdateManyWithoutBookingNestedInputSchema).optional()
}).strict();

export const BookingCreateManyInputSchema: z.ZodType<Prisma.BookingCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  valid: z.boolean().optional(),
  created: z.coerce.date().optional(),
  paymentIntentId: z.string().optional().nullable()
}).strict();

export const BookingUpdateManyMutationInputSchema: z.ZodType<Prisma.BookingUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramHandle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  valid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BookingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramHandle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  valid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BundleListRelationFilterSchema: z.ZodType<Prisma.BundleListRelationFilter> = z.object({
  every: z.lazy(() => BundleWhereInputSchema).optional(),
  some: z.lazy(() => BundleWhereInputSchema).optional(),
  none: z.lazy(() => BundleWhereInputSchema).optional()
}).strict();

export const TimeslotListRelationFilterSchema: z.ZodType<Prisma.TimeslotListRelationFilter> = z.object({
  every: z.lazy(() => TimeslotWhereInputSchema).optional(),
  some: z.lazy(() => TimeslotWhereInputSchema).optional(),
  none: z.lazy(() => TimeslotWhereInputSchema).optional()
}).strict();

export const BundleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BundleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeslotOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TimeslotOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EventRelationFilterSchema: z.ZodType<Prisma.EventRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional(),
  isNot: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const TicketListRelationFilterSchema: z.ZodType<Prisma.TicketListRelationFilter> = z.object({
  every: z.lazy(() => TicketWhereInputSchema).optional(),
  some: z.lazy(() => TicketWhereInputSchema).optional(),
  none: z.lazy(() => TicketWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const TicketOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TicketOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BundleNameEventIdCompoundUniqueInputSchema: z.ZodType<Prisma.BundleNameEventIdCompoundUniqueInput> = z.object({
  name: z.string(),
  eventId: z.number()
}).strict();

export const BundleCountOrderByAggregateInputSchema: z.ZodType<Prisma.BundleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  remainingAmount: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BundleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BundleAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  remainingAmount: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BundleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BundleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  remainingAmount: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BundleMinOrderByAggregateInputSchema: z.ZodType<Prisma.BundleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  remainingAmount: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BundleSumOrderByAggregateInputSchema: z.ZodType<Prisma.BundleSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  remainingAmount: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const TimeslotCountOrderByAggregateInputSchema: z.ZodType<Prisma.TimeslotCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  remainingSlots: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeslotAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TimeslotAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  remainingSlots: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeslotMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TimeslotMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  remainingSlots: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeslotMinOrderByAggregateInputSchema: z.ZodType<Prisma.TimeslotMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  remainingSlots: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TimeslotSumOrderByAggregateInputSchema: z.ZodType<Prisma.TimeslotSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  remainingSlots: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingRelationFilterSchema: z.ZodType<Prisma.BookingRelationFilter> = z.object({
  is: z.lazy(() => BookingWhereInputSchema).optional(),
  isNot: z.lazy(() => BookingWhereInputSchema).optional()
}).strict();

export const BundleRelationFilterSchema: z.ZodType<Prisma.BundleRelationFilter> = z.object({
  is: z.lazy(() => BundleWhereInputSchema).optional(),
  isNot: z.lazy(() => BundleWhereInputSchema).optional()
}).strict();

export const TimeslotRelationFilterSchema: z.ZodType<Prisma.TimeslotRelationFilter> = z.object({
  is: z.lazy(() => TimeslotWhereInputSchema).optional(),
  isNot: z.lazy(() => TimeslotWhereInputSchema).optional()
}).strict();

export const TicketCountOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  bundleId: z.lazy(() => SortOrderSchema).optional(),
  timeslotId: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TicketAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TicketAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  bundleId: z.lazy(() => SortOrderSchema).optional(),
  timeslotId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TicketMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TicketMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  bundleId: z.lazy(() => SortOrderSchema).optional(),
  timeslotId: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TicketMinOrderByAggregateInputSchema: z.ZodType<Prisma.TicketMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  bundleId: z.lazy(() => SortOrderSchema).optional(),
  timeslotId: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TicketSumOrderByAggregateInputSchema: z.ZodType<Prisma.TicketSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  bundleId: z.lazy(() => SortOrderSchema).optional(),
  timeslotId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BookingCountOrderByAggregateInputSchema: z.ZodType<Prisma.BookingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  telegramHandle: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  valid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BookingAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BookingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  telegramHandle: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  valid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingMinOrderByAggregateInputSchema: z.ZodType<Prisma.BookingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  telegramHandle: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  valid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  paymentIntentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingSumOrderByAggregateInputSchema: z.ZodType<Prisma.BookingSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BundleCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.BundleCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => BundleCreateWithoutEventInputSchema),z.lazy(() => BundleCreateWithoutEventInputSchema).array(),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BundleCreateOrConnectWithoutEventInputSchema),z.lazy(() => BundleCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BundleCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TimeslotCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.TimeslotCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => TimeslotCreateWithoutEventInputSchema),z.lazy(() => TimeslotCreateWithoutEventInputSchema).array(),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeslotCreateOrConnectWithoutEventInputSchema),z.lazy(() => TimeslotCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TimeslotCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BundleUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.BundleUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => BundleCreateWithoutEventInputSchema),z.lazy(() => BundleCreateWithoutEventInputSchema).array(),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BundleCreateOrConnectWithoutEventInputSchema),z.lazy(() => BundleCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BundleCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TimeslotUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.TimeslotUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => TimeslotCreateWithoutEventInputSchema),z.lazy(() => TimeslotCreateWithoutEventInputSchema).array(),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeslotCreateOrConnectWithoutEventInputSchema),z.lazy(() => TimeslotCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TimeslotCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BundleUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.BundleUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => BundleCreateWithoutEventInputSchema),z.lazy(() => BundleCreateWithoutEventInputSchema).array(),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BundleCreateOrConnectWithoutEventInputSchema),z.lazy(() => BundleCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BundleUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => BundleUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BundleCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BundleUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => BundleUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BundleUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => BundleUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BundleScalarWhereInputSchema),z.lazy(() => BundleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TimeslotUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.TimeslotUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => TimeslotCreateWithoutEventInputSchema),z.lazy(() => TimeslotCreateWithoutEventInputSchema).array(),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeslotCreateOrConnectWithoutEventInputSchema),z.lazy(() => TimeslotCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TimeslotUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => TimeslotUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TimeslotCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TimeslotUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => TimeslotUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TimeslotUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => TimeslotUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TimeslotScalarWhereInputSchema),z.lazy(() => TimeslotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BundleUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.BundleUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => BundleCreateWithoutEventInputSchema),z.lazy(() => BundleCreateWithoutEventInputSchema).array(),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BundleCreateOrConnectWithoutEventInputSchema),z.lazy(() => BundleCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BundleUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => BundleUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BundleCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BundleWhereUniqueInputSchema),z.lazy(() => BundleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BundleUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => BundleUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BundleUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => BundleUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BundleScalarWhereInputSchema),z.lazy(() => BundleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TimeslotUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.TimeslotUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => TimeslotCreateWithoutEventInputSchema),z.lazy(() => TimeslotCreateWithoutEventInputSchema).array(),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TimeslotCreateOrConnectWithoutEventInputSchema),z.lazy(() => TimeslotCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TimeslotUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => TimeslotUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TimeslotCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TimeslotWhereUniqueInputSchema),z.lazy(() => TimeslotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TimeslotUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => TimeslotUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TimeslotUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => TimeslotUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TimeslotScalarWhereInputSchema),z.lazy(() => TimeslotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BundleCreatedetailsInputSchema: z.ZodType<Prisma.BundleCreatedetailsInput> = z.object({
  set: z.string().array()
}).strict();

export const EventCreateNestedOneWithoutBundlesInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutBundlesInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutBundlesInputSchema),z.lazy(() => EventUncheckedCreateWithoutBundlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutBundlesInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const TicketCreateNestedManyWithoutBundleInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutBundleInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutBundleInputSchema),z.lazy(() => TicketCreateWithoutBundleInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutBundleInputSchema),z.lazy(() => TicketCreateOrConnectWithoutBundleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyBundleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TicketUncheckedCreateNestedManyWithoutBundleInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutBundleInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutBundleInputSchema),z.lazy(() => TicketCreateWithoutBundleInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutBundleInputSchema),z.lazy(() => TicketCreateOrConnectWithoutBundleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyBundleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BundleUpdatedetailsInputSchema: z.ZodType<Prisma.BundleUpdatedetailsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EventUpdateOneRequiredWithoutBundlesNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutBundlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutBundlesInputSchema),z.lazy(() => EventUncheckedCreateWithoutBundlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutBundlesInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutBundlesInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutBundlesInputSchema),z.lazy(() => EventUpdateWithoutBundlesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutBundlesInputSchema) ]).optional(),
}).strict();

export const TicketUpdateManyWithoutBundleNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutBundleNestedInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutBundleInputSchema),z.lazy(() => TicketCreateWithoutBundleInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutBundleInputSchema),z.lazy(() => TicketCreateOrConnectWithoutBundleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TicketUpsertWithWhereUniqueWithoutBundleInputSchema),z.lazy(() => TicketUpsertWithWhereUniqueWithoutBundleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyBundleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TicketUpdateWithWhereUniqueWithoutBundleInputSchema),z.lazy(() => TicketUpdateWithWhereUniqueWithoutBundleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TicketUpdateManyWithWhereWithoutBundleInputSchema),z.lazy(() => TicketUpdateManyWithWhereWithoutBundleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TicketScalarWhereInputSchema),z.lazy(() => TicketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TicketUncheckedUpdateManyWithoutBundleNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutBundleNestedInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutBundleInputSchema),z.lazy(() => TicketCreateWithoutBundleInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutBundleInputSchema),z.lazy(() => TicketCreateOrConnectWithoutBundleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TicketUpsertWithWhereUniqueWithoutBundleInputSchema),z.lazy(() => TicketUpsertWithWhereUniqueWithoutBundleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyBundleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TicketUpdateWithWhereUniqueWithoutBundleInputSchema),z.lazy(() => TicketUpdateWithWhereUniqueWithoutBundleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TicketUpdateManyWithWhereWithoutBundleInputSchema),z.lazy(() => TicketUpdateManyWithWhereWithoutBundleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TicketScalarWhereInputSchema),z.lazy(() => TicketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutTimeslotsInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutTimeslotsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTimeslotsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTimeslotsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutTimeslotsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const TicketCreateNestedManyWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutTimeslotInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutTimeslotInputSchema),z.lazy(() => TicketCreateWithoutTimeslotInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutTimeslotInputSchema),z.lazy(() => TicketCreateOrConnectWithoutTimeslotInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyTimeslotInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TicketUncheckedCreateNestedManyWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutTimeslotInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutTimeslotInputSchema),z.lazy(() => TicketCreateWithoutTimeslotInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutTimeslotInputSchema),z.lazy(() => TicketCreateOrConnectWithoutTimeslotInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyTimeslotInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateOneRequiredWithoutTimeslotsNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutTimeslotsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTimeslotsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTimeslotsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutTimeslotsInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutTimeslotsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutTimeslotsInputSchema),z.lazy(() => EventUpdateWithoutTimeslotsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTimeslotsInputSchema) ]).optional(),
}).strict();

export const TicketUpdateManyWithoutTimeslotNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutTimeslotNestedInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutTimeslotInputSchema),z.lazy(() => TicketCreateWithoutTimeslotInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutTimeslotInputSchema),z.lazy(() => TicketCreateOrConnectWithoutTimeslotInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TicketUpsertWithWhereUniqueWithoutTimeslotInputSchema),z.lazy(() => TicketUpsertWithWhereUniqueWithoutTimeslotInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyTimeslotInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TicketUpdateWithWhereUniqueWithoutTimeslotInputSchema),z.lazy(() => TicketUpdateWithWhereUniqueWithoutTimeslotInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TicketUpdateManyWithWhereWithoutTimeslotInputSchema),z.lazy(() => TicketUpdateManyWithWhereWithoutTimeslotInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TicketScalarWhereInputSchema),z.lazy(() => TicketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TicketUncheckedUpdateManyWithoutTimeslotNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutTimeslotNestedInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutTimeslotInputSchema),z.lazy(() => TicketCreateWithoutTimeslotInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutTimeslotInputSchema),z.lazy(() => TicketCreateOrConnectWithoutTimeslotInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TicketUpsertWithWhereUniqueWithoutTimeslotInputSchema),z.lazy(() => TicketUpsertWithWhereUniqueWithoutTimeslotInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyTimeslotInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TicketUpdateWithWhereUniqueWithoutTimeslotInputSchema),z.lazy(() => TicketUpdateWithWhereUniqueWithoutTimeslotInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TicketUpdateManyWithWhereWithoutTimeslotInputSchema),z.lazy(() => TicketUpdateManyWithWhereWithoutTimeslotInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TicketScalarWhereInputSchema),z.lazy(() => TicketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingCreateNestedOneWithoutTicketsInputSchema: z.ZodType<Prisma.BookingCreateNestedOneWithoutTicketsInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutTicketsInputSchema),z.lazy(() => BookingUncheckedCreateWithoutTicketsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutTicketsInputSchema).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional()
}).strict();

export const BundleCreateNestedOneWithoutTicketsInputSchema: z.ZodType<Prisma.BundleCreateNestedOneWithoutTicketsInput> = z.object({
  create: z.union([ z.lazy(() => BundleCreateWithoutTicketsInputSchema),z.lazy(() => BundleUncheckedCreateWithoutTicketsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BundleCreateOrConnectWithoutTicketsInputSchema).optional(),
  connect: z.lazy(() => BundleWhereUniqueInputSchema).optional()
}).strict();

export const TimeslotCreateNestedOneWithoutTicketsInputSchema: z.ZodType<Prisma.TimeslotCreateNestedOneWithoutTicketsInput> = z.object({
  create: z.union([ z.lazy(() => TimeslotCreateWithoutTicketsInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutTicketsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TimeslotCreateOrConnectWithoutTicketsInputSchema).optional(),
  connect: z.lazy(() => TimeslotWhereUniqueInputSchema).optional()
}).strict();

export const BookingUpdateOneRequiredWithoutTicketsNestedInputSchema: z.ZodType<Prisma.BookingUpdateOneRequiredWithoutTicketsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutTicketsInputSchema),z.lazy(() => BookingUncheckedCreateWithoutTicketsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutTicketsInputSchema).optional(),
  upsert: z.lazy(() => BookingUpsertWithoutTicketsInputSchema).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BookingUpdateToOneWithWhereWithoutTicketsInputSchema),z.lazy(() => BookingUpdateWithoutTicketsInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutTicketsInputSchema) ]).optional(),
}).strict();

export const BundleUpdateOneRequiredWithoutTicketsNestedInputSchema: z.ZodType<Prisma.BundleUpdateOneRequiredWithoutTicketsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BundleCreateWithoutTicketsInputSchema),z.lazy(() => BundleUncheckedCreateWithoutTicketsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BundleCreateOrConnectWithoutTicketsInputSchema).optional(),
  upsert: z.lazy(() => BundleUpsertWithoutTicketsInputSchema).optional(),
  connect: z.lazy(() => BundleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BundleUpdateToOneWithWhereWithoutTicketsInputSchema),z.lazy(() => BundleUpdateWithoutTicketsInputSchema),z.lazy(() => BundleUncheckedUpdateWithoutTicketsInputSchema) ]).optional(),
}).strict();

export const TimeslotUpdateOneRequiredWithoutTicketsNestedInputSchema: z.ZodType<Prisma.TimeslotUpdateOneRequiredWithoutTicketsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TimeslotCreateWithoutTicketsInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutTicketsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TimeslotCreateOrConnectWithoutTicketsInputSchema).optional(),
  upsert: z.lazy(() => TimeslotUpsertWithoutTicketsInputSchema).optional(),
  connect: z.lazy(() => TimeslotWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TimeslotUpdateToOneWithWhereWithoutTicketsInputSchema),z.lazy(() => TimeslotUpdateWithoutTicketsInputSchema),z.lazy(() => TimeslotUncheckedUpdateWithoutTicketsInputSchema) ]).optional(),
}).strict();

export const TicketCreateNestedManyWithoutBookingInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutBookingInputSchema),z.lazy(() => TicketCreateWithoutBookingInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutBookingInputSchema),z.lazy(() => TicketCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyBookingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TicketUncheckedCreateNestedManyWithoutBookingInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutBookingInputSchema),z.lazy(() => TicketCreateWithoutBookingInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutBookingInputSchema),z.lazy(() => TicketCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyBookingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const TicketUpdateManyWithoutBookingNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutBookingInputSchema),z.lazy(() => TicketCreateWithoutBookingInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutBookingInputSchema),z.lazy(() => TicketCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TicketUpsertWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => TicketUpsertWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyBookingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TicketUpdateWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => TicketUpdateWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TicketUpdateManyWithWhereWithoutBookingInputSchema),z.lazy(() => TicketUpdateManyWithWhereWithoutBookingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TicketScalarWhereInputSchema),z.lazy(() => TicketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TicketUncheckedUpdateManyWithoutBookingNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => TicketCreateWithoutBookingInputSchema),z.lazy(() => TicketCreateWithoutBookingInputSchema).array(),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TicketCreateOrConnectWithoutBookingInputSchema),z.lazy(() => TicketCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TicketUpsertWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => TicketUpsertWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TicketCreateManyBookingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TicketWhereUniqueInputSchema),z.lazy(() => TicketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TicketUpdateWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => TicketUpdateWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TicketUpdateManyWithWhereWithoutBookingInputSchema),z.lazy(() => TicketUpdateManyWithWhereWithoutBookingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TicketScalarWhereInputSchema),z.lazy(() => TicketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BundleCreateWithoutEventInputSchema: z.ZodType<Prisma.BundleCreateWithoutEventInput> = z.object({
  name: z.string(),
  details: z.union([ z.lazy(() => BundleCreatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().int(),
  remainingAmount: z.number().int().optional().nullable(),
  tickets: z.lazy(() => TicketCreateNestedManyWithoutBundleInputSchema).optional()
}).strict();

export const BundleUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.BundleUncheckedCreateWithoutEventInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  details: z.union([ z.lazy(() => BundleCreatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().int(),
  remainingAmount: z.number().int().optional().nullable(),
  tickets: z.lazy(() => TicketUncheckedCreateNestedManyWithoutBundleInputSchema).optional()
}).strict();

export const BundleCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.BundleCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => BundleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BundleCreateWithoutEventInputSchema),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const BundleCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.BundleCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BundleCreateManyEventInputSchema),z.lazy(() => BundleCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TimeslotCreateWithoutEventInputSchema: z.ZodType<Prisma.TimeslotCreateWithoutEventInput> = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int(),
  tickets: z.lazy(() => TicketCreateNestedManyWithoutTimeslotInputSchema).optional()
}).strict();

export const TimeslotUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.TimeslotUncheckedCreateWithoutEventInput> = z.object({
  id: z.number().int().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int(),
  tickets: z.lazy(() => TicketUncheckedCreateNestedManyWithoutTimeslotInputSchema).optional()
}).strict();

export const TimeslotCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.TimeslotCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => TimeslotWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TimeslotCreateWithoutEventInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const TimeslotCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.TimeslotCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TimeslotCreateManyEventInputSchema),z.lazy(() => TimeslotCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BundleUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.BundleUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => BundleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BundleUpdateWithoutEventInputSchema),z.lazy(() => BundleUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => BundleCreateWithoutEventInputSchema),z.lazy(() => BundleUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const BundleUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.BundleUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => BundleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BundleUpdateWithoutEventInputSchema),z.lazy(() => BundleUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const BundleUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.BundleUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => BundleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BundleUpdateManyMutationInputSchema),z.lazy(() => BundleUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const BundleScalarWhereInputSchema: z.ZodType<Prisma.BundleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BundleScalarWhereInputSchema),z.lazy(() => BundleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BundleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BundleScalarWhereInputSchema),z.lazy(() => BundleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  details: z.lazy(() => StringNullableListFilterSchema).optional(),
  price: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  remainingAmount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const TimeslotUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.TimeslotUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => TimeslotWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TimeslotUpdateWithoutEventInputSchema),z.lazy(() => TimeslotUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => TimeslotCreateWithoutEventInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const TimeslotUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.TimeslotUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => TimeslotWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TimeslotUpdateWithoutEventInputSchema),z.lazy(() => TimeslotUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const TimeslotUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.TimeslotUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => TimeslotScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TimeslotUpdateManyMutationInputSchema),z.lazy(() => TimeslotUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const TimeslotScalarWhereInputSchema: z.ZodType<Prisma.TimeslotScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TimeslotScalarWhereInputSchema),z.lazy(() => TimeslotScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TimeslotScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TimeslotScalarWhereInputSchema),z.lazy(() => TimeslotScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  remainingSlots: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const EventCreateWithoutBundlesInputSchema: z.ZodType<Prisma.EventCreateWithoutBundlesInput> = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  timeslots: z.lazy(() => TimeslotCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutBundlesInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutBundlesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  timeslots: z.lazy(() => TimeslotUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutBundlesInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutBundlesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutBundlesInputSchema),z.lazy(() => EventUncheckedCreateWithoutBundlesInputSchema) ]),
}).strict();

export const TicketCreateWithoutBundleInputSchema: z.ZodType<Prisma.TicketCreateWithoutBundleInput> = z.object({
  paymentIntentId: z.string(),
  booking: z.lazy(() => BookingCreateNestedOneWithoutTicketsInputSchema),
  timeslot: z.lazy(() => TimeslotCreateNestedOneWithoutTicketsInputSchema)
}).strict();

export const TicketUncheckedCreateWithoutBundleInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutBundleInput> = z.object({
  id: z.number().int().optional(),
  bookingId: z.number().int(),
  timeslotId: z.number().int(),
  paymentIntentId: z.string()
}).strict();

export const TicketCreateOrConnectWithoutBundleInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutBundleInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TicketCreateWithoutBundleInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema) ]),
}).strict();

export const TicketCreateManyBundleInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyBundleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TicketCreateManyBundleInputSchema),z.lazy(() => TicketCreateManyBundleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventUpsertWithoutBundlesInputSchema: z.ZodType<Prisma.EventUpsertWithoutBundlesInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutBundlesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutBundlesInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutBundlesInputSchema),z.lazy(() => EventUncheckedCreateWithoutBundlesInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutBundlesInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutBundlesInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutBundlesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutBundlesInputSchema) ]),
}).strict();

export const EventUpdateWithoutBundlesInputSchema: z.ZodType<Prisma.EventUpdateWithoutBundlesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timeslots: z.lazy(() => TimeslotUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutBundlesInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutBundlesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timeslots: z.lazy(() => TimeslotUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const TicketUpsertWithWhereUniqueWithoutBundleInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutBundleInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TicketUpdateWithoutBundleInputSchema),z.lazy(() => TicketUncheckedUpdateWithoutBundleInputSchema) ]),
  create: z.union([ z.lazy(() => TicketCreateWithoutBundleInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBundleInputSchema) ]),
}).strict();

export const TicketUpdateWithWhereUniqueWithoutBundleInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutBundleInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TicketUpdateWithoutBundleInputSchema),z.lazy(() => TicketUncheckedUpdateWithoutBundleInputSchema) ]),
}).strict();

export const TicketUpdateManyWithWhereWithoutBundleInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutBundleInput> = z.object({
  where: z.lazy(() => TicketScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TicketUpdateManyMutationInputSchema),z.lazy(() => TicketUncheckedUpdateManyWithoutBundleInputSchema) ]),
}).strict();

export const TicketScalarWhereInputSchema: z.ZodType<Prisma.TicketScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TicketScalarWhereInputSchema),z.lazy(() => TicketScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TicketScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TicketScalarWhereInputSchema),z.lazy(() => TicketScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bookingId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bundleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  timeslotId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  paymentIntentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const EventCreateWithoutTimeslotsInputSchema: z.ZodType<Prisma.EventCreateWithoutTimeslotsInput> = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  bundles: z.lazy(() => BundleCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutTimeslotsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutTimeslotsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  bundles: z.lazy(() => BundleUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutTimeslotsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutTimeslotsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutTimeslotsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTimeslotsInputSchema) ]),
}).strict();

export const TicketCreateWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketCreateWithoutTimeslotInput> = z.object({
  paymentIntentId: z.string(),
  booking: z.lazy(() => BookingCreateNestedOneWithoutTicketsInputSchema),
  bundle: z.lazy(() => BundleCreateNestedOneWithoutTicketsInputSchema)
}).strict();

export const TicketUncheckedCreateWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutTimeslotInput> = z.object({
  id: z.number().int().optional(),
  bookingId: z.number().int(),
  bundleId: z.number().int(),
  paymentIntentId: z.string()
}).strict();

export const TicketCreateOrConnectWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutTimeslotInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TicketCreateWithoutTimeslotInputSchema),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema) ]),
}).strict();

export const TicketCreateManyTimeslotInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyTimeslotInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TicketCreateManyTimeslotInputSchema),z.lazy(() => TicketCreateManyTimeslotInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventUpsertWithoutTimeslotsInputSchema: z.ZodType<Prisma.EventUpsertWithoutTimeslotsInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutTimeslotsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTimeslotsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutTimeslotsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTimeslotsInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutTimeslotsInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutTimeslotsInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutTimeslotsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTimeslotsInputSchema) ]),
}).strict();

export const EventUpdateWithoutTimeslotsInputSchema: z.ZodType<Prisma.EventUpdateWithoutTimeslotsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bundles: z.lazy(() => BundleUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutTimeslotsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutTimeslotsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bundles: z.lazy(() => BundleUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const TicketUpsertWithWhereUniqueWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutTimeslotInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TicketUpdateWithoutTimeslotInputSchema),z.lazy(() => TicketUncheckedUpdateWithoutTimeslotInputSchema) ]),
  create: z.union([ z.lazy(() => TicketCreateWithoutTimeslotInputSchema),z.lazy(() => TicketUncheckedCreateWithoutTimeslotInputSchema) ]),
}).strict();

export const TicketUpdateWithWhereUniqueWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutTimeslotInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TicketUpdateWithoutTimeslotInputSchema),z.lazy(() => TicketUncheckedUpdateWithoutTimeslotInputSchema) ]),
}).strict();

export const TicketUpdateManyWithWhereWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutTimeslotInput> = z.object({
  where: z.lazy(() => TicketScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TicketUpdateManyMutationInputSchema),z.lazy(() => TicketUncheckedUpdateManyWithoutTimeslotInputSchema) ]),
}).strict();

export const BookingCreateWithoutTicketsInputSchema: z.ZodType<Prisma.BookingCreateWithoutTicketsInput> = z.object({
  name: z.string(),
  email: z.string(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  valid: z.boolean().optional(),
  created: z.coerce.date().optional(),
  paymentIntentId: z.string().optional().nullable()
}).strict();

export const BookingUncheckedCreateWithoutTicketsInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutTicketsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  valid: z.boolean().optional(),
  created: z.coerce.date().optional(),
  paymentIntentId: z.string().optional().nullable()
}).strict();

export const BookingCreateOrConnectWithoutTicketsInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutTicketsInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutTicketsInputSchema),z.lazy(() => BookingUncheckedCreateWithoutTicketsInputSchema) ]),
}).strict();

export const BundleCreateWithoutTicketsInputSchema: z.ZodType<Prisma.BundleCreateWithoutTicketsInput> = z.object({
  name: z.string(),
  details: z.union([ z.lazy(() => BundleCreatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().int(),
  remainingAmount: z.number().int().optional().nullable(),
  event: z.lazy(() => EventCreateNestedOneWithoutBundlesInputSchema)
}).strict();

export const BundleUncheckedCreateWithoutTicketsInputSchema: z.ZodType<Prisma.BundleUncheckedCreateWithoutTicketsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  details: z.union([ z.lazy(() => BundleCreatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().int(),
  remainingAmount: z.number().int().optional().nullable(),
  eventId: z.number().int()
}).strict();

export const BundleCreateOrConnectWithoutTicketsInputSchema: z.ZodType<Prisma.BundleCreateOrConnectWithoutTicketsInput> = z.object({
  where: z.lazy(() => BundleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BundleCreateWithoutTicketsInputSchema),z.lazy(() => BundleUncheckedCreateWithoutTicketsInputSchema) ]),
}).strict();

export const TimeslotCreateWithoutTicketsInputSchema: z.ZodType<Prisma.TimeslotCreateWithoutTicketsInput> = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int(),
  event: z.lazy(() => EventCreateNestedOneWithoutTimeslotsInputSchema)
}).strict();

export const TimeslotUncheckedCreateWithoutTicketsInputSchema: z.ZodType<Prisma.TimeslotUncheckedCreateWithoutTicketsInput> = z.object({
  id: z.number().int().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int(),
  eventId: z.number().int()
}).strict();

export const TimeslotCreateOrConnectWithoutTicketsInputSchema: z.ZodType<Prisma.TimeslotCreateOrConnectWithoutTicketsInput> = z.object({
  where: z.lazy(() => TimeslotWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TimeslotCreateWithoutTicketsInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutTicketsInputSchema) ]),
}).strict();

export const BookingUpsertWithoutTicketsInputSchema: z.ZodType<Prisma.BookingUpsertWithoutTicketsInput> = z.object({
  update: z.union([ z.lazy(() => BookingUpdateWithoutTicketsInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutTicketsInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutTicketsInputSchema),z.lazy(() => BookingUncheckedCreateWithoutTicketsInputSchema) ]),
  where: z.lazy(() => BookingWhereInputSchema).optional()
}).strict();

export const BookingUpdateToOneWithWhereWithoutTicketsInputSchema: z.ZodType<Prisma.BookingUpdateToOneWithWhereWithoutTicketsInput> = z.object({
  where: z.lazy(() => BookingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BookingUpdateWithoutTicketsInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutTicketsInputSchema) ]),
}).strict();

export const BookingUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.BookingUpdateWithoutTicketsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramHandle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  valid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BookingUncheckedUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutTicketsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramHandle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  valid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BundleUpsertWithoutTicketsInputSchema: z.ZodType<Prisma.BundleUpsertWithoutTicketsInput> = z.object({
  update: z.union([ z.lazy(() => BundleUpdateWithoutTicketsInputSchema),z.lazy(() => BundleUncheckedUpdateWithoutTicketsInputSchema) ]),
  create: z.union([ z.lazy(() => BundleCreateWithoutTicketsInputSchema),z.lazy(() => BundleUncheckedCreateWithoutTicketsInputSchema) ]),
  where: z.lazy(() => BundleWhereInputSchema).optional()
}).strict();

export const BundleUpdateToOneWithWhereWithoutTicketsInputSchema: z.ZodType<Prisma.BundleUpdateToOneWithWhereWithoutTicketsInput> = z.object({
  where: z.lazy(() => BundleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BundleUpdateWithoutTicketsInputSchema),z.lazy(() => BundleUncheckedUpdateWithoutTicketsInputSchema) ]),
}).strict();

export const BundleUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.BundleUpdateWithoutTicketsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutBundlesNestedInputSchema).optional()
}).strict();

export const BundleUncheckedUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.BundleUncheckedUpdateWithoutTicketsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TimeslotUpsertWithoutTicketsInputSchema: z.ZodType<Prisma.TimeslotUpsertWithoutTicketsInput> = z.object({
  update: z.union([ z.lazy(() => TimeslotUpdateWithoutTicketsInputSchema),z.lazy(() => TimeslotUncheckedUpdateWithoutTicketsInputSchema) ]),
  create: z.union([ z.lazy(() => TimeslotCreateWithoutTicketsInputSchema),z.lazy(() => TimeslotUncheckedCreateWithoutTicketsInputSchema) ]),
  where: z.lazy(() => TimeslotWhereInputSchema).optional()
}).strict();

export const TimeslotUpdateToOneWithWhereWithoutTicketsInputSchema: z.ZodType<Prisma.TimeslotUpdateToOneWithWhereWithoutTicketsInput> = z.object({
  where: z.lazy(() => TimeslotWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TimeslotUpdateWithoutTicketsInputSchema),z.lazy(() => TimeslotUncheckedUpdateWithoutTicketsInputSchema) ]),
}).strict();

export const TimeslotUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.TimeslotUpdateWithoutTicketsInput> = z.object({
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutTimeslotsNestedInputSchema).optional()
}).strict();

export const TimeslotUncheckedUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.TimeslotUncheckedUpdateWithoutTicketsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketCreateWithoutBookingInputSchema: z.ZodType<Prisma.TicketCreateWithoutBookingInput> = z.object({
  paymentIntentId: z.string(),
  bundle: z.lazy(() => BundleCreateNestedOneWithoutTicketsInputSchema),
  timeslot: z.lazy(() => TimeslotCreateNestedOneWithoutTicketsInputSchema)
}).strict();

export const TicketUncheckedCreateWithoutBookingInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutBookingInput> = z.object({
  id: z.number().int().optional(),
  bundleId: z.number().int(),
  timeslotId: z.number().int(),
  paymentIntentId: z.string()
}).strict();

export const TicketCreateOrConnectWithoutBookingInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutBookingInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TicketCreateWithoutBookingInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const TicketCreateManyBookingInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyBookingInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TicketCreateManyBookingInputSchema),z.lazy(() => TicketCreateManyBookingInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TicketUpsertWithWhereUniqueWithoutBookingInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutBookingInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TicketUpdateWithoutBookingInputSchema),z.lazy(() => TicketUncheckedUpdateWithoutBookingInputSchema) ]),
  create: z.union([ z.lazy(() => TicketCreateWithoutBookingInputSchema),z.lazy(() => TicketUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const TicketUpdateWithWhereUniqueWithoutBookingInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutBookingInput> = z.object({
  where: z.lazy(() => TicketWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TicketUpdateWithoutBookingInputSchema),z.lazy(() => TicketUncheckedUpdateWithoutBookingInputSchema) ]),
}).strict();

export const TicketUpdateManyWithWhereWithoutBookingInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutBookingInput> = z.object({
  where: z.lazy(() => TicketScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TicketUpdateManyMutationInputSchema),z.lazy(() => TicketUncheckedUpdateManyWithoutBookingInputSchema) ]),
}).strict();

export const BundleCreateManyEventInputSchema: z.ZodType<Prisma.BundleCreateManyEventInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  details: z.union([ z.lazy(() => BundleCreatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().int(),
  remainingAmount: z.number().int().optional().nullable()
}).strict();

export const TimeslotCreateManyEventInputSchema: z.ZodType<Prisma.TimeslotCreateManyEventInput> = z.object({
  id: z.number().int().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  remainingSlots: z.number().int()
}).strict();

export const BundleUpdateWithoutEventInputSchema: z.ZodType<Prisma.BundleUpdateWithoutEventInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tickets: z.lazy(() => TicketUpdateManyWithoutBundleNestedInputSchema).optional()
}).strict();

export const BundleUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.BundleUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tickets: z.lazy(() => TicketUncheckedUpdateManyWithoutBundleNestedInputSchema).optional()
}).strict();

export const BundleUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.BundleUncheckedUpdateManyWithoutEventInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => BundleUpdatedetailsInputSchema),z.string().array() ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingAmount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TimeslotUpdateWithoutEventInputSchema: z.ZodType<Prisma.TimeslotUpdateWithoutEventInput> = z.object({
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketUpdateManyWithoutTimeslotNestedInputSchema).optional()
}).strict();

export const TimeslotUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.TimeslotUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tickets: z.lazy(() => TicketUncheckedUpdateManyWithoutTimeslotNestedInputSchema).optional()
}).strict();

export const TimeslotUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.TimeslotUncheckedUpdateManyWithoutEventInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remainingSlots: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketCreateManyBundleInputSchema: z.ZodType<Prisma.TicketCreateManyBundleInput> = z.object({
  id: z.number().int().optional(),
  bookingId: z.number().int(),
  timeslotId: z.number().int(),
  paymentIntentId: z.string()
}).strict();

export const TicketUpdateWithoutBundleInputSchema: z.ZodType<Prisma.TicketUpdateWithoutBundleInput> = z.object({
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateOneRequiredWithoutTicketsNestedInputSchema).optional(),
  timeslot: z.lazy(() => TimeslotUpdateOneRequiredWithoutTicketsNestedInputSchema).optional()
}).strict();

export const TicketUncheckedUpdateWithoutBundleInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutBundleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timeslotId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketUncheckedUpdateManyWithoutBundleInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutBundleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timeslotId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketCreateManyTimeslotInputSchema: z.ZodType<Prisma.TicketCreateManyTimeslotInput> = z.object({
  id: z.number().int().optional(),
  bookingId: z.number().int(),
  bundleId: z.number().int(),
  paymentIntentId: z.string()
}).strict();

export const TicketUpdateWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketUpdateWithoutTimeslotInput> = z.object({
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateOneRequiredWithoutTicketsNestedInputSchema).optional(),
  bundle: z.lazy(() => BundleUpdateOneRequiredWithoutTicketsNestedInputSchema).optional()
}).strict();

export const TicketUncheckedUpdateWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutTimeslotInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bundleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketUncheckedUpdateManyWithoutTimeslotInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutTimeslotInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bundleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketCreateManyBookingInputSchema: z.ZodType<Prisma.TicketCreateManyBookingInput> = z.object({
  id: z.number().int().optional(),
  bundleId: z.number().int(),
  timeslotId: z.number().int(),
  paymentIntentId: z.string()
}).strict();

export const TicketUpdateWithoutBookingInputSchema: z.ZodType<Prisma.TicketUpdateWithoutBookingInput> = z.object({
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bundle: z.lazy(() => BundleUpdateOneRequiredWithoutTicketsNestedInputSchema).optional(),
  timeslot: z.lazy(() => TimeslotUpdateOneRequiredWithoutTicketsNestedInputSchema).optional()
}).strict();

export const TicketUncheckedUpdateWithoutBookingInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bundleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timeslotId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TicketUncheckedUpdateManyWithoutBookingInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutBookingInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bundleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timeslotId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIntentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const BundleFindFirstArgsSchema: z.ZodType<Prisma.BundleFindFirstArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  where: BundleWhereInputSchema.optional(),
  orderBy: z.union([ BundleOrderByWithRelationInputSchema.array(),BundleOrderByWithRelationInputSchema ]).optional(),
  cursor: BundleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BundleScalarFieldEnumSchema,BundleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BundleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BundleFindFirstOrThrowArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  where: BundleWhereInputSchema.optional(),
  orderBy: z.union([ BundleOrderByWithRelationInputSchema.array(),BundleOrderByWithRelationInputSchema ]).optional(),
  cursor: BundleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BundleScalarFieldEnumSchema,BundleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BundleFindManyArgsSchema: z.ZodType<Prisma.BundleFindManyArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  where: BundleWhereInputSchema.optional(),
  orderBy: z.union([ BundleOrderByWithRelationInputSchema.array(),BundleOrderByWithRelationInputSchema ]).optional(),
  cursor: BundleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BundleScalarFieldEnumSchema,BundleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BundleAggregateArgsSchema: z.ZodType<Prisma.BundleAggregateArgs> = z.object({
  where: BundleWhereInputSchema.optional(),
  orderBy: z.union([ BundleOrderByWithRelationInputSchema.array(),BundleOrderByWithRelationInputSchema ]).optional(),
  cursor: BundleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BundleGroupByArgsSchema: z.ZodType<Prisma.BundleGroupByArgs> = z.object({
  where: BundleWhereInputSchema.optional(),
  orderBy: z.union([ BundleOrderByWithAggregationInputSchema.array(),BundleOrderByWithAggregationInputSchema ]).optional(),
  by: BundleScalarFieldEnumSchema.array(),
  having: BundleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BundleFindUniqueArgsSchema: z.ZodType<Prisma.BundleFindUniqueArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  where: BundleWhereUniqueInputSchema,
}).strict() ;

export const BundleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BundleFindUniqueOrThrowArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  where: BundleWhereUniqueInputSchema,
}).strict() ;

export const TimeslotFindFirstArgsSchema: z.ZodType<Prisma.TimeslotFindFirstArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  where: TimeslotWhereInputSchema.optional(),
  orderBy: z.union([ TimeslotOrderByWithRelationInputSchema.array(),TimeslotOrderByWithRelationInputSchema ]).optional(),
  cursor: TimeslotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TimeslotScalarFieldEnumSchema,TimeslotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TimeslotFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TimeslotFindFirstOrThrowArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  where: TimeslotWhereInputSchema.optional(),
  orderBy: z.union([ TimeslotOrderByWithRelationInputSchema.array(),TimeslotOrderByWithRelationInputSchema ]).optional(),
  cursor: TimeslotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TimeslotScalarFieldEnumSchema,TimeslotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TimeslotFindManyArgsSchema: z.ZodType<Prisma.TimeslotFindManyArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  where: TimeslotWhereInputSchema.optional(),
  orderBy: z.union([ TimeslotOrderByWithRelationInputSchema.array(),TimeslotOrderByWithRelationInputSchema ]).optional(),
  cursor: TimeslotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TimeslotScalarFieldEnumSchema,TimeslotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TimeslotAggregateArgsSchema: z.ZodType<Prisma.TimeslotAggregateArgs> = z.object({
  where: TimeslotWhereInputSchema.optional(),
  orderBy: z.union([ TimeslotOrderByWithRelationInputSchema.array(),TimeslotOrderByWithRelationInputSchema ]).optional(),
  cursor: TimeslotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TimeslotGroupByArgsSchema: z.ZodType<Prisma.TimeslotGroupByArgs> = z.object({
  where: TimeslotWhereInputSchema.optional(),
  orderBy: z.union([ TimeslotOrderByWithAggregationInputSchema.array(),TimeslotOrderByWithAggregationInputSchema ]).optional(),
  by: TimeslotScalarFieldEnumSchema.array(),
  having: TimeslotScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TimeslotFindUniqueArgsSchema: z.ZodType<Prisma.TimeslotFindUniqueArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  where: TimeslotWhereUniqueInputSchema,
}).strict() ;

export const TimeslotFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TimeslotFindUniqueOrThrowArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  where: TimeslotWhereUniqueInputSchema,
}).strict() ;

export const TicketFindFirstArgsSchema: z.ZodType<Prisma.TicketFindFirstArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  where: TicketWhereInputSchema.optional(),
  orderBy: z.union([ TicketOrderByWithRelationInputSchema.array(),TicketOrderByWithRelationInputSchema ]).optional(),
  cursor: TicketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TicketScalarFieldEnumSchema,TicketScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TicketFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TicketFindFirstOrThrowArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  where: TicketWhereInputSchema.optional(),
  orderBy: z.union([ TicketOrderByWithRelationInputSchema.array(),TicketOrderByWithRelationInputSchema ]).optional(),
  cursor: TicketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TicketScalarFieldEnumSchema,TicketScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TicketFindManyArgsSchema: z.ZodType<Prisma.TicketFindManyArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  where: TicketWhereInputSchema.optional(),
  orderBy: z.union([ TicketOrderByWithRelationInputSchema.array(),TicketOrderByWithRelationInputSchema ]).optional(),
  cursor: TicketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TicketScalarFieldEnumSchema,TicketScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TicketAggregateArgsSchema: z.ZodType<Prisma.TicketAggregateArgs> = z.object({
  where: TicketWhereInputSchema.optional(),
  orderBy: z.union([ TicketOrderByWithRelationInputSchema.array(),TicketOrderByWithRelationInputSchema ]).optional(),
  cursor: TicketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TicketGroupByArgsSchema: z.ZodType<Prisma.TicketGroupByArgs> = z.object({
  where: TicketWhereInputSchema.optional(),
  orderBy: z.union([ TicketOrderByWithAggregationInputSchema.array(),TicketOrderByWithAggregationInputSchema ]).optional(),
  by: TicketScalarFieldEnumSchema.array(),
  having: TicketScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TicketFindUniqueArgsSchema: z.ZodType<Prisma.TicketFindUniqueArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  where: TicketWhereUniqueInputSchema,
}).strict() ;

export const TicketFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TicketFindUniqueOrThrowArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  where: TicketWhereUniqueInputSchema,
}).strict() ;

export const BookingFindFirstArgsSchema: z.ZodType<Prisma.BookingFindFirstArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookingScalarFieldEnumSchema,BookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BookingFindFirstOrThrowArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookingScalarFieldEnumSchema,BookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookingFindManyArgsSchema: z.ZodType<Prisma.BookingFindManyArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookingScalarFieldEnumSchema,BookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookingAggregateArgsSchema: z.ZodType<Prisma.BookingAggregateArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BookingGroupByArgsSchema: z.ZodType<Prisma.BookingGroupByArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithAggregationInputSchema.array(),BookingOrderByWithAggregationInputSchema ]).optional(),
  by: BookingScalarFieldEnumSchema.array(),
  having: BookingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BookingFindUniqueArgsSchema: z.ZodType<Prisma.BookingFindUniqueArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict() ;

export const BookingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BookingFindUniqueOrThrowArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const BundleCreateArgsSchema: z.ZodType<Prisma.BundleCreateArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  data: z.union([ BundleCreateInputSchema,BundleUncheckedCreateInputSchema ]),
}).strict() ;

export const BundleUpsertArgsSchema: z.ZodType<Prisma.BundleUpsertArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  where: BundleWhereUniqueInputSchema,
  create: z.union([ BundleCreateInputSchema,BundleUncheckedCreateInputSchema ]),
  update: z.union([ BundleUpdateInputSchema,BundleUncheckedUpdateInputSchema ]),
}).strict() ;

export const BundleCreateManyArgsSchema: z.ZodType<Prisma.BundleCreateManyArgs> = z.object({
  data: z.union([ BundleCreateManyInputSchema,BundleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BundleDeleteArgsSchema: z.ZodType<Prisma.BundleDeleteArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  where: BundleWhereUniqueInputSchema,
}).strict() ;

export const BundleUpdateArgsSchema: z.ZodType<Prisma.BundleUpdateArgs> = z.object({
  select: BundleSelectSchema.optional(),
  include: BundleIncludeSchema.optional(),
  data: z.union([ BundleUpdateInputSchema,BundleUncheckedUpdateInputSchema ]),
  where: BundleWhereUniqueInputSchema,
}).strict() ;

export const BundleUpdateManyArgsSchema: z.ZodType<Prisma.BundleUpdateManyArgs> = z.object({
  data: z.union([ BundleUpdateManyMutationInputSchema,BundleUncheckedUpdateManyInputSchema ]),
  where: BundleWhereInputSchema.optional(),
}).strict() ;

export const BundleDeleteManyArgsSchema: z.ZodType<Prisma.BundleDeleteManyArgs> = z.object({
  where: BundleWhereInputSchema.optional(),
}).strict() ;

export const TimeslotCreateArgsSchema: z.ZodType<Prisma.TimeslotCreateArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  data: z.union([ TimeslotCreateInputSchema,TimeslotUncheckedCreateInputSchema ]),
}).strict() ;

export const TimeslotUpsertArgsSchema: z.ZodType<Prisma.TimeslotUpsertArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  where: TimeslotWhereUniqueInputSchema,
  create: z.union([ TimeslotCreateInputSchema,TimeslotUncheckedCreateInputSchema ]),
  update: z.union([ TimeslotUpdateInputSchema,TimeslotUncheckedUpdateInputSchema ]),
}).strict() ;

export const TimeslotCreateManyArgsSchema: z.ZodType<Prisma.TimeslotCreateManyArgs> = z.object({
  data: z.union([ TimeslotCreateManyInputSchema,TimeslotCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TimeslotDeleteArgsSchema: z.ZodType<Prisma.TimeslotDeleteArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  where: TimeslotWhereUniqueInputSchema,
}).strict() ;

export const TimeslotUpdateArgsSchema: z.ZodType<Prisma.TimeslotUpdateArgs> = z.object({
  select: TimeslotSelectSchema.optional(),
  include: TimeslotIncludeSchema.optional(),
  data: z.union([ TimeslotUpdateInputSchema,TimeslotUncheckedUpdateInputSchema ]),
  where: TimeslotWhereUniqueInputSchema,
}).strict() ;

export const TimeslotUpdateManyArgsSchema: z.ZodType<Prisma.TimeslotUpdateManyArgs> = z.object({
  data: z.union([ TimeslotUpdateManyMutationInputSchema,TimeslotUncheckedUpdateManyInputSchema ]),
  where: TimeslotWhereInputSchema.optional(),
}).strict() ;

export const TimeslotDeleteManyArgsSchema: z.ZodType<Prisma.TimeslotDeleteManyArgs> = z.object({
  where: TimeslotWhereInputSchema.optional(),
}).strict() ;

export const TicketCreateArgsSchema: z.ZodType<Prisma.TicketCreateArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  data: z.union([ TicketCreateInputSchema,TicketUncheckedCreateInputSchema ]),
}).strict() ;

export const TicketUpsertArgsSchema: z.ZodType<Prisma.TicketUpsertArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  where: TicketWhereUniqueInputSchema,
  create: z.union([ TicketCreateInputSchema,TicketUncheckedCreateInputSchema ]),
  update: z.union([ TicketUpdateInputSchema,TicketUncheckedUpdateInputSchema ]),
}).strict() ;

export const TicketCreateManyArgsSchema: z.ZodType<Prisma.TicketCreateManyArgs> = z.object({
  data: z.union([ TicketCreateManyInputSchema,TicketCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TicketDeleteArgsSchema: z.ZodType<Prisma.TicketDeleteArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  where: TicketWhereUniqueInputSchema,
}).strict() ;

export const TicketUpdateArgsSchema: z.ZodType<Prisma.TicketUpdateArgs> = z.object({
  select: TicketSelectSchema.optional(),
  include: TicketIncludeSchema.optional(),
  data: z.union([ TicketUpdateInputSchema,TicketUncheckedUpdateInputSchema ]),
  where: TicketWhereUniqueInputSchema,
}).strict() ;

export const TicketUpdateManyArgsSchema: z.ZodType<Prisma.TicketUpdateManyArgs> = z.object({
  data: z.union([ TicketUpdateManyMutationInputSchema,TicketUncheckedUpdateManyInputSchema ]),
  where: TicketWhereInputSchema.optional(),
}).strict() ;

export const TicketDeleteManyArgsSchema: z.ZodType<Prisma.TicketDeleteManyArgs> = z.object({
  where: TicketWhereInputSchema.optional(),
}).strict() ;

export const BookingCreateArgsSchema: z.ZodType<Prisma.BookingCreateArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  data: z.union([ BookingCreateInputSchema,BookingUncheckedCreateInputSchema ]),
}).strict() ;

export const BookingUpsertArgsSchema: z.ZodType<Prisma.BookingUpsertArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
  create: z.union([ BookingCreateInputSchema,BookingUncheckedCreateInputSchema ]),
  update: z.union([ BookingUpdateInputSchema,BookingUncheckedUpdateInputSchema ]),
}).strict() ;

export const BookingCreateManyArgsSchema: z.ZodType<Prisma.BookingCreateManyArgs> = z.object({
  data: z.union([ BookingCreateManyInputSchema,BookingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BookingDeleteArgsSchema: z.ZodType<Prisma.BookingDeleteArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict() ;

export const BookingUpdateArgsSchema: z.ZodType<Prisma.BookingUpdateArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  data: z.union([ BookingUpdateInputSchema,BookingUncheckedUpdateInputSchema ]),
  where: BookingWhereUniqueInputSchema,
}).strict() ;

export const BookingUpdateManyArgsSchema: z.ZodType<Prisma.BookingUpdateManyArgs> = z.object({
  data: z.union([ BookingUpdateManyMutationInputSchema,BookingUncheckedUpdateManyInputSchema ]),
  where: BookingWhereInputSchema.optional(),
}).strict() ;

export const BookingDeleteManyArgsSchema: z.ZodType<Prisma.BookingDeleteManyArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
}).strict() ;