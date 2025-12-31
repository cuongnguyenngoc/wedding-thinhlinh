"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OverlayPanelProps {
  onOpen?: () => void; // callback when user opens the cover
}

export default function OverlayPanel({ onOpen }: OverlayPanelProps) {
  const [coverOpened, setCoverOpened] = useState(false);
  const [openedOnce, setOpenedOnce] = useState(false);

  // Disable scrolling initially
  useEffect(() => {
    const wrapper = document.getElementById("page-wrapper");
    if (wrapper) wrapper.style.overflow = "hidden";

    return () => {
      if (wrapper) wrapper.style.overflow = "";
    };
  }, []);

  const handleOpen = () => {
    if (!openedOnce) {
      setCoverOpened(true);
      setOpenedOnce(true);

      const wrapper = document.getElementById("page-wrapper");
      if (wrapper) wrapper.style.overflow = "auto"; // re-enable scroll

      if (onOpen) onOpen();
    }
  };

  return (
    <>
      {/* LEFT PANEL + 囍 wrapper */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: coverOpened ? "-100vw" : 0 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="absolute inset-y-0 left-0 w-1/2 z-30 cursor-pointer"
        onClick={handleOpen}
      >
        <div className="absolute inset-0 bg-[#b12222] z-20" />
        <motion.div
          className="
            absolute right-0 top-1/2
            -translate-y-1/2 translate-x-1/2
            text-[#ffd6a8] font-bold opacity-90 leading-none
            z-30
            bg-[#8e1c1c]
            w-32 h-32
            flex items-center justify-center
            text-7xl
          "
          animate={{ y: [0, -10, 0] }} // subtle bounce
          transition={{ repeat: Infinity, repeatType: "loop", duration: 1.2, ease: "easeInOut" }}
        >
          囍
          {/* Unified instruction text under 囍 */}
          {!openedOnce && (
            <motion.div
              className="absolute top-full mt-3 w-max text-center text-sm text-white font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
            >
              🌸 Chạm để mở thiệp
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: coverOpened ? "100%" : 0 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#b12222] z-20 cursor-pointer"
        onClick={handleOpen}
      />
    </>
  );
}
