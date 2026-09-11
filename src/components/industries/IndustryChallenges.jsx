"use client";

import React from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

/**
 * Universal Image Extractor
 */
function getChallengeImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;

  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source)
        .width(1000)
        .height(800)
        .fit("crop")
        .auto("format")
        .url();
    } catch (e) {
      console.warn("Challenge image error:", e);
    }
  }

  if (source.image) return getChallengeImageUrl(source.image);

  return null;
}

export default function IndustryChallenges({ items = [], challengeImage, section = {} }) {
  if (!items.length) return null;

  // Resolve Common/Section-level image
  const commonImgSrc = 
    getChallengeImageUrl(challengeImage) || 
    getChallengeImageUrl(section.challengeImage) || 
    getChallengeImageUrl(section.image) || 
    null;

  return (
    <section className="relative bg-[#121110] px-6 py-28 text-[#F5F2EC] md:py-36">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Sticky Header + Common Section Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
                The Reality
              </p>
              <h2 className="mt-4 font-display text-4xl tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.08]">
                What makes this industry different?
              </h2>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-white/60">
                Scroll down to inspect the structural challenges and friction points as they stack up.
              </p>
            </div>

            {/* Common Image Box in Left Column */}
            {commonImgSrc && (
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1A1816] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={commonImgSrc}
                    alt="Industry Challenges Overview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Vertical Stacking Cards */}
          <div className="lg:col-span-7 relative space-y-8">
            {items.map((item, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");
              const stickyTop = 120 + index * 24;

              // Support both string items and object items with text/description & image
              const itemText = typeof item === "string" ? item : (item.text || item.description || item.title);
              const itemImgSrc = typeof item === "object" ? getChallengeImageUrl(item.image || item.imageUrl) : null;

              return (
                <div
                  key={item._key || index}
                  style={{ top: `${stickyTop}px` }}
                  className="sticky rounded-[2.5rem] border border-white/10 bg-[#1A1816]/95 p-8 md:p-12 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.25em] text-[#C9A227] font-bold">
                      // CHALLENGE {formattedIndex}
                    </span>
                    <div className="h-2 w-2 rounded-full bg-[#C9A227]" />
                  </div>

                  <p className="my-6 text-lg md:text-xl leading-relaxed text-white/90">
                    {itemText}
                  </p>

                  {/* Optional Individual Challenge Image */}
                  {itemImgSrc && (
                    <div className="relative my-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#121110]">
                      <Image
                        src={itemImgSrc}
                        alt={`Challenge ${formattedIndex} visual`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/40">
                    <span>Operational Friction</span>
                    <span className="text-[#C9A227] font-semibold">Tendrils Stack</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}