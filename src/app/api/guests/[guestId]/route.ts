import { NextResponse } from "next/server";
import { GOOGLE_SHEET_ID } from "@/utils/constants";
import { sheets } from "@/utils/googleAuth";

export async function GET(req: Request, { params }: any) {
  try {
    let { guestId } = await params;
    if (!guestId) {
      return NextResponse.json({ });
    }

    guestId = guestId.toLowerCase();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "Guests!A:B", // id, name
    });

    const rows = response.data.values || [];

    const guests = rows.slice(1).map(([id, name]) => ({
      id: id?.trim().toLowerCase(),
      name: name?.trim(),
    }));

    const guest = guests.find((g) => g.id === guestId);

    return NextResponse.json({ name: guest?.name });
  } catch (err) {
    console.error("❌ Google Sheets error:", err);
    return NextResponse.json(
      { error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}
