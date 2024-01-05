import Link from "next/link";

export default function GTDFest() {
  return (
    <main>
      <h1 className="text-2xl font-semibold">GTD Fest x Escape Room Page</h1>
      <Link href="/events/register/gtdfest">
        <button type="button" className="p-2 bg-slate-200 hover:bg-slate-100">
          Register
        </button>
      </Link>
      <h2 className="text-xl font-medium">Custom Colors</h2>
      <ul>
        <li>
          gtd-primary: <div className="inline-block size-5 bg-gtd-primary-10" />
          <div className="inline-block size-5 bg-gtd-primary-20" />
          <div className="inline-block size-5 bg-gtd-primary-30" />
        </li>
      </ul>
    </main>
  );
}
