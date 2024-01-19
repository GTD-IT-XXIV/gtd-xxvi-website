import dayjs from "dayjs";

export type TimeSlotButtonProps = {
  startTime: Date;
  endTime: Date;
  remainingSlots: number;
};

export default function TimeSlotButton({
  startTime,
  endTime,
  remainingSlots,
}: TimeSlotButtonProps) {
  return (
    <div className="flex justify-between m-3 py-4 px-4 border-2 border-slate/300 border-black rounded-2xl">
      <div>
        {dayjs(startTime).format("h.mm")} - {dayjs(endTime).format("h.mm A")}
      </div>
      <div>{remainingSlots} slots left</div>
    </div>
  );
}
