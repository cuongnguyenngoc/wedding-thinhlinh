"use client";

export const cardVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};