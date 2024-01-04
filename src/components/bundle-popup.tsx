"use client";

import React, { Children, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function BundlePopup({
  children,
}: {
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const childrenArr = Children.toArray(children);

  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger asChild>
        <button type="button" className="p-2 bg-slate-200 hover:bg-slate-100">
          Show Bundles
        </button>
      </DialogTrigger>
      <DialogContent>
        {childrenArr[index]}
        <div className="flex space-x-3">
          <button
            type="button"
            className="p-2 bg-slate-200 hover:bg-slate-100"
            onClick={() => setIndex((state) => (state > 0 ? state - 1 : state))}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="p-2 bg-slate-200 hover:bg-slate-100"
            onClick={() =>
              setIndex((state) =>
                state < childrenArr.length - 1 ? state + 1 : state,
              )
            }
          >
            {">"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
