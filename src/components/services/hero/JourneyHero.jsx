"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Compass, Milestone, ShieldCheck } from "lucide-react";
import HeroButtons from "./HeroButtons";
import { urlFor } from "@/lib/sanity/image";

/**
 * Universal Image Extractor
 */
function getJourneyImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;

  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source)
        .width(1600)
        .height(1000)
        .fit("crop")
        .auto("format")
        .url();
    } catch (e) {
      console.warn("Journey hero image error:", e);
    }
  }

  if (source.image) return getJourneyImageUrl(source.image);
  if (source.heroImage) return getJourneyImageUrl(source.heroImage);

  return null;
}

/**
 * Journey-Specific Honeycomb Mesh + Multicolor Soft Pastel Aura
 */
function JourneyHoneycombBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Multicolor Soft Pastel Gradients (Lavender, Peach, Amber, Mint) */}
      <div className="absolute -top-40 -left-40 h-[650px] w-[650px] rounded-full bg-purple-200/45 blur-[130px]" />
      <div className="absolute top-1/3 -right-45 h-[700px] w-[700px] rounded-full bg-amber-200/45 blur-[140px]" />
      <div className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full bg-emerald-200/30 blur-[130px]" />

      {/* Honeycomb Mesh Pattern */}
      <div className="absolute inset-0 opacity-[0.32]">
        <svg
          className="h-full w-full stroke-[#C9A227]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="journey-honeycomb-pattern"
              width="56"
              height="96"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z 
                   M28 48 L56 64 L56 96 L28 112 L0 96 L0 64 Z"
                fill="none"
                strokeWidth="1.2"
              />
              <circle cx="28" cy="16" r="2" className="fill-[#C9A227]/60" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#journey-honeycomb-pattern)" />
        </svg>
      </div>

      {/* Radial fade for readability */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FAF7F2]/60 to-[#FAF7F2]" />
    </div>
  );
}

export default function JourneyHero({ service }) {
  const hero = service?.hero || {};

  // Resolve Image safely from Sanity
  const imageUrl =
    getJourneyImageUrl(hero.image) ||
    getJourneyImageUrl(hero.imageUrl) ||
    getJourneyImageUrl(service?.heroImage) ||
    getJourneyImageUrl(service?.image) ||
    getJourneyImageUrl(service?.imageUrl) ||
    null;

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-28 md:py-36 text-[#111111]">
      {/* Honeycomb + Pastel Background */}
      <JourneyHoneycombBackground />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-white/70 px-4.5 py-1.5 shadow-sm backdrop-blur-md">
            <Compass className="h-4 w-4 text-[#C9A227]" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
              {hero.eyebrow || service.category || "Long-Term Partnership"}
            </p>
          </div>

          {/* Headline */}
          <h1 className="mx-auto mt-6 max-w-5xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-[5.8rem] text-[#111111]">
            {hero.headline || service.name}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#111111]/75 md:text-lg">
            {hero.description ||
              service.description ||
              service.shortDescription}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex justify-center">
            <HeroButtons hero={hero} />
          </div>
        </div>

        {/* ================= CINEMATIC JOURNEY IMAGE ================= */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-20 max-w-5xl"
          >
            {/* Ambient Gold Aura behind frame */}
            <div className="absolute -inset-2.5 rounded-[3.2rem] bg-gradient-to-tr from-[#C9A227]/30 via-amber-200/40 to-purple-200/30 blur-2xl opacity-80" />

            {/* Glass Frame */}
            <div className="relative overflow-hidden rounded-[3rem] border border-[#C9A227]/40 bg-white/80 p-3 shadow-2xl backdrop-blur-xl">
              <div className="relative h-[340px] w-full overflow-hidden rounded-[2.5rem] bg-[#FAF7F2] md:h-[500px]">
                <Image
                  src={imageUrl}
                  alt={hero.imageAlt || service.name || "Partnership journey"}
                  fill
                  priority
                  unoptimized={imageUrl.endsWith(".svg")}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1200px) 100vw, 1000px"
                />

                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Corner Partnership Tag */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-white/40 bg-black/50 px-4 py-1.5 backdrop-blur-md text-xs font-semibold tracking-wider text-white uppercase">
                  <ShieldCheck className="h-4 w-4 text-[#C9A227]" />
                  <span>Strategic Roadmap</span>
                </div>
              </div>
            </div>

            {/* ================= INTERACTIVE MILESTONE LINE ================= */}
            <div className="absolute -bottom-9 left-1/2 hidden w-[75%] -translate-x-1/2 items-center md:flex">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/50 to-[#C9A227]" />

              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/50 bg-[#FAF7F2] shadow-md shadow-[#C9A227]/20">
                <div className="h-3 w-3 rounded-full bg-[#C9A227] animate-pulse" />
              </div>

              <div className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#C9A227]/50 to-transparent" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}