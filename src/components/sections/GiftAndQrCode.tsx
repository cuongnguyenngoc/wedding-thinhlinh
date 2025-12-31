"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cardVariants, staggerContainer } from "../utils";

export default function GiftSection({ side }: { side: string }) {
  const [showQR, setShowQR] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  let qrCodeUrl = "/images/qr-code-1.jpg";
  if (side === "bride") {
    qrCodeUrl = "/images/qr-code-2.jpg"
  }

  return (
    <motion.section
      id="gift"
      className="flex justify-center py-12 px-6 bg-[#fff8f5]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-[#f4e6e3] p-8 text-center -mt-6">
        <motion.div className="flex flex-col items-center" variants={staggerContainer}>
          <motion.h3 className="text-xl font-semibold text-[#c23636]" variants={cardVariants}>
            Gửi mừng cưới
          </motion.h3>
          <motion.p className="mt-4 text-sm text-[#c23636] leading-relaxed" variants={cardVariants}>
            Quý khách có thể gửi mừng cưới cho <strong>{side === "bride" ? "cô dâu" : "chú rể"}</strong> qua QR code dưới đây:
          </motion.p>

          {/* QR Code container */}
          <motion.div
            className="mt-6 w-40 h-40 mx-auto border rounded-lg overflow-hidden shadow-lg flex items-center justify-center cursor-pointer"
            onClick={() => {
              if (!showQR) {
                setShowQR(true); // first click shows the QR
              } else {
                setSelectedPhoto(qrCodeUrl); // next click opens modal
              }
            }}
            variants={cardVariants}
          >
            {showQR ? (
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-sm text-[#c23636]">Click to show QR</span>
            )}
          </motion.div>
          {/* Modal for selectedPhoto */}
          {selectedPhoto && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 cursor-pointer"
              onClick={() => setSelectedPhoto(null)}
            >
              <img
                src={selectedPhoto}
                className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
