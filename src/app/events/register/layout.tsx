import { type ReactNode } from "react";

export default function RegistrationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      <h1 className="text-2xl font-semibold">Registration Page</h1>
      {children}
    </main>
  );
}
