import "client-only";

import { Prisma } from "@prisma/client";
import { type inferRouterOutputs } from "@trpc/server";
import { type ChangeEventHandler, type MouseEventHandler } from "react";

import { type AppRouter } from "@/server/root";

import { cn } from "@/lib/utils";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Bundle = RouterOutputs["bundle"]["getById"];

export type BundleOptionProps = {
  bundle: Bundle;
  quantity?: number;
  selected?: boolean;
  disabled?: boolean;
  max: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function BundleOption({
  bundle,
  quantity = 0,
  max,
  selected = false,
  disabled = false,
  onClick,
  onChange,
}: BundleOptionProps) {
  return (
    <section>
      <h2>Bundle: {bundle.name}</h2>
      <p>Price: {new Prisma.Decimal(bundle.price).toDP(2).toString()}</p>
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "p-2 bg-slate-200 hover:bg-slate-100",
          selected ? "border-2 border-green-500" : "",
        )}
        onClick={onClick}
      >
        Select Bundle
      </button>
      {selected && (
        <input
          type="number"
          className="border border-black"
          min={1}
          max={max}
          value={quantity !== 0 ? quantity : ""}
          onChange={onChange}
        />
      )}
    </section>
  );
}
