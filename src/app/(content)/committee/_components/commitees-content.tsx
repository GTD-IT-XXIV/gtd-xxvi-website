"use client";

import { useMemo } from "react";

import { COMMITTEES } from "@/lib/constants";
import { useHasMounted, useScreenSize } from "@/lib/hooks";

import { getCommitteesGrid } from "../_utils";
import CommitteesCarousel from "./committees-carousel";

export default function CommiteesContent() {
  const hasMounted = useHasMounted();
  const screenSize = useScreenSize();

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

  if (!hasMounted) {
    return null;
  }
  return (
    <div className="bg-repeat bg-[url('/committee-background.webp')] bg-contain pt-12 space-y-4">
      {committeesGrid.map((committeesRow, index) => (
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
