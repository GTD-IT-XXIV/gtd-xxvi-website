interface Bundle {
  id: number;
  name: string;
  details: string;
  price: number;
  quantity: number;
  remainingAmount: number | null;
  eventId: number;
}

const sampleBundles = [
  {
    id: 1,
    name: "Escape Room Bundle",
    details: "Monday, 18 March 2024, 9.00 - 10.00 AM",
    price: 50.0,
    quantity: 1,
    remainingAmount: null,
    eventId: 1,
  },
  {
    id: 2,
    name: "GTD Fest Individual",
    details: "Monday, 18 March 2024",
    price: 12.0,
    quantity: 1,
    remainingAmount: null,
    eventId: 3,
  },
];

export default function BookingReview() {
  const getBundle = (bundle: Bundle) => {
    return (
      <div className="flex">
        <div className="bundle-details my-2 w-5/6">
          <div className="bundle-name text-[3vw] my-1 font-medium">
            {bundle.name}
          </div>
          <div className="bundle-description text-[3vw] my-1 text-gtd-primary-30 font-light">
            {bundle.details}
          </div>
        </div>
        <div className="flex items-center justify-end my-2 text-[3vw] w-1/6">
          ${bundle.price.toString()}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-[7.5vw] font-medium my-4 text-gtd-primary-30">
        Booking Details
      </h1>
      <h2 className="text-[5vw] font-medium my-3">Booking Review</h2>

      <div id="bundle-details-container">
        {sampleBundles.map((bundle) => getBundle(bundle))}
      </div>
    </div>
  );
}
