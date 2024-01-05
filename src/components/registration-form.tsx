import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { eventsFormDataAtom } from "@/lib/atoms/events-registration";

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
  telegram: z.string().min(4),
  phone: z.string().min(3),
});

export type RegistrationFormProps = {
  onSubmit: () => void;
};

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [formData, setFormData] = useAtom(eventsFormDataAtom);

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: formData,
  });

  function handleSubmit(values: z.infer<typeof registrationFormSchema>) {
    console.log("Submitted", values);
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
          name="telegram"
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
          name="phone"
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
