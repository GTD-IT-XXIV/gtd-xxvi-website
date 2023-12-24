import type { Bundle } from "@prisma/client";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <>
      <div>{bundle.eventId}</div>
      <div>{String(bundle.price)}</div>
      <div>{bundle.name}</div>
      <div>{bundle.quantity}</div>
    </>
  );
}
