"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, TrendingUp } from "lucide-react";
import HeroButtons from "./HeroButtons";
import { urlFor } from "@/lib/sanity/image";

/**
 * Universal Image Extractor:
 * Sanity ke kisi bhi structure (_ref, assetUrl, asset.url, heroImage, etc.) se URL nikaalta hai
 */
function getHeroImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;

  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source)
        .width(1400)
        .height(1400)
        .fit("crop")
        .auto("format")
        .url();
    } catch (e) {
      console.warn("Growth hero image error:", e);
    }
  }

  if (source.image) return getHeroImageUrl(source.image);
  if (source.heroImage) return getHeroImageUrl(source.heroImage);

  return null;
}

/**
 * New Theme: Concentric Dual-Hex Honeycomb + Multicolor Pastel Aura
 */
function GrowthHoneycombBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Multicolor Pastel Gradient Aura (Lavender, Peach, Amber, Mint) */}
      <div className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-purple-200/50 blur-[130px]" />
      <div className="absolute top-1/4 -right-40 h-[650px] w-[650px] rounded-full bg-amber-200/50 blur-[140px]" />
      <div className="absolute -bottom-36 left-1/4 h-[550px] w-[550px] rounded-full bg-emerald-200/35 blur-[130px]" />
      <div className="absolute top-2/3 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-200/35 blur-[120px]" />

      {/* New Concentric Hexagon Grid */}
      <div className="absolute inset-0 opacity-[0.38]">
        <svg
          className="h-full w-full stroke-[#C9A227]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="growth-honeycomb-pattern"
              width="72"
              height="124"
              patternUnits="userSpaceOnUse"
            >
              {/* Outer Hexagon */}
              <path
                d="M36 0 L72 20.78 L72 62.35 L36 83.14 L0 62.35 L0 20.78 Z
                   M36 83.14 L72 103.92 L72 145.49 L36 166.28 L0 145.49 L0 103.92 Z"
                fill="none"
                strokeWidth="1.4"
              />
              {/* Inner Nested Growth Core */}
              <path
                d="M36 14 L58 26.7 L58 52.1 L36 64.8 L14 52.1 L14 26.7 Z"
                fill="none"
                strokeWidth="0.9"
                strokeDasharray="3 3"
                className="stroke-[#9A7625]/60"
              />
              {/* Center Vector Dot */}
              <circle cx="36" cy="40" r="2.2" className="fill-[#C9A227]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#growth-honeycomb-pattern)" />
        </svg>
      </div>

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-[#FAF7F2]/70" />
    </div>
  );
}

export default function GrowthHero({ service }) {
  const hero = service?.hero || {};

  // Resolve Image safely from Sanity
  const imgSrc =
    getHeroImageUrl(hero.image) ||
    getHeroImageUrl(hero.imageUrl) ||
    getHeroImageUrl(service?.image) ||
    getHeroImageUrl(service?.heroImage) ||
    getHeroImageUrl(service?.imageUrl) ||
    null;

  const hasImage = Boolean(imgSrc);

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-28 md:py-36 text-[#111111]">
      {/* Multicolor Pastel + New Honeycomb Background */}
      <GrowthHoneycombBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            hasImage
              ? "lg:grid-cols-[1.1fr_0.9fr]"
              : "max-w-4xl mx-auto text-center"
          }`}
        >
          {/* =========================================================
              LEFT COLUMN: Eyebrow, Heading, Description, CTA
          ========================================================= */}
          <div
            className={`flex flex-col ${
              hasImage
                ? "items-start text-left"
                : "items-center text-center"
            }`}
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <TrendingUp className="h-4 w-4 text-[#C9A227]" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
                {hero.eyebrow || service.category || "Growth Architecture"}
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-8xl text-[#111111]">
              {hero.headline || service.name}
            </h1>

            {/* Editorial Description */}
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#111111]/70 md:text-lg">
              {hero.description ||
                service.description ||
                service.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex w-full justify-start">
              <HeroButtons hero={hero} />
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Hero Image Showcase from Sanity
          ========================================================= */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center w-full"
            >
              <div className="group relative w-full max-w-lg lg:max-w-none">
                {/* Ambient Aura Behind Image */}
                <div className="absolute -inset-3 rounded-[3rem] bg-gradient-to-tr from-[#C9A227]/30 via-amber-200/40 to-purple-200/35 blur-2xl opacity-75 transition duration-500 group-hover:opacity-100" />

                {/* Outer Glass Container */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-[#C9A227]/40 bg-white/80 p-3.5 shadow-2xl backdrop-blur-xl">
                  <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[1.9rem] bg-[#FAF7F2]">
                    <Image
                      src={imgSrc}
                      alt={hero.headline || service.name || "Growth visual"}
                      fill
                      priority
                      unoptimized={imgSrc.endsWith(".svg")}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />

                    {/* Corner Scale Tag */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/60 bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                      <Sparkles className="h-3 w-3 text-[#C9A227]" />
                      <span>Growth Platform</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}