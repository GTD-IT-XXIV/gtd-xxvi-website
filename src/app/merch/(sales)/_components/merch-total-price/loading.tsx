import { Skeleton } from "@/components/ui/skeleton";

export default function MerchTotalPriceLoading() {
  return (
    <div className="flex items-end gap-1">
      <p className="text-gtd-secondary-20 text-sm mb-0.5">$</p>
      <Skeleton className="h-8 w-9" />
    </div>
  );
}
