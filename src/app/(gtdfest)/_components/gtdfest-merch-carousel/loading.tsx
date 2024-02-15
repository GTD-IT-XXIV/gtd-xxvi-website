import { Skeleton } from "@/components/ui/skeleton";

export default function GTDFestMerchCarouselLoading() {
  return (
    <section className="px-12 py-6 space-y-4 bg-repeat bg-[url('/merch-background.png')] bg-[length:200px_200px]">
      {/* Button Groups */}
      <div className="w-full flex justify-center gap-4 md:gap-16">
        <Skeleton className="bg-slate-800 h-36 md:h-52 lg:h-[16rem] w-24 md:w-36 lg:w-48" />
        {Array(2)
          .fill(0)
          .map((_) => (
            <Skeleton className="bg-slate-800 h-16 md:h-20 w-24 md:w-36 lg:w-48" />
          ))}
      </div>
      <Skeleton className="bg-slate-800 w-full aspect-square md:aspect-[2/1]" />
    </section>
  );
}
