"use client";

import { motion } from "framer-motion";
import {
  Database,
  TrendingUp,
  Network,
  Target,
} from "lucide-react";

/* =========================================================
   DEFAULT CONTENT
   ---------------------------------------------------------
   This content is used when Sanity does not provide data.
   If Sanity provides the content, the same design is used.
========================================================= */

const defaultData = {
  title: "Why Choose Tendrils?",

  subtitle:
    "We combine strategy, technology, and execution to create commerce systems built for long-term growth.",

  features: [
    {
      title: "Commerce Expertise",
      description:
        "Deep expertise across Shopify, digital commerce, integrations, and enterprise technology.",
    },
    {
      title: "Built for Scale",
      description:
        "We design systems that can evolve with your business instead of becoming technical debt.",
    },
    {
      title: "Results",
      description:
        "At the end of the day, what matters most are the results we deliver. Whether your goal is to increase website traffic, generate leads, or boost sales, you can count on us to deliver the results you're looking for.",
    },
    {
      title: "Long-Term Partnership",
      description:
        "We work beyond launch with continuous optimisation, support, and strategic guidance.",
    },
  ],
};

/* =========================================================
   DEFAULT ICONS
========================================================= */

const defaultIcons = [
  Database,
  TrendingUp,
  Network,
  Target,
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhyChooseUs({ data }) {
  /*
   * Sanity data overrides the defaults.
   * The visual structure always remains the same.
   */

  const content = {
    ...defaultData,
    ...(data || {}),
  };

  const features =
    Array.isArray(content.features) && content.features.length > 0
      ? content.features.slice(0, 4)
      : defaultData.features;

  return (
    <section className="relative overflow-hidden bg-[#F7F2E8] py-28 md:py-36">

      {/* ===================================================
          BACKGROUND
      ================================================   */}

      <div className="pointer-events-none absolute inset-0">

        {/* Subtle architectural grid */}

        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(17,17,17,0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(17,17,17,0.045) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "110px 70px",
          }}
        />

        {/* Soft gold atmosphere */}

        <div className="absolute left-[8%] top-[25%] h-[360px] w-[360px] rounded-full bg-[#C9A227]/[0.07] blur-[120px]" />

        <div className="absolute right-[12%] top-[10%] h-[400px] w-[400px] rounded-full bg-[#C9A227]/[0.055] blur-[140px]" />

        <div className="absolute bottom-[10%] left-[45%] h-[300px] w-[300px] rounded-full bg-[#9A7625]/[0.04] blur-[120px]" />

      </div>

      {/* ===================================================
          CONTENT
      ================================================   */}

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mx-auto mb-20 max-w-4xl text-center">

          {/* Eyebrow */}

          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#C9A227]/35 bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#9A7625] shadow-sm backdrop-blur-md">

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A227]/10">

              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3v3" />
                <path d="M12 18v3" />
                <path d="M3 12h3" />
                <path d="M18 12h3" />
                <path d="m5.64 5.64 2.12 2.12" />
                <path d="m16.24 16.24 2.12 2.12" />
                <path d="m5.64 18.36 2.12-2.12" />
                <path d="m16.24 7.76 2.12-2.12" />
              </svg>

            </span>

            Why Choose Tendrils?

          </div>

          {/* Heading */}

          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#111111] md:text-5xl lg:text-6xl">

            {content.title || defaultData.title}

          </h2>

          {/* Gold divider */}

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-[#C9A227]/40" />

            <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A227]" />

            <span className="h-px w-10 bg-[#C9A227]/40" />

          </div>

          {/* Subtitle */}

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[#111111]/60 md:text-lg md:leading-8">

            {content.subtitle || defaultData.subtitle}

          </p>

        </div>

        {/* =================================================
            TIMELINE
        ================================================= */}

        <div className="relative mx-auto max-w-6xl">

          {/* =================================================
              DESKTOP CURVED GOLD PATH
          ================================================= */}

          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[500px] lg:block">

            <svg
              viewBox="0 0 1200 500"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >

              <defs>

                {/* Gold gradient */}

                <linearGradient
                  id="whyChooseGoldGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >

                  <stop
                    offset="0%"
                    stopColor="#E8D49A"
                  />

                  <stop
                    offset="32%"
                    stopColor="#C9A227"
                  />

                  <stop
                    offset="62%"
                    stopColor="#9A7625"
                  />

                  <stop
                    offset="100%"
                    stopColor="#C9A227"
                  />

                </linearGradient>

                {/* Soft gold glow */}

                <filter
                  id="whyChooseGoldGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >

                  <feGaussianBlur
                    stdDeviation="7"
                    result="blur"
                  />

                  <feMerge>

                    <feMergeNode in="blur" />

                    <feMergeNode in="SourceGraphic" />

                  </feMerge>

                </filter>

              </defs>

              {/* =================================================
                  SOFT GLOW PATH
              ================================================= */}

              <path
                d="
                  M 20 270
                  C 130 315,
                    220 360,
                    315 350

                  C 395 340,
                    435 205,
                    535 210

                  C 625 215,
                    655 290,
                    735 275

                  C 825 258,
                    875 110,
                    950 65

                  C 1010 30,
                    1080 35,
                    1180 35
                "
                fill="none"
                stroke="#C9A227"
                strokeWidth="13"
                strokeLinecap="round"
                opacity="0.10"
                filter="url(#whyChooseGoldGlow)"
              />

              {/* =================================================
                  MAIN GOLD PATH
              ================================================= */}

              <path
                d="
                  M 20 270
                  C 130 315,
                    220 360,
                    315 350

                  C 395 340,
                    435 205,
                    535 210

                  C 625 215,
                    655 290,
                    735 275

                  C 825 258,
                    875 110,
                    950 65

                  C 1010 30,
                    1080 35,
                    1180 35
                "
                fill="none"
                stroke="url(#whyChooseGoldGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Tiny highlight path */}

              <path
                d="
                  M 20 270
                  C 130 315,
                    220 360,
                    315 350
                "
                fill="none"
                stroke="#E8D49A"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.8"
              />

            </svg>

          </div>

          {/* =================================================
              DESKTOP STEPS
          ================================================= */}

          <div className="relative hidden min-h-[540px] lg:block">

            {/* STEP 1 */}

            <TimelineStep
              index={0}
              feature={features[0]}
              Icon={defaultIcons[0]}
              position="left-0 top-0"
            />

            {/* STEP 2 */}

            <TimelineStep
              index={1}
              feature={features[1]}
              Icon={defaultIcons[1]}
              position="left-[26%] top-[270px]"
            />

            {/* STEP 3 */}

            <TimelineStep
              index={2}
              feature={features[2]}
              Icon={defaultIcons[2]}
              position="left-[59%] top-[205px]"
            />

            {/* STEP 4 */}

            <TimelineStep
              index={3}
              feature={features[3]}
              Icon={defaultIcons[3]}
              position="right-0 top-[-20px]"
            />

          </div>

          {/* =================================================
              MOBILE / TABLET
          ================================================= */}

          <div className="relative lg:hidden">

            {/* Vertical gold line */}

            <div className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-[#E8D49A] via-[#C9A227] to-[#9A7625]" />

            <div className="space-y-10">

              {features.map((feature, index) => {

                const Icon =
                  defaultIcons[index] || Target;

                return (
                  <motion.div
                    key={`${feature?.title || "feature"}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-50px",
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.08,
                    }}
                    className="relative flex gap-6"
                  >

                    {/* =================================================
                        MOBILE NODE
                    ================================================= */}

                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#F7F2E8] shadow-[0_8px_30px_rgba(201,162,39,0.16)]">

                      <div className="absolute inset-[-6px] rounded-full border border-[#C9A227]/15" />

                      <Icon
                        className="relative z-10 h-5 w-5 text-[#C9A227]"
                        strokeWidth={1.8}
                      />

                    </div>

                    {/* =================================================
                        MOBILE CONTENT
                    ================================================= */}

                    <div className="flex-1 rounded-2xl border border-[#111111]/[0.08] bg-white/85 p-6 shadow-[0_10px_35px_rgba(20,20,20,0.06)] backdrop-blur-md transition-all duration-300 hover:border-[#C9A227]/50 hover:shadow-[0_12px_40px_rgba(201,162,39,0.12)]">
                      {feature?.image?.assetUrl && <img src={feature.image.assetUrl} alt={feature.title || ""} className="mb-5 h-36 w-full rounded-xl object-cover" />}

                      <div className="mb-2 text-xs font-bold tracking-[0.25em] text-[#9A7625]">
                        0{index + 1}
                      </div>

                      <h3 className="font-display text-xl font-semibold tracking-tight text-[#111111]">
                        {feature?.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-[#111111]/60">
                        {feature?.description}
                      </p>

                      {feature?.cta?.href && feature?.cta?.label && (
                        <a
                          href={feature.cta.href}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A7625] transition-colors hover:text-[#111111]"
                        >
                          {feature.cta.label}
                          <span aria-hidden="true">→</span>
                        </a>
                      )}

                    </div>

                  </motion.div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   DESKTOP TIMELINE STEP
========================================================= */

function TimelineStep({
  index,
  feature,
  Icon,
  position,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      className={`absolute ${position} w-[270px] group`}
    >

      {/* ===================================================
          ICON NODE
      ================================================   */}

      <motion.div
        whileHover={{
          scale: 1.1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A227]/40 bg-white shadow-[0_8px_30px_rgba(201,162,39,0.18)] transition-all duration-300 group-hover:border-[#C9A227] group-hover:shadow-[0_10px_35px_rgba(201,162,39,0.3)]"
      >

        {/* Outer ring */}

        <div className="absolute inset-[-7px] rounded-full border border-[#C9A227]/20 transition-all duration-300 group-hover:scale-105 group-hover:border-[#C9A227]/40" />

        {/* Soft glow */}

        <div className="absolute inset-[-13px] rounded-full bg-[#C9A227]/[0.045] blur-md transition-all duration-300 group-hover:bg-[#C9A227]/[0.09]" />

        {/* Icon */}

        <Icon
          className="relative z-10 h-6 w-6 text-[#C9A227]"
          strokeWidth={1.8}
        />

      </motion.div>

      {/* ===================================================
          LARGE BACKGROUND NUMBER
      ================================================   */}

      <div className="pointer-events-none absolute -right-2 -top-5 select-none font-display text-[120px] font-bold leading-none text-[#111111]/[0.06] transition-colors duration-300 group-hover:text-[#111111]/[0.09]">
        {index + 1}
      </div>

      {/* ===================================================
          CONTENT
      ================================================   */}

      <div className="relative z-10">

        {/* Step label */}

        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A7625]">
          0{index + 1}
        </div>

        {/* Title */}

        <h3 className="font-display text-xl font-semibold tracking-tight text-[#111111] transition-colors duration-300 group-hover:text-[#9A7625]">
          {feature?.title}
        </h3>

        {/* Description */}

        <p className="mt-3 max-w-[260px] text-[15px] leading-6 text-[#111111]/60">
          {feature?.description}
        </p>

        {feature?.cta?.href && feature?.cta?.label && (
          <a
            href={feature.cta.href}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A7625] transition-colors hover:text-[#111111]"
          >
            {feature.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        )}

      </div>

    </motion.div>
  );
}