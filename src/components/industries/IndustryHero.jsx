"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";

/**
 * Universal Image Extractor for Industry Hero
 */
function getIndustryImageUrl(source) {
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
      console.warn("Industry hero image error:", e);
    }
  }

  if (source.image) return getIndustryImageUrl(source.image);
  if (source.heroImage) return getIndustryImageUrl(source.heroImage);

  return null;
}

/**
 * Prominent Dotted Grid Background + Soft Pastel Aura
 */
function IndustryDottedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Multicolor Soft Pastel Gradients */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-200/40 blur-[130px]" />
      <div className="absolute top-1/3 -right-45 h-[650px] w-[650px] rounded-full bg-amber-200/40 blur-[140px]" />
      <div className="absolute -bottom-40 left-1/3 h-[550px] w-[550px] rounded-full bg-emerald-200/30 blur-[120px]" />

      {/* Prominent Dotted Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(201,162,39,0.7) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft Background Card Outlines (Engineering aesthetic) */}
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 gap-8 p-8 opacity-[0.06]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-[#C9A227] h-64 bg-white/20" />
        ))}
      </div>
    </div>
  );
}

export default function IndustryHero({ industry = {} }) {
  const hero = industry.hero || {};

  const imageUrl =
    getIndustryImageUrl(hero.image) ||
    getIndustryImageUrl(hero.imageUrl) ||
    getIndustryImageUrl(industry?.heroImage) ||
    getIndustryImageUrl(industry?.image) ||
    getIndustryImageUrl(industry?.imageUrl) ||
    null;

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-24 md:py-32 text-[#111111]">
      {/* Prominent Dotted Grid Background */}
      <IndustryDottedBackground />

      {/* Content Container */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        
        {/* LEFT: Image Container */}
        {imageUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute -inset-2 rounded-[3rem] bg-gradient-to-tr from-[#C9A227]/30 via-amber-200/35 to-transparent blur-2xl opacity-80" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#C9A227]/40 bg-white/85 p-3 shadow-[0_25px_60px_rgba(17,17,17,0.08)] backdrop-blur-xl w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#FAF7F2]">
                <Image
                  src={imageUrl}
                  alt={hero.headline || industry.title || "Industry visual"}
                  fill
                  priority
                  unoptimized={imageUrl.endsWith(".svg")}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Corner Industry Tag */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/40 bg-black/60 px-4 py-1.5 backdrop-blur-md text-xs font-semibold tracking-wider text-white uppercase shadow-lg">
                  <ShieldCheck className="h-4 w-4 text-[#C9A227]" />
                  <span>Industry Leader</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="hidden lg:block" />
        )}

        {/* RIGHT: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col items-start text-left"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
            {hero.eyebrow || industry.category || "Industry Solution"}
          </p>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-[#111111] md:text-6xl lg:text-7xl">
            {hero.headline || industry.title}
            {hero.highlight && (
              <>
                {" "}
                <span className="text-[#C9A227]">
                  {hero.highlight}
                </span>
              </>
            )}
          </h1>

          {(hero.description || industry.shortDescription) && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#111111]/70 md:text-lg">
              {hero.description || industry.shortDescription}
            </p>
          )}

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            {hero.primaryCta?.href ? (
              <Link
                href={hero.primaryCta.href}
                className="rounded-full bg-[#C9A227] px-8 py-3.5 text-sm font-semibold text-[#111111] transition-all hover:opacity-90 hover:shadow-lg shadow-[0_10px_30px_rgba(201,162,39,0.25)]"
              >
                {hero.primaryCta.label || "Start a Conversation"}
              </Link>
            ) : (
              <Link
                href="/contact"
                className="rounded-full bg-[#C9A227] px-8 py-3.5 text-sm font-semibold text-[#111111] transition-all hover:opacity-90 hover:shadow-lg shadow-[0_10px_30px_rgba(201,162,39,0.25)]"
              >
                Start a Conversation
              </Link>
            )}

            {hero.secondaryCta?.href ? (
              <Link
                href={hero.secondaryCta.href}
                className="text-sm font-semibold text-[#111111] underline decoration-[#C9A227]/50 underline-offset-8 transition-colors hover:text-[#9A7625]"
              >
                {hero.secondaryCta.label || "Explore"}
              </Link>
            ) : (
              <Link
                href="/case-studies"
                className="text-sm font-semibold text-[#111111] underline decoration-[#C9A227]/50 underline-offset-8 transition-colors hover:text-[#9A7625]"
              >
                Explore
              </Link>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}