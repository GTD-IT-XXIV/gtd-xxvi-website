"use client";

import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

import { cartAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";

import BundleCardPopup from "../bundle-card-popup";
import BundleCardLoading from "./loading";

export type BundleCardProps = {
  event: {
    id: number;
    name: string;
    startDate: Date;
    location: string;
  };
  bundleId: number;
};

export default function BundleCard({ event, bundleId }: BundleCardProps) {
  const {
    data: bundle,
    isLoading,
    isError,
  } = api.bundle.getById.useQuery({ id: bundleId });

  const [cart, setCart] = useAtom(cartAtom);
  const amount = cart.find((item) => item.bundleId === bundleId)?.quantity ?? 0;

  if (isLoading) {
    return <BundleCardLoading />;
  }

  if (isError) {
    return null;
  }

  const handleDecrement = () => {
    if (amount > 0) {
      setCart((prev) =>
        prev.map((item) =>
          item.bundleId !== bundleId
            ? item
            : { ...item, quantity: item.quantity - 1 },
        ),
      );
    }
  };
  const handleIncrement = () => {
    setCart((prev) => {
      if (prev.find((item) => item.bundleId === bundleId)) {
        return prev.map((item) =>
          item.bundleId !== bundleId
            ? item
            : { ...item, quantity: item.quantity + 1 },
        );
      }
      return prev.concat({
        bundleId,
        eventId: event.id,
        timeslotId: 0,
        quantity: 1,
        price: new Prisma.Decimal(bundle.price).toNumber(),
      });
    });
  };

  return (
    <section className="flex border text-gtd-secondary-30 border-zinc-300 w-full h-1/5 p-3 rounded-lg">
      <div className="grow">
        <h2 className="text-gtd-secondary-20 font-medium text-xl">
          {event.name}{" "}
          <span className="whitespace-nowrap">({bundle.name})</span>
        </h2>

        <div className="my-1.5 space-y-0.5">
          <p className="text-gtd-secondary-10 text-sm">
            {" "}
            <FaRegClock className="inline text-black text-base" /> &nbsp;{" "}
            {dayjs(event.startDate).format("DD/MM/YYYY")}{" "}
          </p>

          <p className="text-gtd-secondary-10 text-sm">
            {" "}
            <MdOutlineLocationOn className="inline scale-[130%] text-black text-base" />{" "}
            &nbsp; {event.location}{" "}
          </p>
        </div>

        <BundleCardPopup
          event={{
            id: event.id,
            name: event.name,
          }}
          bundle={{
            name: bundle.name,
            price: bundle.price,
            details: bundle.details,
          }}
        />
      </div>

      <div className="flex flex-col w-[30%]">
        {bundle.name.toLowerCase() === "individual" ? (
          <div className="flex justify-end">
            <p className="text-sm self-baseline">$</p>
            <p className="text-gtd-secondary-20 text-xl font-medium self-baseline">
              {new Prisma.Decimal(bundle.price).toDP(0).toString()}/
            </p>
            <p className="text-gtd-secondary-10 text-sm self-baseline">pax</p>
          </div>
        ) : (
          <div className="flex justify-end">
            <p className="text-sm self-baseline">$</p>
            <p className="text-gtd-secondary-20 text-xl font-medium self-baseline">
              {new Prisma.Decimal(bundle.price).toDP(0).toString()}
            </p>
          </div>
        )}

        <div className="flex justify-end mt-auto">
          <button
            onClick={handleDecrement}
            className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85 text-white rounded-full text-sm w-5 h-5"
          >
            -
          </button>
          &nbsp;&nbsp;
          <p>{amount}</p>
          &nbsp;&nbsp;
          <button
            onClick={handleIncrement}
            className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85 text-white rounded-full text-sm w-5 h-5"
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}
