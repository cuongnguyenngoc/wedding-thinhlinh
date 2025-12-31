import { GOOGLE_SHEET_ID } from "./constants";
import { sheets } from "./googleAuth";

export async function getGuestRowData(guestId: string) {
  guestId = guestId.toLowerCase();

  // Read entire guest table (ID, Name, … LastVisit, VisitCount)
  const read = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: "Guests!A2:G", // make sure G is visit_count
  });

  const rows = read.data.values || [];

  // rows[i] = ["id", "name", ..., last_visit, visit_count]

  for (let i = 0; i < rows.length; i++) {
    const rowId = (rows[i][0] || "").trim().toLowerCase();
    if (rowId === guestId) {
      const rowIndex = i + 2;
      const visitCount = Number(rows[i][6] || 0); // col E

      return { rowIndex, visitCount };
    }
  }

  return null;
}
