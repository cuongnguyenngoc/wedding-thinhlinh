"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function RSVPForm({ guestId, guestName, guestLine }: { guestId: string | null; guestName: string; guestLine: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    if (guestId) {
      formData.set("guestId", guestId);
    }

    // If guestName exists → override user input
    // If guestName doesn't exist → use the typed value
    if (guestName && guestName !== guestLine) {
      formData.set("name", guestName);
    }

    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/submit-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("🎉 Cảm ơn bạn! Rất hân hạnh được đón tiếp 💐", {
          duration: 5000,
        });
        form.reset();
      } else {
        toast.error("❌ Gửi không thành công, vui lòng thử lại!", {
          duration: 4000,
        });
      }
    } catch (err) {
      toast.error("⚠️ Có lỗi xảy ra khi gửi.", {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const shouldAskName = !guestName || guestName === guestLine;

  return (
    <motion.form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">

      {/* Ask name only if guestName is missing */}
      {shouldAskName && (
        <motion.input
          type="text"
          name="name"
          required
          placeholder="Tên của bạn"
          className="w-full p-3 rounded-lg border border-[#e5bdbd] focus:ring-2 
                     focus:ring-[#b33] outline-none text-[#c23636]"
        />
      )}

      <motion.textarea
        name="message"
        rows={3}
        placeholder="Gửi lời chúc đến Dâu Rể 💕"
        className="w-full p-3 rounded-lg border border-[#e5bdbd] focus:ring-2 
                   focus:ring-[#b33] outline-none text-[#c23636]"
      />

      <motion.select
        name="attending"
        required
        className="w-full p-3 rounded-lg border border-[#e5bdbd] focus:ring-2 
                   focus:ring-[#b33] outline-none text-[#c23636]"
      >
        <option value="">Bạn có tham dự không?</option>
        <option value="Có">Có</option>
        <option value="Không">Không</option>
        <option value="Chưa chắc">Chưa chắc</option>
      </motion.select>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 px-6 py-3 rounded-full bg-[#b33] text-white font-semibold 
                   hover:scale-[1.03] transition-transform shadow-md 
                   disabled:opacity-60 disabled:cursor-not-allowed"
        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
      >
        {isSubmitting ? "Đang gửi..." : "GỬI NGAY"}
      </motion.button>
    </motion.form>
  );
}
