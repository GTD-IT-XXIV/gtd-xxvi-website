"use client";

import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

import { priceAtom, selectedAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";

export default function BundleCard({
  eventId,
  bundleId,
}: {
  eventId: number;
  bundleId: number;
}) {
  const event = api.event.getById.useQuery({ id: eventId });
  const {
    data: bundle,
    isLoading,
    isError,
  } = api.bundle.getById.useQuery({ id: bundleId });

  const [selected, setSelected] = useAtom(selectedAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const [amount, setAmount] = useState(0);

  if (isLoading || isError) {
    return null;
  }

  const handleDecrement = () => {
    if (amount > 0) {
      setAmount(amount - 1);
      setSelected(selected - 1);
      setPrice(price.minus(bundle.price));
    }
  };
  const handleIncrement = () => {
    setAmount(amount + 1);
    setSelected(selected + 1);
    setPrice(price.plus(bundle.price));
  };

  return (
    <div className="flex flex-row border border-[#D4D4D8] w-[100%] h-[20%] p-[3%] rounded-xl mb-[4%]">
      <div className="w-[70%]">
        <h1 className="text-gtd-secondary-20 font-medium text-xl mb-[2%]">
          {event.data?.name}
        </h1>
        <h1 className="text-gtd-secondary-20 font-medium text-xl mb-[2%]">
          ({bundle.name})
        </h1>

        <p className="text-gtd-secondary-10 text-sm mb-[1%]">
          {" "}
          <FaRegClock className="inline text-black text-base" /> &nbsp;{" "}
          {dayjs(event.data?.startDate).format("DD/MM/YYYY")}{" "}
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
        {bundle.name === "Individual" ? (
          <div className="flex justify-end">
            <p className="text-sm self-baseline">$</p>
            <p className="text-gtd-secondary-20 text-xl font-medium self-baseline">
              {bundle.price !== undefined
                ? bundle.price.toString()
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
              {bundle.price !== undefined
                ? bundle.price.toString()
                : (() => {
                    throw new Error("Price is undefined");
                  })()}
            </p>
          </div>
        )}

        <div className="flex justify-end mt-auto">
          <button
            onClick={handleDecrement}
            className="bg-gtd-primary-30 text-white rounded-full text-sm w-5 h-5"
          >
            -
          </button>
          &nbsp;&nbsp;
          <p>{amount}</p>
          &nbsp;&nbsp;
          <button
            onClick={handleIncrement}
            className="bg-gtd-primary-30 text-white rounded-full text-sm w-5 h-5"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
