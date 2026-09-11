"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function StatsSection({ stats = [] }) {
  if (!stats.length) return null;

  return (
    <section className="relative overflow-hidden border-y border-[#111111]/10 bg-[#F3EBDD] px-6 py-16 md:py-20">
      
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(17,17,17,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(17,17,17,0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* =====================================================
          SOFT GOLD GLOW
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[350px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C9A227]/[0.07]
          blur-[100px]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A7625]">
              Tendrils / Track Record
            </p>
            <h2 className="mt-3 max-w-lg font-display text-2xl leading-tight tracking-tight text-[#111111] md:text-3xl">
              Engineered for commerce that
              <span className="text-[#C9A227]"> moves.</span>
            </h2>
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111]/35">
              Selected metrics
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/10 bg-white/40">
              <ArrowUpRight className="h-3.5 w-3.5 text-[#9A7625]" />
            </span>
          </div>
        </div>

        {/* ===================================================
            STAT GRID (Optimized for Odd / Even counts)
        =================================================== */}
        <div
          className={`
            grid border-t border-[#111111]/10
            ${
              stats.length === 1
                ? "grid-cols-1"
                : stats.length === 2
                  ? "grid-cols-2"
                  : stats.length === 3
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-2 lg:grid-cols-4"
            }
          `}
        >
          {stats.slice(0, 4).map((stat, index) => {
            const isLastInRow = (index + 1) % (stats.length === 3 ? 3 : stats.length === 2 ? 2 : 4) === 0;

            return (
              <motion.article
                key={stat._key || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3 }}
                className={`
                  group
                  relative
                  px-5
                  py-7
                  md:px-7
                  md:py-8
                  border-b border-[#111111]/10
                  ${
                    index !== 0
                      ? "sm:border-l sm:border-[#111111]/10"
                      : ""
                  }
                `}
              >
                {/* Top Index & Dot */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#111111]/25">
                    0{index + 1}
                  </span>
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#C9A227]/40
                      transition-all
                      duration-500
                      group-hover:scale-150
                      group-hover:bg-[#C9A227]
                    "
                  />
                </div>

                {stat?.image?.assetUrl && <img src={stat.image.assetUrl} alt={stat.label || "Metric"} className="mt-5 h-24 w-full rounded-xl object-cover border border-[#111111]/10" />}

                {/* Number (Scaled down cleanly for better proportions) */}
                <motion.p
                  className="
                    mt-6
                    font-display
                    text-4xl
                    leading-none
                    tracking-tight
                    text-[#C9A227]
                    transition-transform
                    duration-500
                    group-hover:translate-x-1
                    md:text-5xl
                  "
                >
                  {stat.value}
                </motion.p>

                {/* Label */}
                <p
                  className="
                    mt-3
                    max-w-[180px]
                    text-[10px]
                    font-bold
                    uppercase
                    leading-4
                    tracking-[0.2em]
                    text-[#111111]/50
                  "
                >
                  {stat.label}
                </p>

                {/* Bottom line accent */}
                <div className="mt-6 flex items-center gap-2.5">
                  <span
                    className="
                      h-px
                      w-5
                      bg-[#C9A227]/40
                      transition-all
                      duration-500
                      group-hover:w-10
                      group-hover:bg-[#C9A227]
                    "
                  />
                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#111111]/25 transition-colors group-hover:text-[#9A7625]">
                    Metric
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Brand Line */}
        <div className="mt-10 flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9A7625]">
            Commerce / Engineering / Growth
          </p>
          <p className="max-w-md text-[11px] leading-4 text-[#111111]/40 md:text-right">
            Metrics reflecting the infrastructure and systems built for scale.
          </p>
        </div>

      </div>
    </section>
  );
}