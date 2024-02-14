"use client";

import { useRef } from "react";

import MerchGenericLayout from "@/app/merch/_components/merch-generic-layout";

import { useHasMounted } from "@/lib/hooks";

import MerchBuyerInfo from "./_components/merch-buyer-info";
import MerchDetailsFormProvider from "./_components/merch-details-form-provider";
import MerchDetailsPageFooter from "./_components/merch-details-page-footer";
import MerchItemReview from "./_components/merch-item-review";

export default function MerchDetailsPage() {
  const hasMounted = useHasMounted();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <MerchDetailsFormProvider className="grow flex flex-col" ref={formRef}>
      <MerchGenericLayout
        title="Merchandise Cart"
        body={
          <div className="flex flex-col md:flex-row">
            <MerchItemReview />
            <MerchBuyerInfo />
          </div>
        }
        footer={
          hasMounted &&
          formRef.current !== null && (
            <MerchDetailsPageFooter className="sticky bottom-0" />
          )
        }
      />
    </MerchDetailsFormProvider>
  );
}
