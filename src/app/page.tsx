import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-2xl font-semibold">Home Page</h1>
      <Link href="/gtdfest">
        <button type="button" className="p-2 bg-slate-200 hover:bg-slate-100">
          GTD Fest x Escape Room
        </button>
      </Link>
    </main>
  );
}
