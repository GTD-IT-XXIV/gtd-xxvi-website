import MerchGenericLayout from "@/app/merch/_components/merch-generic-layout";

import MerchItemReview from "./_components/merch-item-review";

export default async function MerchDetailsPage() {
  return (
    <MerchGenericLayout
      title="Cart"
      body={
        <div className="flex flex-col md:flex-row">
          <MerchItemReview />
        </div>
      }
    />
  );
}
