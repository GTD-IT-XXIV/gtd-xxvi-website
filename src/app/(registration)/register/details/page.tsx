import { type Metadata } from "next";

import BookingContainer from "./_components/container";
import DetailsFormProvider from "./_components/details-form-provider";
import DetailsPageFooter from "./_components/details-page-footer";

export const metadata: Metadata = {
  title: "Details",
};

export default function DetailsPage() {
  return (
    <DetailsFormProvider className="grow flex flex-col">
      {/* Mobile UI ( width <= ~400 px ) */}
      <section className="flex-1 p-4">
        <BookingContainer />
      </section>
      <DetailsPageFooter className="sticky bottom-0" />
    </DetailsFormProvider>
  );
}
