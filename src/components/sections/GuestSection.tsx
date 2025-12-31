"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import MapEmbed from "./MapEmbed";
import { greatVibes } from "@/utils/font";
import { determineWe } from "@/utils";
import { InviteDataType } from "@/utils/data";

interface GuestSectionProps {
  guestName: string;
  inviteData: InviteDataType;
  staggerContainer: Variants;
  cardVariants: Variants;
}

export default function GuestSection({
  guestName,
  inviteData,
  staggerContainer,
  cardVariants,
}: GuestSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <>
      {/* SECTION 3: GUEST / DETAILS */}
      <motion.section
        id="guest"
        className="flex justify-center py-12 px-6 bg-[#fff4f2]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-[#f4e6e3] p-8 text-center -mt-6">
          <motion.div className="flex flex-col items-center" variants={staggerContainer}>
            <motion.div className="text-sm sm:text-base text-[#c23636] uppercase tracking-widest" variants={cardVariants}>
              Trân trọng kính mời
            </motion.div>

            <motion.h3
              className="mt-4 text-2xl sm:text-3xl font-semibold text-[#c23636]"
              style={{ fontFamily: '"Great Vibes", cursive' }}
              variants={cardVariants}
            >
              {inviteData.guestLine.replace("bạn", guestName)}
            </motion.h3>

            {/* Photos */}
            <motion.div className="mt-6 grid grid-cols-2 gap-6 items-center justify-center">
              {inviteData.leftPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  className="rounded-lg overflow-hidden border-2 cursor-pointer border-[#f0dede] transition-shadow duration-300"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 12px 25px rgba(183,51,51,0.25)",
                  }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo}
                    alt={`small-${i}`}
                    className="w-full h-52 sm:h-64 object-cover transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="mt-6 text-sm sm:text-base text-[#c23636]" variants={cardVariants}>
              <motion.div
                className={`mt-2 text-[#c23636] text-base sm:text-lg ${greatVibes.className}`}
                variants={cardVariants}
              >
                {inviteData.mealLabel}
              </motion.div>
              <div className={`mt-3 text-lg sm:text-xl font-semibold text-[#c23636] ${greatVibes.className}`}>{inviteData.mealDate}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* IMAGE MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <img src={selectedPhoto} className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg" />
        </div>
      )}

      {/* SECTION 4: MEAL */}
      <motion.section
        id="meal"
        className="flex justify-center py-12 px-6 bg-[#fff8f5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-[#f4e6e3] p-8 text-center -mt-6">
          <motion.div className="flex flex-col items-center" variants={staggerContainer}>
            <motion.h3 className="text-xl font-semibold text-[#c23636]" variants={cardVariants}>
              Tới dự bữa cơm thân mật
            </motion.h3>

            <motion.p
              className="mt-6 text-sm sm:text-base text-[#c23636] leading-relaxed"
              variants={cardVariants}
            >
              Gia đình {determineWe(guestName)} trân trọng mời{" "}
              <strong>
                <span className="text-lg sm:text-xl leading-tight" style={{ fontFamily: '"Great Vibes", cursive' }}>
                  {guestName}
                </span>
              </strong>{" "}
              tới dự bữa cơm thân mật vào lúc{" "}
              <strong>{inviteData.mealTime ? inviteData.mealTime : inviteData.dateLabel}</strong> tại tư gia {inviteData.side}.
            </motion.p>

            <MapEmbed src={inviteData.mapEmbedUrl} />

            <motion.div className="mt-6 text-sm sm:text-base text-[#c23636]" variants={cardVariants}>
              <div>
                <span className="mr-2 font-medium">Địa điểm:</span>
                <span>{inviteData.venue}</span>
              </div>
            </motion.div>

            <motion.a
              href={inviteData.mapUrl}
              target="_blank"
              className="mt-4 inline-block text-sm text-[#b33] underline"
              variants={cardVariants}
            >
              Xem bản đồ
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}
