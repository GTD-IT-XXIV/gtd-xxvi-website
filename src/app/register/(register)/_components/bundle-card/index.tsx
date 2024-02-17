"use client";

import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAtom } from "jotai";
import { Info } from "lucide-react";
import React, { useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

import { cartAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

import BundleCardPopup from "../bundle-card-popup";
import BundleCardLoading from "./loading";

dayjs.extend(utc);

export type BundleCardProps = {
  event: {
    name: string;
    startDate: Date;
    location: string;
  };
  bundleName: string;
};

export default function BundleCard({ event, bundleName }: BundleCardProps) {
  const {
    data: bundle,
    isLoading,
    isError,
  } = api.bundle.getByNameAndEvent.useQuery({
    name: bundleName,
    event: event.name,
  });

  const { data: available } = api.bundle.getAvailabilityByNameAndEvent.useQuery(
    {
      name: bundleName,
      event: event.name,
    },
  );

  const [cart, setCart] = useAtom(cartAtom);
  const amount =
    cart.find(
      (item) =>
        item.event.name === event.name && item.event.bundle === bundleName,
    )?.quantity ?? 0;

  useEffect(() => {
    function runEffect() {
      if (available === false) {
        setCart((prev) =>
          prev.filter(
            (item) =>
              item.event.name !== event.name ||
              item.event.bundle !== bundleName,
          ),
        );
      }
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [available]);

  if (isLoading) {
    return <BundleCardLoading />;
  }

  if (isError) {
    return null;
  }

  const handleDecrement = () => {
    if (amount === 0) {
      return;
    }
    if (amount === 1) {
      setCart((prev) =>
        prev.filter(
          (item) =>
            item.event.bundle !== bundleName || item.event.name !== event.name,
        ),
      );
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.event.bundle !== bundleName || item.event.name !== event.name
          ? item
          : {
              ...item,
              quantity: item.quantity - 1,
              participants: item.participants.slice(0, -bundle.quantity),
            },
      ),
    );
  };
  const handleIncrement = () => {
    if (amount === bundle.maxPurchases) {
      return;
    }
    setCart((prev) => {
      if (
        prev.find(
          (item) =>
            item.event.name === event.name && item.event.bundle === bundleName,
        )
      ) {
        return prev.map((item) =>
          item.event.name !== event.name || item.event.bundle !== bundleName
            ? item
            : {
                ...item,
                quantity: item.quantity + 1,
                participants: item.participants.concat(
                  Array(bundle.quantity)
                    .fill(0)
                    .map((_) => ""),
                ),
              },
        );
      }
      return prev.concat({
        event: {
          name: event.name,
          bundle: bundleName,
        },
        quantity: 1,
        participants: Array(bundle.quantity)
          .fill(0)
          .map((_) => ""),
      });
    });
  };

  return (
    <>
      {/* Mobile */}
      <section className="flex border text-gtd-secondary-30 border-zinc-300 w-full h-1/5 p-3 rounded-lg md:hidden">
        <div className="grow">
          <h2 className="text-gtd-secondary-20 font-medium text-xl">
            {event.name}{" "}
            <span className="whitespace-nowrap">({bundle.name})</span>
          </h2>

          <div className="my-1.5 space-y-0.5">
            {event.name === "Escape Room" && (
              <p className="text-gtd-secondary-10 text-sm italic">
                {" "}
                <Info className="inline text-black size-4 mr-3" />
                Only team leader that need to register
              </p>
            )}
            <p className="text-gtd-secondary-10 text-sm">
              {" "}
              <FaRegClock className="inline text-black text-base" /> &nbsp;{" "}
              {dayjs.utc(event.startDate).format("D MMMM")}{" "}
            </p>

            <p className="text-gtd-secondary-10 text-sm">
              {" "}
              <MdOutlineLocationOn className="inline scale-[130%] text-black text-base" />{" "}
              &nbsp; {event.location}{" "}
            </p>
          </div>

          <BundleCardPopup
            event={{
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
          {bundle.name === "Individual" ? (
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
            {available ? (
              <>
                <button
                  onClick={handleDecrement}
                  className={cn(
                    "text-white rounded-full text-sm w-5 h-5 bg-gtd-primary-30 hover:bg-gtd-primary-30/8",
                    amount === 0 ? "opacity-60 pointer-events-none" : "",
                  )}
                >
                  -
                </button>
                &nbsp;&nbsp;
                <p>{amount}</p>
                &nbsp;&nbsp;
                <button
                  onClick={handleIncrement}
                  className={cn(
                    "bg-gtd-primary-30 hover:bg-gtd-primary-30/85 text-white rounded-full text-sm w-5 h-5",
                    amount === bundle.maxPurchases
                      ? "opacity-60 pointer-events-none"
                      : "",
                  )}
                >
                  +
                </button>
              </>
            ) : (
              <p className="text-red-800 text-sm">Sold Out</p>
            )}
          </div>
        </div>
      </section>

      {/* Desktop */}
      <section className="hidden md:flex border text-gtd-secondary-30 border-zinc-300 w-full h-1/5 p-3 rounded-lg">
        <div className="grow">
          <h2 className="text-gtd-secondary-20 font-medium text-xl">
            {event.name}{" "}
            <span className="whitespace-nowrap">({bundle.name})</span>
          </h2>

          <div className="my-1.5 space-y-0.5">
            <p className="text-gtd-secondary-10 text-md">
              {" "}
              <FaRegClock className="inline text-black text-base" /> &nbsp;{" "}
              {dayjs.utc(event.startDate).format("D MMMM")}{" "}
            </p>

            <p className="text-gtd-secondary-10 text-md">
              {" "}
              <MdOutlineLocationOn className="inline scale-[130%] text-black text-base" />{" "}
              &nbsp; {event.location}{" "}
            </p>
          </div>
          <BundleCardPopup
            event={{
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
          {bundle.name === "Individual" ? (
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
            {available ? (
              <>
                <button
                  onClick={handleDecrement}
                  className={cn(
                    "text-white rounded-full text-sm w-5 h-5 bg-gtd-primary-30 hover:bg-gtd-primary-30/8",
                    amount === 0 ? "opacity-60 pointer-events-none" : "",
                  )}
                >
                  -
                </button>
                &nbsp;&nbsp;
                <p>{amount}</p>
                &nbsp;&nbsp;
                <button
                  onClick={handleIncrement}
                  className={cn(
                    "bg-gtd-primary-30 hover:bg-gtd-primary-30/85 text-white rounded-full text-sm w-5 h-5",
                    amount === bundle.maxPurchases
                      ? "opacity-60 pointer-events-none"
                      : "",
                  )}
                >
                  +
                </button>
              </>
            ) : (
              <p className="text-red-800 text-sm">Sold Out</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
