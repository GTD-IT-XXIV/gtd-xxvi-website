import { Skeleton } from "@/components/ui/skeleton";

export default function TotalPriceLoading() {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-2" />{" "}
        <p className="text-gtd-secondary-10 text-sm">Selected</p>
      </div>
      <div className="flex items-end gap-1">
        <p className="text-gtd-secondary-20 text-sm mb-0.5">$</p>
        <Skeleton className="h-8 w-9" />
      </div>
    </div>
  );
}
