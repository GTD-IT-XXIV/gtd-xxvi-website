import {
  LuHome as Home,
  LuInfo as Info,
  LuMap as Map,
  LuTrophy as Trophy,
  LuUsers as Users,
} from "react-icons/lu";

import committees from "@/assets/committee";

import type { Committee } from "./types";

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
export const DEFAULT_COMMITTEE_COLS = 2;

export const PORTFOLIOS = [
  "TOPS & MC",
  "BFM",
  "GL",
  "POLOG",
  "PPIT",
  "Welfare",
] as const;

export const COMMITTEES = committees as Committee[][];
