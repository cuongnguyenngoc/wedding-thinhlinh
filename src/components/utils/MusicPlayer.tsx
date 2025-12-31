"use client";

import { useEffect, useRef, useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicPlayer({ loop = true, volume = 0.5 }: { loop?: boolean; volume?: number }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false); // start unmuted

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = loop;
    audio.volume = volume;
    audio.muted = muted;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.warn("Autoplay blocked by browser, starting muted...");
        audio.muted = true; // fallback to muted if autoplay fails
        await audio.play().catch(() => console.warn("Still blocked"));
        setMuted(true);
      }
    };

    playAudio();
  }, [loop, volume]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMute}
        className="
          w-14 h-14 flex items-center justify-center
          rounded-full shadow-lg
          bg-gradient-to-br from-pink-200 to-rose-300
          text-white text-2xl
          hover:scale-110 hover:shadow-xl
          transition-all duration-300
        "
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <audio ref={audioRef} src="/music/wedding.mov" />
    </div>
  );
}
