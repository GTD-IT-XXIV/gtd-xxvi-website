import {
  LuHome as Home,
  LuInfo as Info,
  LuMap as Map,
  LuTrophy as Trophy,
  LuUsers as Users,
} from "react-icons/lu";

import { getCommitteesGrid } from "@/app/(content)/committee/_utils";

import { type Committee } from "./types";

export const MAX_BUNDLE_PURCHASES = 99;
export const MAX_TRANSACTION_RETRIES = 3;

export const BREVO_EMAIL = "devpintugtd@gmail.com";
export const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export const TOAST_LIMIT = 3;
export const TOAST_REMOVE_DELAY = 5000;

export const BASE_URL = "https://pintugtd.com";

export const ROUTES = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Events",
    path: "/events",
    icon: Map,
  },
  // {
  //   name: "Merchandise",
  //   path: "/merch",
  //   icon: Shirt,
  // },
  // {
  //   name: "Cart",
  //   path: "/merch/details",
  //   icon: ShoppingCart,
  // },
  {
    name: "Leaderboards",
    path: "/leaderboards",
    icon: Trophy,
  },
  {
    name: "Committee",
    path: "/committee",
    icon: Users,
  },
  {
    name: "About Us",
    path: "/about",
    icon: Info,
  },
];

/**
 * Note that for now by default the for length would be equal to 2
 * Thus, the configuration for each portfolio sections will not be parameterized (tentatively).
 */
export const ROW_LENGTH = 2;

export const PORTFOLIOS: string[] = [
  "TOPS",
  "POLOG",
  "PPIT",
  "WELFARE",
  "BFM",
  "GL",
];
const _COMMITTEES: Omit<Committee, "portfolio">[][] = [
  [
    {
      name: "TOPS 1",
    },
    {
      name: "TOPS 2",
    },
    {
      name: "TOPS 3",
    },
    {
      name: "TOPS 4",
    },
  ],
  [
    {
      name: "POLOG 1",
    },
    {
      name: "POLOG 2",
    },
    {
      name: "POLOG 3",
    },
    {
      name: "POLOG 4",
    },
    {
      name: "POLOG 5",
    },
    {
      name: "POLOG 6",
    },
    {
      name: "POLOG 7",
    },
    {
      name: "POLOG 8",
    },
  ],
  [
    {
      name: "PPIT 1",
    },
    {
      name: "PPIT 2",
    },
    {
      name: "PPIT 3",
    },
    {
      name: "PPIT 4",
    },
    {
      name: "PPIT 5",
    },
    {
      name: "PPIT 6",
    },
    {
      name: "PPIT 7",
    },
  ],
  [
    {
      name: "Welfare 1",
    },
    {
      name: "Welfare 2",
    },
    {
      name: "Welfare 3",
    },
    {
      name: "Welfare 4",
    },
    {
      name: "Welfare 5",
    },
    {
      name: "Welfare 6",
    },
    {
      name: "Welfare 7",
    },
    {
      name: "Welfare 8",
    },
  ],
  [
    {
      name: "BFM 1",
    },
    {
      name: "BFM 2",
    },
    {
      name: "BFM 3",
    },
    {
      name: "BFM 4",
    },
    {
      name: "BFM 5",
    },
    {
      name: "BFM 6",
    },
    {
      name: "BFM 7",
    },
    {
      name: "BFM 8",
    },
  ],
  [
    {
      name: "GL 1",
    },
    {
      name: "GL 2",
    },
    {
      name: "GL 3",
    },
    {
      name: "GL 4",
    },
    {
      name: "GL 5",
    },
    {
      name: "GL 6",
    },
    {
      name: "GL 7",
    },
    {
      name: "GL 8",
    },
  ],
];

export const COMMITTEES = _COMMITTEES.map((portfolioCommitees, index) =>
  portfolioCommitees.map((committee) => ({
    ...committee,
    portfolio: PORTFOLIOS[index]!,
  })),
);

export const COMMITTEES_GRID = getCommitteesGrid(COMMITTEES);
