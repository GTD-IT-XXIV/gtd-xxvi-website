"use client";

import { COMMITTEES } from "@/lib/constants";
import { useHasMounted, useScreenSize } from "@/lib/hooks";

import { getCommitteesGrid } from "../_utils";
import CommitteesCarousel from "./committees-carousel";

export default function CommiteesContent() {
  const hasMounted = useHasMounted();
  const screenSize = useScreenSize();

  let cols: number;
  switch (screenSize) {
    case "2xl": {
      cols = 7;
      break;
    }
    case "xl": {
      cols = 6;
      break;
    }
    case "lg": {
      cols = 5;
      break;
    }
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

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      {getCommitteesGrid(COMMITTEES, cols).map((committeesRow, index) => (
        <CommitteesCarousel
          key={index}
          committees={committeesRow}
          row={index}
        />
      ))}
    </>
  );
}
