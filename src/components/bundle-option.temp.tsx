import "client-only";

import { Prisma } from "@prisma/client";

import { cn } from "@/lib/utils";

export type BundleOptionProps = {
  bundle: {
    name: string;
    quantity: number;
    price: Prisma.Decimal;
  };
  selected: boolean;
  disabled: boolean;
  amount: number;
  maxAmount: number;
  setAmount: (amount: number) => void;
  onSelect: () => void;
};

export default function BundleOption({
  bundle,
  selected,
  disabled,
  amount,
  maxAmount,
  setAmount,
  onSelect,
}: BundleOptionProps) {
  return (
    <section>
      <h3 className="text-lg">
        {bundle.name} ({bundle.quantity} person)
      </h3>
      <p>${new Prisma.Decimal(bundle.price).toDP(2).toString()}</p>
      <button
        type="button"
        className={cn(
          "p-2 bg-slate-200 enabled:hover:bg-slate-100 disabled:text-slate-400",
          selected ? "border-2 border-green-500" : "",
        )}
        onClick={onSelect}
        disabled={disabled}
      >
        Select Bundle
      </button>
      {selected && (
        <input
          type="number"
          min={1}
          max={maxAmount}
          value={amount !== 0 ? amount : ""}
          onChange={({ target }) =>
            setAmount(Number(target.value !== "" ? target.value : 0))
          }
          className="border border-black"
        />
      )}
    </section>
  );
}
