export function simplifyGuestName(guestName: string, guestLine: string) {
  guestName = guestName.trim(); // remove extra spaces

  if (guestName.toLowerCase().startsWith("gia đình")) {
    // Split by space and take the second word
    const parts = guestName.split(" ");
    return parts[2] ? parts[2] : parts[1]; // in case it's "gia đình bạn Tâm"
  } else if (guestName.toLowerCase() !== guestLine.toLowerCase()){
    // Take the first word
    return guestName.split(" ")[0];
  }

  return guestLine;
}

export function determineWe(guestName: string) {
  guestName = guestName.toLowerCase();
  if (guestName.includes("bạn") || guestName.includes("em")) {
    return "chúng mình";
  }
  if (guestName.includes("chị") || guestName.includes("anh") || guestName.includes("cô")) {
    return "bọn em";
  }

  return "chúng tôi";
}