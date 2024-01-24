"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import {
  allowCheckoutAtom,
  bookingIdsAtom,
  cartAtom,
} from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Must be at least 5 characters long" }),
  email: z.string().trim().email(),
  telegramHandle: z
    .string()
    .trim()
    .min(5, { message: "Must be at least 5 characters long" }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" }),
});

export type DetailsFormProviderProps = {
  className?: string;
  children: ReactNode;
};

export default function DetailsFormProvider({
  className = "",
  children,
}: DetailsFormProviderProps) {
  const router = useRouter();
  const [cart, setCart] = useAtom(cartAtom);
  const setBookingIds = useSetAtom(bookingIdsAtom);
  const setAllowCheckout = useSetAtom(allowCheckoutAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      telegramHandle: "",
      phoneNumber: "",
    },
  });

  const { mutateAsync: createBooking } = api.booking.create.useMutation();

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit btn clicked!");
    const bookingIds = [];
    for (const item of cart) {
      const booking = await createBooking({ ...values, ...item });
      bookingIds.push(booking.id);
    }
    setCart([]);
    setBookingIds(bookingIds);
    setAllowCheckout(false);
    router.push("/register/checkout");
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
}
