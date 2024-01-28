import { Skeleton } from "@/components/ui/skeleton";

export default function BookingReviewBundleLoading() {
  return (
    <div className="flex">
      <div className="bundle-details my-1.5 w-5/6">
        <div className="bundle-name my-1">
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="bundle-description my-1">
          <Skeleton className="h-5 w-64" />
        </div>
      </div>
      <div className="flex items-center justify-end my-2 w-1/6">
        <Skeleton className="h-4 w-5" />
      </div>
    </div>
  );
}
