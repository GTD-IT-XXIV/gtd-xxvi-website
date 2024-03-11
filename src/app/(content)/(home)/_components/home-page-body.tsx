import { cn } from "@/lib/utils";

export type HomePageBodyProps = {
  className?: string;
};

export default function HomePageBody({ className = "" }: HomePageBodyProps) {
  return (
    <section className={cn("", className)}>
      <h1>Home Page</h1>
    </section>
  );
}
