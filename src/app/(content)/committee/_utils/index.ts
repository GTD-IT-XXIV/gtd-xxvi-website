import { DEFAULT_COMMITTEE_COLS, PORTFOLIOS } from "@/lib/constants";
import { type Committee } from "@/lib/types";

export const getCommitteesGrid = (
  committees: Committee[][],
  cols: number = DEFAULT_COMMITTEE_COLS,
) => {
  const rows =
    Math.floor(
      (committees.reduce(
        (acc, portfolioCommitees) => Math.max(acc, portfolioCommitees.length),
        0,
      ) -
        1) /
        cols,
    ) + 1;
  const committeesGrid: Committee[][][] = [];

  for (let row = 0; row < rows; row++) {
    committeesGrid.push([]);
    for (const _ of PORTFOLIOS) {
      committeesGrid[row]!.push([]);
    }
  }

  for (let i = 0; i < committees.length; i++) {
    for (let j = 0; j < committees[i]!.length; j++) {
      const row = Math.floor(j / cols);
      committeesGrid[row]![i]!.push(committees[i]![j]!);
    }
  }
  return committeesGrid;
};
