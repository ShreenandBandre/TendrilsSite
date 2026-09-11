"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TimelineCard from "./TimelineCard";
import { urlFor } from "@/lib/sanity/image";

/**
 * Resolve timeline image from Sanity or direct URL.
 */
function getStepImageUrl(step) {
  if (!step) return null;

  const target = step.image || step.heroImage || step.photo;

  if (!target && step.imageUrl) return step.imageUrl;
  if (!target && step.assetUrl) return step.assetUrl;
  if (!target) return null;

  if (typeof target === "string" && target.startsWith("http")) {
    return target;
  }

  if (target.assetUrl) return target.assetUrl;
  if (target.asset?.url) return target.asset.url;
  if (target.url) return target.url;

  if (target.asset?._ref || target._ref) {
    try {
      return urlFor(target)
        .width(1200)
        .height(800)
        .fit("crop")
        .auto("format")
        .url();
    } catch (error) {
      console.warn("Timeline image resolution error:", error);
    }
  }

  return null;
}

/**
 * Opposite-side image.
 *
 * IMPORTANT:
 * This image is OUTSIDE the TimelineCard.
 * The card itself remains text-only.
 */
function TimelineOppositeVisual({ step, isLeft }) {
  const imgSrc = getStepImageUrl(step);

  if (!imgSrc) {
    return <div className="hidden md:block" />;
  }

  return (
    <div
      className={`hidden w-full items-center md:flex ${
        isLeft ? "justify-start pl-4" : "justify-end pr-4"
      }`}
    >
      <div className="group relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#C9A227]/30 bg-[#1A1816]/80 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[#C9A227]/60 hover:shadow-[0_20px_50px_rgba(201,162,39,0.15)]">
        
        {/* Ambient Gold Glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-[#C9A227]/20 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.4rem] bg-[#111111]">
          <img
            src={imgSrc}
            alt={step.title || "Step visual"}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default function TimelineSection({ section }) {
  const steps = section.steps || [];

  if (!steps.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#111111] px-6 py-24 text-[#F7F2E8] md:py-32">
      
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#C9A227]/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#C9A227]/[0.025] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Heading */}
        <SectionHeading
          heading={section.heading}
          description={section.description}
          dark
        />

        <div className="relative mt-20 md:mt-24">

          {/* Center Vertical Track Line */}
          <div className="pointer-events-none absolute bottom-0 left-[23px] top-0 w-px bg-gradient-to-b from-transparent via-[#C9A227]/35 to-transparent md:left-1/2 md:-translate-x-1/2" />

          {/* Animated Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute bottom-0 left-[23px] top-0 w-px origin-top bg-gradient-to-b from-[#C9A227] via-[#C9A227]/50 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          {/* Timeline Items */}
          <div className="space-y-14 md:space-y-20">

            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              const number =
                step.number || String(index + 1).padStart(2, "0");

              const mobileImgSrc = getStepImageUrl(step);

              return (
                <motion.div
                  key={step._key || index}
                  initial={{
                    opacity: 0,
                    y: 35,
                    x: isLeft ? -20 : 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: Math.min(index * 0.08, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid grid-cols-[48px_1fr] items-center gap-5 md:grid-cols-2 md:gap-20"
                >

                  {/* Mobile Number */}
                  <div className="absolute left-0 top-0 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#111111] font-display text-sm text-[#C9A227] shadow-[0_0_0_6px_rgba(201,162,39,0.05)] md:hidden">
                    {number}
                  </div>

                  {/* =========================================
                      DESKTOP LEFT SIDE
                      Card OR Opposite Image
                     ========================================= */}

                  {isLeft ? (
                    <div className="hidden md:flex md:justify-end">
                      <TimelineCard
                        step={step}
                        number={number}
                        index={index}
                      />
                    </div>
                  ) : (
                    <TimelineOppositeVisual
                      step={step}
                      isLeft={false}
                    />
                  )}

                  {/* Center Gold Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + index * 0.06,
                    }}
                    className="absolute left-1/2 top-1/2 z-30 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#111111] bg-[#C9A227] shadow-[0_0_0_5px_rgba(201,162,39,0.12)] md:block"
                  />

                  {/* Horizontal Connector */}
                  <div
                    className={`pointer-events-none absolute top-1/2 hidden h-px w-20 bg-gradient-to-r from-[#C9A227]/5 to-[#C9A227]/35 md:block ${
                      isLeft
                        ? "right-1/2 mr-2"
                        : "left-1/2 ml-2"
                    }`}
                  />

                  {/* =========================================
                      MOBILE
                      Card + Image below it
                     ========================================= */}

                  <div className="min-w-0 pl-0 md:hidden">
                    <TimelineCard
                      step={step}
                      number={number}
                      index={index}
                    />

                    {mobileImgSrc && (
                      <div className="mt-4 overflow-hidden rounded-2xl border border-[#C9A227]/20 bg-[#1A1816] p-2">
                        <img
                          src={mobileImgSrc}
                          alt={step.title || ""}
                          className="aspect-[16/10] w-full rounded-xl object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* =========================================
                      DESKTOP RIGHT SIDE
                      Image OR Card
                     ========================================= */}

                  {isLeft ? (
                    <TimelineOppositeVisual
                      step={step}
                      isLeft={true}
                    />
                  ) : (
                    <div className="hidden md:block">
                      <TimelineCard
                        step={step}
                        number={number}
                        index={index}
                      />
                    </div>
                  )}

                </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}