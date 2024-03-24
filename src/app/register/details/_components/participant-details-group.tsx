"use client";

import { useAtomValue } from "jotai";

import { cartAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

import ParticipantDetails from "./participant-details";

export default function ParticipantDetailsGroup() {
  const hasMounted = useHasMounted();
  const cart = useAtomValue(cartAtom);
  const filteredCart = cart.filter((item) => item.quantity !== 0);

  return (
    <div className="md:flex-grow md:mx-10 lg:mr-[5.75rem]">
      <div className="mb-6">
        <h2 className="text-xl text-gtd-secondary-20 font-medium mt-3 mb-2 md:mt-12">
          Enter Participant Details
        </h2>
        <div className="gap-x-8 gap-y-3 items-start space-y-4">
          {!hasMounted
            ? null
            : filteredCart.map((item) => (
                <ParticipantDetails cartItem={item} />
              ))}
        </div>
      </div>
    </div>
  );
}
