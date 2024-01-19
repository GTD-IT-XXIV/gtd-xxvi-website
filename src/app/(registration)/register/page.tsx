import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/49 GitHub Issue}
 */
export default function RegisterPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  console.log({ searchParams });
  return <section>Event Registrations Page</section>;
}
