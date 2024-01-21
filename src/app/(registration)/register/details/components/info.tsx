export default function BookingInfo({
  handleBooking,
}: {
  handleBooking: (field: string, value: string) => void;
}) {
  return (
    <div>
      <div>
        <h2 className="text-[5vw] font-medium mt-3 mb-2">Enter Booking Info</h2>
        <input
          placeholder="Full Name"
          className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
          onInput={(e) => {
            handleBooking("name", e.currentTarget.value);
          }}
        ></input>
        <br></br>
        <input
          placeholder="Email Address"
          className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
          onInput={(e) => {
            handleBooking("email", e.currentTarget.value);
          }}
        ></input>
        <br></br>
        <input
          placeholder="Telegram"
          className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
          onInput={(e) => {
            handleBooking("telegramHandle", e.currentTarget.value);
          }}
        ></input>
        <br></br>
        <input
          placeholder="Phone Number"
          className="border-[1px] w-full p-2 text-[3vw] rounded-md my-1"
          onInput={(e) => {
            handleBooking("phoneNumber", e.currentTarget.value);
          }}
        ></input>
        <br></br>
      </div>
    </div>
  );
}
