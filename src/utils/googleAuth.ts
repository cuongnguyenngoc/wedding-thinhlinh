import { google } from "googleapis";
import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "./constants";

// 🔥 Create Google Auth ONCE (module-level)
const auth = new google.auth.JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// 🔥 Sheets client ONCE
export const sheets = google.sheets({ version: "v4", auth });