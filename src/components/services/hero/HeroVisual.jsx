"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { Play } from "lucide-react";

export default function HeroVisual({ service }) {
  const hero = service?.hero || {};

  const src =
    hero.imageUrl ||
    hero.image?.assetUrl ||
    hero.image?.asset?.url ||
    (hero.image ? urlFor(hero.image).width(1200).height(1400).fit("crop").auto("format").url() : null) ||
    service?.heroImageUrl ||
    null;

  return (
    <div className="relative min-h-[420px] md:min-h-[520px] w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[540px] h-[460px] md:h-[520px] overflow-hidden shadow-[0_30px_70px_rgba(40,32,20,0.15)] border border-[#C9A227]/25"
        style={{ borderRadius: "48px 180px 48px 48px" }}
      >
        {src ? (
          <Image
            src={src}
            alt={hero.headline || service?.name || "Service Visual"}
            fill
            sizes="(max-width: 768px) 100vw, 540px"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,.18),transparent_55%)]">
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/20" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227] shadow-[0_0_40px_12px_rgba(201,162,39,.3)]" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-tr from-[#111111]/40 via-transparent to-transparent" />

        {service?.pillar && (
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="rounded-2xl border border-white/25 bg-black/30 p-4 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A227]">
                Tendrils / {service.pillar}
              </p>
              <p className="mt-1 text-sm text-white/90">
                {hero.description || service?.shortDescription || "Optimized commerce and system workflow design."}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-4 left-4 md:-left-6 z-20 flex items-center justify-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_15px_40px_rgba(40,32,20,0.2)] border border-[#C9A227]/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1BA957] text-white shadow-md">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}