import "client-only";

import { api } from "@/lib/trpc/client";

export type BookingsTableRowProps = {
  email: string;
  eventId: number;
  checked?: boolean;
  onChange: () => void;
};

export default function BookingsTableRow({
  email,
  eventId,
  checked = false,
  onChange,
}: BookingsTableRowProps) {
  const {
    data: bookings,
    error: bookingsError,
    isLoading,
    isError,
  } = api.booking.getManyByEmailAndEvents.useQuery(
    {
      email,
      eventIds: [eventId],
    },
    { enabled: !!eventId },
  );
  const {
    data: amount,
    error: amountError,
    isLoading: isAmountLoading,
    isError: isAmountError,
  } = api.booking.getPriceByEmailAndEvents.useQuery({
    email,
    eventIds: [eventId],
  });

  if (isLoading) {
    return null;
  }
  if (isError) {
    return null;
  }

  if (bookings.length === 0) {
    return null;
  }

  let status = "Unknown";
  if (bookings.every((booking) => booking.valid)) {
    status = "Valid";
  } else if (bookings.every((booking) => !booking.valid)) {
    status = "Invalid";
  }

  return (
    <tr className="w-full text-xs text-center h-10">
      <td className="w-1/12">
        <input
          className="w-full"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      </td>
      <td className="w-2/12">{status}</td>
      <td className="w-4/12">{email}</td>
      <td className="w-2/12">{bookings.length}</td>
      <td className="w-3/12">
        ${isLoading ? "..." : isError ? "Error" : amount}
      </td>
    </tr>
  );
}
