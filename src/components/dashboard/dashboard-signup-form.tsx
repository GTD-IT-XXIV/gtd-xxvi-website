"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { api } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

export type DashboardSignupFormProps = {
  className?: string;
};

export const signupFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(8).max(255),
});

export default function DashboardSignupForm({
  className,
}: DashboardSignupFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const createUser = api.user.create.useMutation({
    onSuccess: () => router.push("/dashboard"),
  });

  function handleSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
    createUser.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-3", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  );
}
