"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RSVPForm from "../sections/RSVPForm";
import { cardVariants, staggerContainer } from "../utils";
import GiftSection from "../sections/GiftAndQrCode";
import OverlayPanel from "../sections/OverlayPannel";
import GuestSection from "../sections/GuestSection";
import MusicPlayer from "../utils/MusicPlayer";
import { greatVibes } from "@/utils/font";
import { determineWe, simplifyGuestName } from "@/utils";
import { brideInviteData, inviteData } from "@/utils/data";

export default function HomeScreen() {
  const [musicPlay, setMusicPlay] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const [guestId, setGuestId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState(inviteData.guestLine);
  const [currentInviteData, setCurrentInviteData] = useState(inviteData);
  const [side, setSide] = useState("");
  const [noQR, setNoQR] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      async function loadGuestInfo(guestId: string | null) {
        if (!guestId) {
          return;
        }

        const res = await fetch(`/api/guests/${guestId}`);
        const { name } = await res.json();
        if (name) {
          setGuestName(name);
        }
      }

      const params = new URLSearchParams(window.location.search);
      const guestId = params.get("guest");
      loadGuestInfo(guestId);

      if (guestId) {
        setGuestId(guestId);
      }

      const side = params.get("side");
      if (side === "bride") {
        setCurrentInviteData(brideInviteData);
        setSide(side);
      }

      const noQR = params.get("noQR");
      if (noQR === "true") {
        setNoQR(true);
      }
    }
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-[linear-gradient(180deg,#fdf5f3_0%,#fff8f5_100%)] text-[#c23636] font-serif overflow-x-hidden">
      {/* Cover background */}
      <div className="fixed inset-0 -z-10 bg-red-700/95 pointer-events-none">
        <div className="w-full h-full bg-repeat opacity-30" />
      </div>

      {/* SECTION 1: COVER */}
      <section
        id="cover"
        className="relative min-h-screen flex items-center justify-center px-6 bg-cream overflow-hidden"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-cream/60"></div>

        {/* Card with staggered text */}
        <motion.div
          className="relative z-10 w-full max-w-md text-center bg-cream/90 rounded-3xl p-8"
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="
              text-lg sm:text-xl md:text-2xl 
              text-[#c23636] uppercase tracking-widest font-semibold
              mb-2
            "
            variants={cardVariants}
          >
            NHÀ CÓ HỶ
          </motion.div>

          <motion.div
            className="
              text-lg sm:text-xl md:text-2xl 
              text-[#c23636] uppercase tracking-widest font-semibold
              m-5
            "
            variants={cardVariants}
          >
            Lễ {currentInviteData.weddingTitle}
          </motion.div>

          <motion.h1
            className={`text-4xl md:text-5xl text-[#c23636] leading-none whitespace-nowrap mt-5 ${greatVibes.className}`}
            variants={cardVariants}
            dangerouslySetInnerHTML={{ __html: inviteData.coupleNames }}
          >
          </motion.h1>

          <motion.div
            className="mt-6 mx-auto w-25 h-25 bg-gradient-to-br flex items-center justify-center shadow-inner border-2 text-red-600 text-7xl"
            variants={cardVariants}
          >
            囍
          </motion.div>

          <motion.p className={`mt-2 text-base md:text-lg italic text-[#c23636] ${greatVibes.className}`} variants={cardVariants}>
            {currentInviteData.dateLabel}
          </motion.p>

          <motion.p className={`mt-2 text-xl md:text-2xl font-semibold text-[#c23636] ${greatVibes.className}`} variants={cardVariants}>
            {currentInviteData.date}
          </motion.p>

          <motion.div className="mt-6 mx-auto w-full max-w-md" variants={cardVariants}>
            <div className="border-4 border-[#f0dede] p-1 rounded-md bg-[#fff1f0] overflow-hidden">
              <img src={currentInviteData.mainPhoto} alt="couple" className="w-full h-auto object-contain" />
            </div>
          </motion.div>

          <motion.button
            onClick={() => scrollTo("invite")}
            className="mt-6 mx-auto block text-sm text-[#c23636] opacity-90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={cardVariants}
          >
            <div className="animate-bounce">Lướt xuống ▾</div>
          </motion.button>
        </motion.div>

        {/* Overlay animation */}
        <OverlayPanel onOpen={() => setMusicPlay(true)} />

      </section>

      {/* Helper function for section content */}
      {/** We’ll wrap each section’s inner content in a motion.div with staggerContainer **/}

      {/* SECTION 2: MAIN INVITATION */}
      <motion.section
        id="invite"
        className="flex justify-center py-10 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border-2 border-[#f7e8e5] overflow-hidden">
          <motion.div
            className="p-6 md:p-10 text-center"
            variants={staggerContainer}
          >
            <motion.div
              className="
                text-lg sm:text-xl md:text-2xl 
                text-[#c23636] uppercase tracking-widest font-semibold
                mb-2
              "
              variants={cardVariants}
            >
              Thiệp mời
            </motion.div>

            {/* Decorative divider */}
            <motion.div
              className="mx-auto mb-4 w-24 h-0.5 bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-full"
              variants={cardVariants}
            />

            <motion.h2
              className={`
                text-center 
                text-3xl sm:text-4xl md:text-5xl 
                font-bold 
                leading-tight
                mb-4
                ${greatVibes.className}
              `}
              variants={cardVariants}
              dangerouslySetInnerHTML={{ __html: inviteData.coupleNames }}
            >
            </motion.h2>

            <motion.div
              className={`mt-2 text-[#c23636] text-base sm:text-lg ${greatVibes.className}`}
              variants={cardVariants}
            >
              {currentInviteData.dateLabel}
            </motion.div>

            <motion.div
              className={`mt-1 text-xl sm:text-2xl font-semibold text-[#c23636] ${greatVibes.className}`}
              variants={cardVariants}
            >
              {currentInviteData.date}
            </motion.div>

            <motion.div className="mt-6 mx-auto w-full max-w-md" variants={cardVariants}>
              <div className="border-4 border-[#f0dede] p-1 rounded-md bg-[#fff1f0] overflow-hidden hover:shadow-lg hover:scale-105 transition-transform">
                <img src={currentInviteData.secondPhoto} alt="couple" className="w-full h-auto object-contain rounded-sm" />
              </div>
            </motion.div>

            <motion.p
              className="mt-6 text-sm sm:text-base text-[#c23636] leading-relaxed text-center sm:text-left"
              variants={cardVariants}
            >
              Trân trọng kính mời{' '}
              <strong>
                <span className={`text-lg sm:text-xl leading-tight ${greatVibes.className}`}>
                  {guestName}
                </span>
              </strong>{' '}đến dự lễ {currentInviteData.weddingTitle} của {determineWe(guestName)}.
            </motion.p>

            <motion.div
              className="mt-6 flex justify-center gap-4"
              variants={cardVariants}
            >
              <button
                onClick={() => scrollTo("guest")}
                className="px-4 py-2.5 rounded-full bg-[#b33] text-white text-sm font-medium shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out cursor-pointer"
              >
                Xem lời mời
              </button>

              <button
                onClick={() => scrollTo("rsvp")}
                className="px-4 py-2.5 rounded-full border border-[#d9b49a] text-[#c23636] text-sm bg-[#fff7f6] font-medium hover:scale-105 hover:shadow-md transition-transform duration-200 ease-in-out cursor-pointer"
              >
                Gửi lời chúc
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* SECTION: NHÀ TRÁI & NHÀ GÁI */}
      <motion.section
        id="family"
        className="relative flex justify-center py-8 px-4 bg-[#fff8f5] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div
          className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-[#f4e6e3] p-6 text-center"
          variants={staggerContainer}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-[#c23636] mb-6"
            variants={cardVariants}
          >
            Nhà Trai & Nhà Gái
          </motion.h3>

          <motion.div className="mt-3 grid grid-cols-2 gap-6" variants={staggerContainer}>
            <motion.div className="bg-[#fff1f0] p-1 rounded-lg shadow-md flex flex-col items-center" variants={cardVariants}>
              <h4 className="font-semibold text-[#b33] text-lg md:text-xl mb-4">Nhà Gái</h4>
              <p
                className={`text-[1.6rem] md:text-[1.7rem] text-[#c23636] font-medium mb-3 ${greatVibes.className}`}
                dangerouslySetInnerHTML={{ __html: inviteData.brideFamily }}
              />
              <p className="text-small md:text-base text-[#c23636] opacity-80 leading-relaxed">
                {inviteData.brideAddress}
              </p>
            </motion.div>

            <motion.div className="bg-[#fff1f0] p-1 rounded-lg shadow-md flex flex-col items-center" variants={cardVariants}>
              <h4 className="font-semibold text-[#b33] text-lg md:text-xl mb-4">Nhà Trai</h4>
              <p
                className={`text-[1.6rem] md:text-[1.7rem] text-[#c23636] font-medium mb-3 ${greatVibes.className}`}
                dangerouslySetInnerHTML={{ __html: inviteData.groomFamily }}
              />
              <p className="text-small md:text-base text-[#c23636] opacity-80 leading-relaxed">
                {inviteData.groomAddress}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.section>


      {/* SECTION 3: GUEST / DETAILS */}
      <GuestSection guestName={guestName} inviteData={currentInviteData} staggerContainer={staggerContainer} cardVariants={cardVariants} />

      {/* SECTION 5: CALENDAR */}
      <motion.section
        id="calendar"
        className="flex justify-center py-12 px-6 bg-[#fff4f2]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-[#f4e6e3] p-8 text-center -mt-6">
          <motion.div className="flex flex-col items-center" variants={staggerContainer}>
            <motion.h3 className="text-xl font-semibold text-[#c23636]" variants={cardVariants}>
              Lịch ghi nhớ
            </motion.h3>

            <motion.div className="grid grid-cols-7 gap-2 mt-4 text-[#c23636] font-semibold" variants={cardVariants}>
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d,i) => <div key={i} className="mr-2">{d}</div>)}
            </motion.div>

            <motion.div className="grid grid-cols-7 gap-2 mt-2" variants={cardVariants}>
              {(() => {
                const year = 2026;
                const month = 0; // ✅ January (0-indexed)
                const daysInMonth = 31;

                // Jan 1, 2026 is Thursday → getDay() = 4
                const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday

                // Convert JS week (Sun=0) → calendar (T2–T7, CN)
                const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;
                // Put your actual event dates here:
                let markedDates: Record<number, string[]> = {
                  10: [
                    "bg-[#f59e0b] text-[#f9c08a] font-bold",        // lễ vu quy
                  ],
                };
                if (side === "bride") {
                  markedDates = {
                    10: [
                      "bg-[#f59e0b] text-[#f9c08a] font-bold", // bữa cơm thân mật
                    ],
                  };
                }

                const totalCells = daysInMonth + startDayIndex;

                return [...Array(totalCells)].map((_, i) => {
                  if (i < startDayIndex) return <div key={i}></div>;
                  const day = i - startDayIndex + 1;
                  const highlightClasses = markedDates[day] || [];

                  return (
                    <div
                      key={i}
                      className="relative flex items-center justify-center p-2 rounded-full hover:scale-105 transition"
                    >
                      {day}

                      {/* Dots for events */}
                      {highlightClasses.length > 0 && (
                        <div className="absolute bottom-0.5 flex gap-1">
                          {highlightClasses.map((cls, idx) => (
                            <span
                              key={idx}
                              className={`w-2 h-2 rounded-full border border-white ${cls}`}
                            ></span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </motion.div>
            <motion.div className="mt-4 text-sm text-[#c23636]" variants={cardVariants}>
              <div><span className="inline-block w-3 h-3 rounded-full bg-[#f59e0b] mr-1"></span>Bữa Cơm Thân Mật</div>
              {/* {side === "bride" && <div><span className="inline-block w-3 h-3 rounded-full bg-[#f7d3a6] mr-1"></span>Lễ Ăn Hỏi</div>}
              {side !== "bride" && <div><span className="inline-block w-3 h-3 rounded-full bg-[#b33] mr-1"></span>Lễ Ăn Hỏi</div>} */}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* SECTION 6: PHOTO ALBUM */}
      <motion.section
        id="album"
        className="flex flex-col items-center justify-start py-12 px-6 bg-[#fff4f2]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.div className="w-full max-w-5xl text-center -mt-6" variants={staggerContainer}>
          <motion.h3 className="text-2xl md:text-3xl font-semibold text-[#c23636] mb-6" variants={cardVariants}>
            Khoảnh khắc của {determineWe(guestName)}
          </motion.h3>
          <motion.div className="flex overflow-x-auto space-x-4 py-4 px-2" variants={cardVariants}>
            {Array.from({ length: 8 }, (_, i) => i + 5).map((num) => {
              const photoUrl = `/images/${num}.jpg`;
              return (
                <motion.div
                  key={num}
                  className="flex-shrink-0 w-64 h-64 rounded-2xl overflow-hidden border-4 border-[#f0dede] shadow-lg bg-[#fff1f0] cursor-pointer"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(183,51,51,0.3)" }}
                  onClick={() => setSelectedPhoto(photoUrl)}
                >
                  <img
                    src={photoUrl}
                    alt={`album-${num}`}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </motion.div>
              );
            })}
          </motion.div>
          {/* showing whole image when click */}
          {selectedPhoto && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 cursor-pointer"
              onClick={() => setSelectedPhoto(null)}
            >
              <img src={selectedPhoto} className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg" />
            </div>
          )}

          <motion.p className="mt-6 text-sm text-[#c23636]" variants={cardVariants}>
            Cảm ơn{' '}
              <strong>
                <span className={`text-lg sm:text-xl leading-tight ${greatVibes.className}`}>
                  {simplifyGuestName(guestName, inviteData.guestLine)}
                </span>
              </strong>{' '}đã đồng hành cùng {determineWe(guestName)} trên hành trình này.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* SECTION 7: RSVP */}
      <motion.section
        id="rsvp"
        className="flex justify-center py-12 px-6 bg-[#fff8f5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div
          className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-[#f4e6e3] p-8 text-center -mt-6"
          variants={staggerContainer}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-[#c23636]"
            variants={cardVariants}
          >
            Xác Nhận Tham Dự & Gửi Lời Chúc
          </motion.h3>

          <RSVPForm guestId={guestId} guestName={guestName} guestLine={inviteData.guestLine} />
        </motion.div>
      </motion.section>

      {/* SECTION 8: QR / Gifts */}
      {!noQR && !currentInviteData.noQR && <GiftSection side={side} />}

      <footer className="py-8 text-center text-xs text-[#c23636]">
        <div>Designed with ❤</div>
      </footer>

      {musicPlay && <MusicPlayer volume={0.5} />}

      <style>{`
        .bg-cream\\/90{ background-color: rgba(255,245,238,0.9); }
      `}</style>
    </div>
  );
}
