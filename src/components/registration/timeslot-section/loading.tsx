import { Skeleton } from "@/components/ui/skeleton";

import TimeslotButtonLoading from "../timeslot-button/loading";

export default function TimeslotSectionLoading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-6 w-32" />
      <div>
        <TimeslotButtonLoading />
      </div>
    </div>
  );
}
