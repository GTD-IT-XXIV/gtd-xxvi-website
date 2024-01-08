"use client";

import { type inferRouterOutputs } from "@trpc/server";
import { useAtom } from "jotai";

import { type AppRouter } from "@/server/root";

import { eventDetailsAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Event = NonNullable<RouterOutput["events"]["getById"]>;

export type GTDFestRegisterButtonProps = {
  gtdFest: Event;
  escapeRoom: Event;
};

export default function GTDFestRegisterButton({
  gtdFest,
  escapeRoom,
}: GTDFestRegisterButtonProps) {
  const hasMounted = useHasMounted();
  const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);

  function handleClick() {
    // Button can only be clicked when component has mounted because it is
    // disabled when not yet mounted.
    // Must be mounted so that eventDetails is synchronized with localStorage.
    setEventDetails({
      ...eventDetails,
      [gtdFest.id]: {
        ...eventDetails[gtdFest.id],
        name: gtdFest.name,
        quantity: 0,
      },
      [escapeRoom.id]: {
        ...eventDetails[escapeRoom.id],
        name: escapeRoom.name,
        quantity: 0,
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!hasMounted}
      className="p-2 bg-slate-200 hover:bg-slate-100"
    >
      Register
    </button>
  );
}
