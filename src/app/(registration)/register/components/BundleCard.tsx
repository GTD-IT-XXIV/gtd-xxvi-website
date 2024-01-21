import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

import { api } from "@/server/trpc";

import Buttons from "./Buttons";

export default async function BundleCard({
  eventId,
  bundleId,
}: {
  eventId: number;
  bundleId: number;
}) {
  const event = await api.event.getById.query({ id: eventId });
  const bundle = await api.bundle.getManyByEvent.query({ eventId: eventId });

  return (
    <div className="flex flex-row border border-[#D4D4D8] w-[100%] h-[20%] p-[3%] rounded-xl mb-[4%]">
      <div className="w-[70%]">
        <h1 className="text-gtd-secondary-20 font-medium text-xl mb-[2%]">
          {event.name}
        </h1>
        <h1 className="text-gtd-secondary-20 font-medium text-xl mb-[2%]">
          ({bundle[bundleId]?.name})
        </h1>

        <p className="text-gtd-secondary-10 text-sm mb-[1%]">
          {" "}
          <FaRegClock className="inline text-black text-base" /> &nbsp;{" "}
          {dayjs(event.startDate).format("DD/MM/YYYY")}{" "}
        </p>

        {/* // TODO - add Location */}
        <p className="text-gtd-secondary-10 text-sm">
          {" "}
          <MdOutlineLocationOn className="inline scale-[130%] text-black text-base" />{" "}
          &nbsp; NTU{" "}
        </p>

        <p className="text-gtd-primary-30 text-xs mt-[3%]">Learn more</p>
      </div>

      <div className="flex flex-col w-[30%]">
        {bundle[bundleId]?.name === "Individual" ? (
          <div className="flex justify-end">
            <p className="text-sm self-baseline">$</p>
            <p className="text-gtd-secondary-20 text-xl font-medium self-baseline">
              {bundle[bundleId]?.price !== undefined
                ? bundle[bundleId]?.price.toString()
                : (() => {
                    throw new Error("Price is undefined");
                  })()}
              /
            </p>
            <p className="text-gtd-secondary-10 text-sm self-baseline">pax</p>
          </div>
        ) : (
          <div className="flex justify-end">
            <p className="text-sm self-baseline">$</p>
            <p className="text-gtd-secondary-20 text-xl font-medium self-baseline">
              {bundle[bundleId]?.price !== undefined
                ? bundle[bundleId]?.price.toString()
                : (() => {
                    throw new Error("Price is undefined");
                  })()}
            </p>
          </div>
        )}

        <Buttons />
      </div>
    </div>
  );
}
