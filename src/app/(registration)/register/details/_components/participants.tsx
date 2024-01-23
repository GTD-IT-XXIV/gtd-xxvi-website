import "client-only";

import { Input } from "@/components/ui/input";

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

export default function BookingParticipants({
  handleParticipants,
}: {
  handleParticipants: (field: string, value: string) => void;
}) {
  const getBundleType = () => {
    return sampleBundles.filter((bundle) => {
      return bundle.eventId === 1;
    });
  };
  return (
    <div>
      {getBundleType().length > 0 && (
        <h2 className="text-[5vw] text-gtd-secondary-20 font-medium mt-3 mb-2">
          Enter Participant Details
        </h2>
      )}
      {getBundleType().length > 0 &&
        getBundleType().map((bundle) => {
          return (
            <div>
              <div className="text-gtd-secondary-20">
                {bundle.name.split("Bundle")}
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Participant 1"
                  className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
                  onInput={(e) => {
                    handleParticipants("participant1", e.currentTarget.value);
                  }}
                ></Input>
                <Input
                  placeholder="Participant 2"
                  className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
                  onInput={(e) => {
                    handleParticipants("participant2", e.currentTarget.value);
                  }}
                ></Input>
                <Input
                  placeholder="Participant 3"
                  className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
                  onInput={(e) => {
                    handleParticipants("participant3", e.currentTarget.value);
                  }}
                ></Input>
                <Input
                  placeholder="Participant 4"
                  className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
                  onInput={(e) => {
                    handleParticipants("participant4", e.currentTarget.value);
                  }}
                ></Input>
                <Input
                  placeholder="Participant 5"
                  className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
                  onInput={(e) => {
                    handleParticipants("participant5", e.currentTarget.value);
                  }}
                ></Input>
              </div>
            </div>
          );
        })}
    </div>
  );
}
