import { GOOGLE_SHEET_ID } from "./constants";
import { sheets } from "./googleAuth";

export async function getGuestRowIdx(guestId: string) {
  guestId = guestId.toLowerCase();

  // 1️⃣ Read all guest IDs
  const read = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: "Guests!A2:A",
  });

  const rows = read.data.values || []; // e.g. [[ "anhNam" ], ["tam"], ...]
  // normalize names for comparison
  const ids = rows.map(r => (r[0] || "").toString().trim().toLowerCase());

  const foundIndex = ids.findIndex(id => id === guestId);
  if (foundIndex === -1) {
    return null;
  }

  const targetRow = foundIndex + 2; // A2 = first guest row

  return targetRow;
}