import Link from "next/link";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-2xl font-semibold">Home Page</h1>
      <Link href="/events/gtdfest">
        <button type="button" className="p-2 bg-slate-200 hover:bg-slate-100">
          GTD Fest x Escape Room
        </button>
      </Link>
    </main>
  );
}
