import { Skeleton } from "@/components/ui/skeleton";

export default function TimeslotSectionLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-6 w-32" />
      <div>
        <Skeleton className="w-full h-12" />
      </div>
    </div>
  );
}
