import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  DEFAULT_REGISTRATION_FORM,
  formDataAtom,
} from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/provider";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export const registrationFormSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  telegramHandle: z.string().min(4),
  phoneNumber: z.string().min(3),
});

export type RegistrationFormProps = {
  onSubmit: () => void;
};

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [formData, setFormData] = useAtom(formDataAtom);

  const { data: bookings, isLoading: isBookingsLoading } =
    api.bookings.getManyByEmail.useQuery(formData.email);

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: DEFAULT_REGISTRATION_FORM,
    values: formData,
  });

  useEffect(() => {
    function runEffect() {
      if (
        !isBookingsLoading &&
        bookings &&
        bookings.length > 0 &&
        bookings[0]
      ) {
        setFormData({
          name: bookings[0].name,
          email: bookings[0].email,
          telegramHandle: bookings[0].telegramHandle,
          phoneNumber: bookings[0].phoneNumber,
        });
      }
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [isBookingsLoading]);

  function handleSubmit(values: z.infer<typeof registrationFormSchema>) {
    // console.log("Submitted", values);
    setFormData(values);
    onSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telegramHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram Handle</FormLabel>
              <FormControl>
                <input className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <input type="tel" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="p-2 bg-slate-200 hover:bg-slate-100">
          Next
        </button>
      </form>
    </Form>
  );
}
