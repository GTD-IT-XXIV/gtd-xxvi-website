"use server";

import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { api } from "@/server/trpc";

export async function synchronizeToGoogleSheets() {
  const email = "gtd-fest@gtd-sheets.iam.gserviceaccount.com";
  const key =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC43habIC/gbDlO\nW/L5setnR+Zz4Z8QHe/lZ5jeakha1gcKqGDx1SQdIVAtYWQiO1AI8VsbZGAb7c9O\nqlAgu+IwaLLdqjYi2Ajv5gCg+tw6F9WcATBs+Ed/OjqT52bKu7CR9FKVUosGiiRk\nyWdIzl9UIeH9+AY2i4mF8iDFP4oi0z1HXCms6dWRAQCKBYu9GuuM3TmJO2qqAya5\n69eBknsIfVAY+Lqsi0gX0b+5Bgx9U4/tZM/OO1vIUlxUEY5yU2m42r+PhOQZNUEC\nDD6a8xQFZg706rOJb4scdWaYEziZyGcOrtkNrQW9f8eGowc/pPXLK50oPFVwMtap\noInKweP7AgMBAAECggEAWiRQuYtUTQX4W3ESZRaQRmgUwuR8/wrZ8u406B7C8Sfz\nfwrjWognd9zKj5YxkU+Ckxm85vpmsreeoikBsTRr8lbbAKMCirL0iKWKIPSxddIx\nYkRiLIBTvIHUFlJ7GNe0HTcZHZ6GE8ZAQLTEHAglC40J+SB7RxV7FUkfGY8F+Dxa\n9EEg8tHtc+94doUYRNhzjh1VG/aVv9gEHs6qcs7EsGmYvseT0u/eF9dgzt7yZxPS\nFWM9KBA0Z51CaSSTxid/Q0OUW1136g+EHIK4mrg+0aEE2pNepenSLNf7pwK0GHT6\nUI2iCmDYjrMJqnvRvXwneCExOyp4uo2aiWnhQ60EYQKBgQDyr3noOLpPZiVrAqHi\n0q5jMw3AQe3XFb0nriFEzKe28Sv/UX18i0JEBpRRmOsXE+pUionRccWqqJzpGc1C\ng1QduyuRNj5lO0Q+O6c5I53jbagoiOo1/BV9DpazlFl4ZXdWNV1FlxDQRl3mcS1O\n/GYiRL2nocZldx4x8tE/iG105QKBgQDDAo7NpaN9RrqLIXHVP8iXjRsanCh8317c\n3U4amADpltWuJxD2tzjLGGfyi6WqzAZd4086pEJzHrvwVyWG56IJip+UIQ4zLsLZ\nmSAuiPt0QTlgxPRV/9+dJEBdl9iuM8uctX5qvDgD/jOIV3Vt+V5hzGiQlWVGe9Vx\nnJgnIFhHXwKBgFuHHNYdVv8NCj2yr3WJeeXF4oDJHLeK5l0pyjhVa0eO68YOaOJo\n7yQSyyt/HeMFStJ5sYLBgwhbMVqktYpJV5ci+Up6B8xMLu+9tdLSAQE+YTZwdMzJ\ndx1EPEgcQiYrNnfYBoZxdBDpCQ8ZTjpE7Qwtms23MMkhxMyXxJ1OieGVAoGBAJex\nDqpTNWiGsyb03hp2oi+ZOMMrQ6dXDfCaSV4QbW1GwnLUurJfddMt6fXWwQip6i3w\nWroP+gyYlLLw5yUYW4g2h8lvKR+ROUqQfWMVdRxKfDqVGkcnYadYAqWLL6babYE6\nANtADAa3Hxjoh1UDjHJg0dneDEiWnULh/803sNPbAoGAMgnXtBGBstm10vzQNfqG\n5PC9F5IiMXhzjXrZBXKPYW7EIug0a3juDSCXdfrasIHX/b2300TffCWIBGLQR+jB\nkGls55nAIPmm/XswsiaBgAgKN74lcxYefWBXy7XDgi+0390vnewvcBBXVgH0qWlV\n23XWPIHX7AIzLzNqwOzD/LQ=\n-----END PRIVATE KEY-----\n";
  const auth = new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    "1bdLecVd3AaaZo7ZbLV9DGA2ZgYZBr8Rg1bBfJ_5nMTA",
    auth,
  );
  await doc.loadInfo();
  const { tickets } = await api.ticket.getAll.query({});
  const columns = [
    "id",
    "name",
    "email",
    "telegramHandle",
    "phoneNumber",
    "bundleId",
    "timeslotId",
    "created",
    "paymentIntentId",
  ]; // customize the columns

  const sheet = doc.sheetsByIndex[0];
  await sheet?.setHeaderRow(columns);
  await sheet?.addRows(tickets);
  console.log(sheet);
}
