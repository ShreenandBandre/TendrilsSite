"use client";

import { motion } from "framer-motion";

const fallbackPartners = [
  { name: "Shopify Plus" },
  { name: "Klaviyo" },
  { name: "NetSuite" },
  { name: "Recharge" },
  { name: "Gorgias" },
  { name: "Bynder" },
  { name: "Yotpo" },
  { name: "Algolia" },
];

export default function PartnersMarquee({ data }) {
  const label = data?.label || "We work with";
  const partners = data?.partners?.length > 0 ? data.partners : fallbackPartners;

  // Duplicate the row so the loop is seamless.
  const track = [...partners, ...partners];

  return (
    <div className="relative z-10 mt-10 w-full max-w-3xl pointer-events-none select-none md:mt-14">
      <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-ink/50 md:text-xs">
        {label}
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-10 md:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {track.map((partner, idx) => {
            const content = partner?.imageUrl ? (
              <img
                src={partner.imageUrl}
                alt={partner.name || "Partner"}
                className="h-6 w-auto max-w-[110px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-7"
              />
            ) : (
              <span className="whitespace-nowrap font-display text-sm font-medium tracking-wide text-ink/60 transition-colors duration-300 hover:text-gold md:text-base">
                {partner.name}
              </span>
            );

            return (
              <div
                key={`${partner?.name || "partner"}-${idx}`}
                className="pointer-events-auto flex shrink-0 items-center justify-center"
              >
                {partner?.url ? (
                  <a href={partner.url} target="_blank" rel="noreferrer">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
