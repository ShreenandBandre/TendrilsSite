"use client";

import { motion } from "framer-motion";
import ActionLink from "@/components/content/ActionLink";

export default function TimelineCard({
  step,
  number,
  index,
}) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group relative w-full max-w-[470px] overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-white/[0.035] p-7 transition-all duration-500 hover:border-[#C9A227]/30 hover:bg-white/[0.055] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-8"
    >
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#C9A227] transition-all duration-700 group-hover:w-full" />

      <span className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#C9A227]/0 blur-3xl transition-all duration-700 group-hover:bg-[#C9A227]/[0.06]" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-display text-5xl leading-none text-white/[0.08] group-hover:text-[#C9A227]/25">
            {number}
          </span>

          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227]/60">
            Phase {number}
          </span>
        </div>

        {step.image?.assetUrl && <img src={step.image.assetUrl} alt={step.title || ""} className="mb-5 h-40 w-full rounded-2xl object-cover" />}
        <h3 className="mt-10 font-display text-2xl leading-tight tracking-tight text-[#F7F2E8] transition-colors group-hover:text-[#C9A227] md:text-3xl">
          {step.title}
        </h3>

        {step.description && (
          <p className="mt-4 max-w-md text-sm leading-7 text-white/45 group-hover:text-white/60">
            {step.description}
          </p>
        )}

        <ActionLink cta={step.cta} className="mt-7 !bg-[#C9A227] !px-4 !py-2" />
        <div className="mt-7 flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A227]/35 group-hover:w-14 group-hover:bg-[#C9A227]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 group-hover:text-[#C9A227]/70">
            {index === 0
              ? "Start"
              : index === 1
                ? "Build"
                : index === 2
                  ? "Connect"
                  : "Scale"}
          </span>
        </div>
      </div>
    </motion.article>
  );
}