import { atom } from "jotai";

export const indexAtom = atom(0);
export const actionAtom = atom<"IDLE" | "NEXT" | "PREV">("IDLE");
