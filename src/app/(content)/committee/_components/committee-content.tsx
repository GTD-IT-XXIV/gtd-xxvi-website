"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { indexAtom } from "@/lib/atoms/committee";
import { COMMITTEES, PORTFOLIOS } from "@/lib/constants";
import { useHasMounted, useScreenSize } from "@/lib/hooks";

import { getCommitteesGrid } from "../_utils";
import CommitteeBorder from "./committee-border";
import CommitteePortfolioFrame from "./committee-portfolio-frame";
import CommitteesCarousel from "./committees-carousel";

export default function CommitteeContent() {
  const hasMounted = useHasMounted();
  const screenSize = useScreenSize();
  const index = useAtomValue(indexAtom);

  let cols: number;
  switch (screenSize) {
    case "2xl":
    case "xl":
    case "lg":
    case "md": {
      cols = 4;
      break;
    }
    case "sm": {
      cols = 3;
      break;
    }
    case "xs": {
      cols = 2;
      break;
    }
  }

  const committeesGrid = useMemo(
    () => getCommitteesGrid(COMMITTEES, cols),
    [cols],
  );

  return (
    <div className="bg-repeat bg-[url('/committee-background.webp')] relative z-0 min-h-screen bg-contain py-12 space-y-4">
      <CommitteeBorder className="absolute inset-x-0 top-0" />
      <div className="absolute inset-x-0 top-0 flex justify-center">
        <CommitteePortfolioFrame
          portfolio={PORTFOLIOS[index]!}
          className="w-52 sm:w-60 lg:w-80 xl:w-[24rem] -mt-9 lg:-mt-10 xl:-mt-11 drop-shadow-lg"
        />
      </div>
      {hasMounted &&
        committeesGrid.map((committeesRow, index) => (
          <CommitteesCarousel
            key={index}
            committees={committeesRow}
            row={index}
            cols={cols}
          />
        ))}
    </div>
  );
}
