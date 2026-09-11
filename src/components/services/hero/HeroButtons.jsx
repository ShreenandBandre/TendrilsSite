"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HeroButtons({ hero, dark = false }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">

      {/* Primary */}

      <Link
        href={hero?.primaryCta?.href || "/contact"}
        className="
          group
          inline-flex
          items-center
          gap-3
          rounded-full
          bg-[#C9A227]
          px-6
          py-3.5
          text-sm
          font-semibold
          text-[#111111]
          shadow-[0_12px_30px_rgba(201,162,39,0.18)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#DDBA45]
          hover:shadow-[0_16px_35px_rgba(201,162,39,0.25)]
        "
      >
        {hero?.primaryCta?.label || "Start a Project"}

        <span
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-[#111111]/10
            transition-transform
            duration-300
            group-hover:rotate-45
          "
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>

      {/* Secondary */}

      <Link
        href={hero?.secondaryCta?.href || "/case-studies"}
        className={`
          inline-flex
          items-center
          rounded-full
          border
          px-6
          py-3.5
          text-sm
          font-semibold
          transition-all
          duration-300
          ${
            dark
              ? `
                border-white/15
                text-white
                hover:border-[#C9A227]/60
                hover:text-[#C9A227]
              `
              : `
                border-[#111111]/10
                bg-white/20
                text-[#111111]
                hover:-translate-y-0.5
                hover:border-[#C9A227]/50
                hover:bg-white/40
                hover:text-[#9A7625]
              `
          }
        `}
      >
        {hero?.secondaryCta?.label || "Explore Our Work"}
      </Link>

    </div>
  );
}