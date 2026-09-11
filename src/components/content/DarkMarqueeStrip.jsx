"use client";

import { motion } from "framer-motion";

const fallbackPartners = [
  { name: "Shopify Plus" }, { name: "Klaviyo" }, { name: "NetSuite" },
  { name: "Recharge" }, { name: "Gorgias" }, { name: "Bynder" },
  { name: "Yotpo" }, { name: "Algolia" },
];

export default function DarkMarqueeStrip({ label = "We work with", partners }) {
  const list = partners?.length > 0 ? partners : fallbackPartners;
  const track = [...list, ...list];

  return (
    <div className="relative z-10 mx-auto mt-20 w-full max-w-3xl select-none md:mt-28">
      <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 md:text-xs">
        {label}
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-10 md:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {track.map((partner, idx) => (
            <div key={`${partner?.name || "partner"}-${idx}`} className="flex shrink-0 items-center justify-center">
              {partner?.imageUrl ? (
                <img
                  src={partner.imageUrl}
                  alt={partner.name || "Partner"}
                  className="h-6 w-auto max-w-[110px] object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0 md:h-7"
                />
              ) : (
                <span className="whitespace-nowrap font-display text-sm font-medium tracking-wide text-white/50 transition-colors duration-300 hover:text-[#C9A227] md:text-base">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/30 md:mt-10">
        Scroll to explore ↓
      </p>
    </div>
  );
}