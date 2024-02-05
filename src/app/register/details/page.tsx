"use client";

import { useRef } from "react";

import CheckoutWrapper from "@/components/registration/checkout-wrapper";

import { useHasMounted } from "@/lib/hooks";

import BookingContainer from "./_components/container";
import DetailsFormProvider from "./_components/details-form-provider";
import DetailsPageFooter from "./_components/details-page-footer";

export default function DetailsPage() {
  const hasMounted = useHasMounted();
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <CheckoutWrapper>
      <DetailsFormProvider className="grow flex flex-col" ref={formRef}>
        {/* Mobile UI ( width <= ~400 px ) */}
        <section className="flex-1 p-5 pt-10">
          <BookingContainer />
        </section>
        {hasMounted && formRef.current !== null && (
          <DetailsPageFooter
            className="sticky bottom-0"
            formEl={formRef.current}
          />
        )}
      </DetailsFormProvider>
    </CheckoutWrapper>
  );
}
