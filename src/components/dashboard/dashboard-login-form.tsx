"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// import { useToast } from "@/components/ui/use-toast";
// import login from "@/server/actions/login";
import { loginSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export type DashboardLoginFormProps = {
  className?: string;
};

export default function DashboardLoginForm({
  className,
}: DashboardLoginFormProps) {
  // const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof loginSchema>) {
    // const res = await login(values);
    // if (res) {
    //   toast({
    //     variant: "destructive",
    //     title: "Login failed",
    //     description: res.error,
    //   });
    //   return;
    // }
    // toast({
    //   variant: "default",
    //   title: "Logged in successfully!",
    // });
  }

  return (
    <Form {...form}>
      <form
        action="/api/auth/login"
        method="POST"
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-12", className)}
      >
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
