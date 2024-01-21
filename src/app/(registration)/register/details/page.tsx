import { type Metadata } from "next";

import BookingContainer from "./components/container";

export const metadata: Metadata = {
  title: "Details",
};

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/51 GitHub Issue}
 */

export default function DetailsPage() {
  return (
    // Mobile UI ( width <= ~400 px )
    <section className="p-4">
      <BookingContainer />
    </section>
  );
}
