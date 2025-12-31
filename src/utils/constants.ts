import dotenv from "dotenv";
dotenv.config();

if (!process.env.GOOGLE_CLIENT_EMAIL) {
  throw new Error("missing GOOGLE_CLIENT_EMAIL");
}
export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;

if (!process.env.GOOGLE_PRIVATE_KEY) {
  throw new Error("missing GOOGLE_PRIVATE_KEY");
}
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

if (!process.env.GOOGLE_SHEET_ID) {
  throw new Error("missing GOOGLE_SHEET_ID");
}
export const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
