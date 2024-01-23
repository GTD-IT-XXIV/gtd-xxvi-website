"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(5, { message: "Must be at least 5 characters long" }),
  email: z.string().email(),
  telegramHandle: z
    .string()
    .min(5, { message: "Must be at least 5 characters long" }),
  phoneNumber: z.string(),
});

export type DetailsFormProviderProps = {
  className?: string;
  children: ReactNode;
};

export default function DetailsFormProvider({
  className = "",
  children,
}: DetailsFormProviderProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      telegramHandle: "",
      phoneNumber: "",
    },
  });

  function handleSubmit() {
    console.log("submit btn clicked!");
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
