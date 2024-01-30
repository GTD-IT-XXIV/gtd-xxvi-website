import "client-only";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function BookingInfo() {
  const form = useFormContext();
  return (
    <div className="md:flex-grow md:mx-10 lg:mr-[5.75rem]">
      <div className="mb-6">
        <h2 className="text-xl text-gtd-secondary-20 font-medium mt-3 mb-2 md:mt-12">
          Enter Booking Info
        </h2>
        <div className="md:grid grid-rows-[0px_1fr_1fr] grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 items-start">
          {/* Preventing first item to lose their top-padding */}
          <div />
          <div className="hidden lg:block" />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
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
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
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
                <FormControl>
                  <Input placeholder="Telegram" {...field} />
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
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
