import MerchGenericLayout from "@/app/merch/_components/merch-generic-layout";

export default function EmptyMerchCheckoutPage() {
  return (
    <MerchGenericLayout
      title="Checkout"
      body={
        <p className="text-center text-sm text-gtd-secondary-10">
          No items to checkout
        </p>
      }
    />
  );
}
