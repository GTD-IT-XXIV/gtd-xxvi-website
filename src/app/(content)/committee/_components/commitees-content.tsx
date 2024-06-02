import { COMMITTEES_GRID } from "@/lib/constants";

import CommitteesCarousel from "./committees-carousel";

export default function CommiteesContent() {
  return (
    <>
      {COMMITTEES_GRID.map((committeesRow, index) => (
        <CommitteesCarousel
          key={index}
          committees={committeesRow}
          row={index}
        />
      ))}
    </>
  );
}
