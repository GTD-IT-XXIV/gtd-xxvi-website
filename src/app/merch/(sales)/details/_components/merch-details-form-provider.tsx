"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { type ReactNode, forwardRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { allowMerchCheckoutAtom, merchCartAtom } from "@/lib/atoms/merch";
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

export type MerchDetailsFormProviderProps = {
  className?: string;
  children: ReactNode;
};

const MerchDetailsFormProvider = forwardRef<
  HTMLFormElement,
  MerchDetailsFormProviderProps
>(function DetailsFormProvider({ className = "", children }, ref) {
  const router = useRouter();
  const { toast } = useToast();
  const [merchCart, setMerchCart] = useAtom(merchCartAtom);
  const setAllowCheckout = useSetAtom(allowMerchCheckoutAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      telegramHandle: "",
      phoneNumber: "",
    },
  });

  const { mutateAsync: createBookings } =
    api.merchBooking.createMany.useMutation();
  const { mutateAsync: createSession } =
    api.payment.createCheckoutSession.useMutation();

  async function placeOrder(values: z.infer<typeof formSchema>) {
    try {
      const bookings = await createBookings({
        bookings: merchCart.map((item) => {
          const merchToInsert = item.merch.map((merchItem) => {
            if (merchItem.variation === undefined) {
              throw new Error("No variation selected for one or more items.");
            }
            return {
              id: merchItem.id,
              variation: merchItem.variation,
            };
          });
          return {
            ...values,
            merchBundleId: item.merchBundleId,
            quantity: item.quantity,
            merch: merchToInsert,
          };
        }),
      });
      const bookingIds = bookings.map((booking) => booking.id);
      try {
        const { sessionId } = await createSession({
          type: "merch",
          bookingIds,
        });
        setMerchCart([]);
        setAllowCheckout(false);
        router.push(`/merch/checkout/${sessionId}`);
      } catch (error) {
        console.error({ error });
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
          description: `${error.message}. Please go back and select another item.`,
        });
      }
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(placeOrder)}
          className={className}
        >
          {children}
        </form>
      </Form>
    </FormProvider>
  );
});

export default MerchDetailsFormProvider;
