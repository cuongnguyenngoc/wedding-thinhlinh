export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sheets } from "@/utils/googleAuth";
import { getGuestRowIdx } from "@/utils/getGuestRowIdx";

export async function POST(req: Request) {
  try {
    let { guestId, name, message, attending } = await req.json();
    const timestamp = new Date().toISOString();
    if (!guestId || guestId === "null") {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Guests!A:E",
        valueInputOption: "RAW",
        requestBody: {
          values: [[`guest-${Date.now()}`, name, message || "", attending, timestamp]],
        },
      });

      return NextResponse.json({
        success: true,
        message: "New guest RSVP added!",
        mode: "append",
      });
    }

    const targetRow = await getGuestRowIdx(guestId);
    if (!targetRow) {
      return NextResponse.json(
        { success: false, error: "Guest ID not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Update the row
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `Guests!C${targetRow}:E${targetRow}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[message || "", attending || "", timestamp]],
      },
    });

    return NextResponse.json({
      success: true,
      message: "RSVP updated!",
    });
  } catch (error) {
    console.error("❌ Google Sheets Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
