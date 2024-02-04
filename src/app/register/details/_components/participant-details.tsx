import { useAtom } from "jotai";
import _ from "lodash";

import { Input } from "@/components/ui/input";

import { cartAtom } from "@/lib/atoms/events-registration";
import { type Cart } from "@/lib/types";
import { type ArrElement } from "@/lib/utils";

export type ParticipantDetailsProps = {
  cartItem: ArrElement<Cart>;
};

export default function ParticipantDetails({
  cartItem,
}: ParticipantDetailsProps) {
  const [cart, setCart] = useAtom(cartAtom);
  function handleChange(idx: number, name: string) {
    setCart((prev) => {
      const toChangeIdx = prev.findIndex((item) =>
        _.isEqual(
          { ...item, participants: undefined },
          { ...cartItem, participants: undefined },
        ),
      );
      const change = prev.find((item) =>
        _.isEqual(
          { ...item, participants: undefined },
          { ...cartItem, participants: undefined },
        ),
      );
      if (!change) {
        throw new Error("Cart item not found");
      }
      const updated = { ...change };
      updated.participants[idx] = name;
      return prev.map((item, i) => (i !== toChangeIdx ? item : updated));
    });
  }

  return (
    <section className="space-y-3">
      <h3 className="text-gtd-secondary-20 font-medium text-sm">
        {cartItem.event.name} ({cartItem.event.bundle})
      </h3>
      {cart
        .find((item) => _.isEqual(item, cartItem))
        ?.participants.map((participant, idx) => (
          <Input
            type="name"
            placeholder={`Participant ${idx + 1}`}
            value={participant}
            onChange={({ target }) => handleChange(idx, target.value)}
          />
        ))}
    </section>
  );
}
