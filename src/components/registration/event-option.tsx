import "client-only";

import dayjs from "dayjs";
import { useSetAtom } from "jotai";

import { errorAtom } from "@/lib/atoms/message";
import { api } from "@/lib/trpc/client";

export type EventOptionProps = {
  /**
   * Event ID
   */
  id: number;
  checked?: boolean;
  onChange: (checked: boolean) => void;
};

export default function EventOption({
  id,
  checked = false,
  onChange,
}: EventOptionProps) {
  const setError = useSetAtom(errorAtom);
  const {
    data: event,
    error: queryError,
    isLoading,
    isError,
  } = api.event.getById.useQuery({ id });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    setError(queryError.message);
    return <p>An error occurred: {queryError.message}</p>;
  }

  const dateFormat = "D MMM";
  const startLabel = dayjs(event.startDate).format(dateFormat);
  const endLabel = dayjs(event.endDate).format(dateFormat);

  return (
    <section>
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={({ target }) => onChange(target.checked)}
        />
        <h2 className="text-xl font-medium">
          {event.id}: {event.name}
        </h2>
      </div>
      <p>
        From {startLabel} to {endLabel}
      </p>
    </section>
  );
}
