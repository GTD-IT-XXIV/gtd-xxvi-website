"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import {
  allowCheckoutAtom,
  cartAtom,
  checkoutSessionAtom,
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
  const { toast } = useToast();
  const [cart, setCart] = useAtom(cartAtom);
  const setSession = useSetAtom(checkoutSessionAtom);
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

  const { mutateAsync: createBookings } = api.booking.createMany.useMutation();
  const { mutateAsync: createSession } =
    api.payment.createCheckoutSession.useMutation();

  async function placeOrder(values: z.infer<typeof formSchema>) {
    try {
      const bookings = await createBookings({
        bookings: cart.map((item) => ({ ...values, ...item })),
      });
      const bookingIds = bookings.map((booking) => booking.id);
      try {
        const { sessionId } = await createSession({ bookingIds });
        setSession(sessionId);
        setCart([]);
        setAllowCheckout(false);
        router.push("/register/checkout");
      } catch (error) {
        if (
          error instanceof TRPCClientError &&
          error.message === "No items to checkout."
        ) {
          toast({
            variant: "destructive",
            title: "Failed to Place Order",
            description: error.message,
          });
          router.back();
        }
        toast({
          variant: "destructive",
          title: "Failed to Place Order",
          description:
            "An error occurred while placing order. Please go back and try again.",
        });
        router.back();
      }
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast({
          variant: "default",
          title: "One or more of the items are sold out",
          description: `${error.message}. Please go back and select another timeslot or bundle.`,
        });
      }
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(placeOrder)} className={className}>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
}