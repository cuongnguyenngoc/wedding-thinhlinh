export interface InviteDataType {
  weddingTitle: string;
  coupleNames: string;
  coupleNamesMeta: string;
  dateLabel: string;
  time: string;
  date: string;
  venue: string;
  groomFamily: string;
  groomAddress: string;
  brideFamily: string;
  brideAddress: string;
  guestLine: string;
  mainPhoto: string;
  secondPhoto: string;
  leftPhotos: string[];

  mapUrl: string;
  mapEmbedUrl: string;
  side: string;

  mealLabel?: string;
  mealTime?: string;
  mealDate?: string;
  noQR?: boolean;
}

export const inviteData: InviteDataType = {
  weddingTitle: "Ăn Hỏi",
  coupleNames: `Đặng Thị Diệu Linh <span style="font-size:0.6em;">❤️</span><br />Mai Vũ Thịnh`,
  coupleNamesMeta: "Diệu Linh - Vũ Thịnh",

  dateLabel: "Thứ Bảy — 16:00",
  time: "16:00",
  date: "10.01.2026",

  venue: "Thôn Thạch Quyền, xã Cao Dương, tỉnh Phú Thọ",
  groomFamily: "Ông Mai Anh Tuấn <br /> Bà Vũ Thị Vân Anh",
  groomAddress: "Chú Rể: Mai Vũ Thịnh",
  brideFamily: "Ông Đặng Hữu Tuấn <br /> Bà Nguyễn Thị Liễu",
  brideAddress: "Cô Dâu: Đặng Diệu Linh",

  guestLine: "Quý Khách",
  mainPhoto: "/images/main.jpg",
  secondPhoto: "/images/1.jpg",
  leftPhotos: ["/images/2.jpg", "/images/3.jpg"],

  mapUrl: "https://maps.app.goo.gl/pogDUtyoRnMgCTvB9",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.3944589483476!2d105.65536619999999!3d20.6942007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313437edd6a039f5%3A0x3e0df44ec981b6e5!2zQ8OieSBYxINuZyBDYW8gRMawxqFuZw!5e0!3m2!1sen!2s!4v1767148375781!5m2!1sen!2s",

  side: "nhà gái",

  mealLabel: "Thứ 7 - 16:00",
  mealTime: "16:00 thứ 7 ngày 10 tháng 1",
  mealDate: "10.01.2026",
  noQR: true,
};



export const brideInviteData: InviteDataType = {
  ...inviteData,
  weddingTitle: "Ăn Hỏi",
  dateLabel: "Thứ Bảy — 16:00",
  time: "16:00",
  date: "10.01.2026",
  venue: "Thôn Thạch Quyền, xã Cao Dương, tỉnh Phú Thọ",
  mapUrl: "https://maps.app.goo.gl/pogDUtyoRnMgCTvB9",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.3944589483476!2d105.65536619999999!3d20.6942007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313437edd6a039f5%3A0x3e0df44ec981b6e5!2zQ8OieSBYxINuZyBDYW8gRMawxqFuZw!5e0!3m2!1sen!2s!4v1767148375781!5m2!1sen!2s",
  side: "nhà gái",
  mealLabel: "Thứ Bảy — 16:00",
  mealTime: "16:00 Chủ Nhật ngày 10 tháng 1",
  mealDate: "10.01.2026"
}