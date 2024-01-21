"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

import { signupSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

import { useToast } from "../ui/use-toast";

export type DashboardSignupFormProps = {
  className?: string;
};

export default function DashboardSignupForm({
  className,
}: DashboardSignupFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  });
  // const createUser = api.user.create.useMutation({
  //   onSuccess: () => {
  //     toast({
  //       variant: "default",
  //       title: "User created successfully!",
  //       description: "Please log in.",
  //     });
  //     router.push("/dashboard/login");
  //   },
  //   onError: (error) => {
  //     toast({
  //       variant: "destructive",
  //       title: "User creation failed",
  //       description: error.message,
  //     });
  //   },
  // });

  async function handleSubmit(values: z.infer<typeof signupSchema>) {
    // createUser.mutate(values);
    console.log({ values });
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }
      // does not throw error
      await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });
      toast({
        variant: "default",
        title: "User created successfully!",
        description: "Please log in.",
      });
      router.push("/dashboard/login");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "User creation failed",
          description: error.message,
        });
      }
      toast({
        variant: "destructive",
        title: "User creation failed",
      });
    }
  }

  return (
    <Form {...form}>
      <form
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  );
}
