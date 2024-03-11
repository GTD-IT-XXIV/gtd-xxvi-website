import "client-only";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type QuantitySelectProps = {
  value?: number;
  onChange?: (quantity: number) => void;
  max?: number;
};

export default function QuantitySelect({
  value = 0,
  onChange = (_: number) => null,
  max,
}: QuantitySelectProps) {
  const [amount, setAmount] = useState(value);

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      setAmount(value);
    }
    return () => {
      ignored = true;
    };
  }, [value]);

  function handleDecrement() {
    setAmount((prev) => prev - 1);
    onChange(amount - 1);
  }

  function handleIncrement() {
    setAmount((prev) => prev + 1);
    onChange(amount + 1);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={handleDecrement}
        disabled={amount === 0}
        className={cn(
          "text-white rounded-full text-sm size-5 aspect-square bg-gtd-primary-30 hover:bg-gtd-primary-30/85",
          amount === 0 ? "opacity-60 pointer-events-none" : "",
        )}
      >
        -
      </button>
      <p>{amount}</p>
      <button
        onClick={handleIncrement}
        disabled={amount === max}
        className={cn(
          "text-white rounded-full text-sm size-5 aspect-square bg-gtd-primary-30 hover:bg-gtd-primary-30/85",
          amount === max ? "opacity-60 pointer-events-none" : "",
        )}
      >
        +
      </button>
    </div>
  );
}
