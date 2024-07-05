type OGEntry = {
  number: string; // OG: "1", "2", "3", ..., "8"
  points: number;
};

type HouseEntry = {
  name: string; // "Wanderer", "Healer", "Changeling", "Timeturner"
  points: number;
};

/**
 * GET `/leaderboards` response body.
 */
export type LeaderboardsResponse = {
  1: LeaderboardsDayResponse;
  2: LeaderboardsDayResponse;
  3: LeaderboardsDayResponse;
  overall: LeaderboardsDayResponse;
};

/**
 * GET `/leaderboards/:day` response body.
 */
export type LeaderboardsDayResponse = {
  top3OG: [OGEntry, OGEntry, OGEntry];
  topHouse: HouseEntry;
};

/**
 * GET `/leaderboards/all` response body.
 */
export type LeaderboardsAllResponse = {
  1: LeaderboardsAllDayResponse;
  2: LeaderboardsAllDayResponse;
  3: LeaderboardsAllDayResponse;
  overall: LeaderboardsAllDayResponse;
};

/**
 * GET `/leaderboards/all/:day` response body.
 */
export type LeaderboardsAllDayResponse = {
  topOG: OGEntry[];
  topHouse: HouseEntry[];
};
