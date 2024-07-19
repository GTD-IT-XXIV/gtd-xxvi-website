"use server";

import { env } from "@/env";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

type OgPoint = {
  number: string;
  points: number;
};

type HousePoint = {
  name: string;
  points: number;
};

type OgPoints = OgPoint[];

type HousePoints = HousePoint[];

export async function getLeaderboardsData() {
  const auth = new JWT({
    email: env.GOOGLE_CLIENT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });

  const doc = new GoogleSpreadsheet(env.LEADERBOARDS_SHEETS_ID, auth);
  await doc.loadInfo();
  const sheet1 = doc.sheetsByTitle.Total;
  if (!sheet1) {
    throw new Error("Sheet not found");
  }
  await sheet1.loadHeaderRow(2);
  const rows1 = await sheet1.getRows({ limit: 10 });

  const OG: OgPoints = rows1.slice(0, 8).map((row) => ({
    number: String(row.get("OG")),
    points: +row.get("OG Points"),
  }));

  const House: HousePoints = rows1
    .filter((_, index) => index % 2 === 0)
    .slice(0, 4)
    .map((row) => ({
      name: String(row.get("House")),
      points: +row.get("House Points"),
    }));

  const top3OG = OG.sort((a, b) => b.points - a.points).slice(0, 3);
  const topHouse = House.sort((a, b) => b.points - a.points)[0]!;

  return { top3OG, topHouse };
}
