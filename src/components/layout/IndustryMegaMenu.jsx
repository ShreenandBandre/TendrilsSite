"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function cleanName(name = "") {
  return String(name)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function IndustryMegaMenu({
  industries = [],
  loaded = false,
  onClose,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      transition={{
        duration: 0.22,
        ease: "easeOut",
      }}
      onMouseLeave={onClose}
      className="
        w-full
        overflow-hidden
        rounded-[28px]
        border
        border-gold/20
        bg-ivory/95
        backdrop-blur-2xl
        shadow-[0_24px_70px_rgba(0,0,0,0.18)]
      "
    >
      <div className="grid grid-cols-[225px_minmax(0,1fr)] gap-7 p-6">

        {/* =====================================================
            LEFT BRAND PANEL
        ===================================================== */}

        <div className="
          flex
          min-h-[330px]
          flex-col
          rounded-[22px]
          bg-ink
          p-6
          text-ivory
        ">

          <p className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.28em]
            text-gold
          ">
            Tendrils Industries
          </p>

          <h3 className="
            mt-5
            font-display
            text-[26px]
            leading-[1.05]
            tracking-tight
          ">
            Commerce
            <br />
            shaped around
            <br />
            your industry.
          </h3>

          <p className="
            mt-5
            text-[12px]
            leading-5
            text-white/55
          ">
            Every industry has different customers,
            operations, systems and growth constraints.
            We architect around those realities.
          </p>

          <Link
            href="/industries"
            onClick={onClose}
            className="
              mt-auto
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-gold-light
              transition-colors
              hover:text-gold
            "
          >
            Explore all industries
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* =====================================================
            INDUSTRIES
        ===================================================== */}

        <div className="min-w-0">

          {!loaded ? (
            <IndustriesLoading />
          ) : industries.length === 0 ? (
            <EmptyIndustries />
          ) : (
            <div className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
            ">

              {industries.map((industry, index) => {
                const slug =
                  typeof industry?.slug === "string"
                    ? industry.slug
                    : industry?.slug?.current;

                if (!slug) return null;

                return (
                  <Link
                    key={industry?._id || slug}
                    href={`/industries/${slug}`}
                    onClick={onClose}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-transparent
                      px-4
                      py-4
                      transition-all
                      duration-300
                      hover:border-gold/15
                      hover:bg-white
                      hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                    "
                  >

                    {/* subtle gold accent */}

                    <span className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[2px]
                      origin-top
                      scale-y-0
                      bg-gold
                      transition-transform
                      duration-300
                      group-hover:scale-y-100
                    " />

                    <div className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    ">

                      <div className="min-w-0">

                        <p className="
                          text-[13px]
                          font-semibold
                          text-ink/80
                          transition-colors
                          group-hover:text-ink
                        ">
                          {cleanName(industry.title || industry.name)}
                        </p>

                        {industry.shortDescription && (
                          <p className="
                            mt-1.5
                            line-clamp-2
                            text-[10px]
                            leading-4
                            text-ink/45
                          ">
                            {industry.shortDescription}
                          </p>
                        )}

                      </div>

                      <ArrowUpRight
                        className="
                          mt-0.5
                          h-3.5
                          w-3.5
                          shrink-0
                          text-gold-deep
                          opacity-0
                          -translate-x-1
                          transition-all
                          duration-200
                          group-hover:translate-x-0
                          group-hover:opacity-100
                        "
                      />

                    </div>

                  </Link>
                );
              })}

            </div>
          )}

        </div>
      </div>

      {/* =====================================================
          BOTTOM STRIP
      ===================================================== */}

      {loaded && industries.length > 0 && (
        <div className="
          flex
          items-center
          justify-between
          border-t
          border-ink/5
          bg-ivory/50
          px-6
          py-3
        ">

          <p className="
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-ink/35
          ">
            Industry intelligence • Commerce • Growth
          </p>

          <Link
            href="/industries"
            onClick={onClose}
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-gold-deep
              transition-colors
              hover:text-ink
            "
          >
            View all →
          </Link>

        </div>
      )}

    </motion.div>
  );
}


/* =========================================================
   LOADING STATE
========================================================= */

function IndustriesLoading() {
  return (
    <div className="grid grid-cols-2 gap-4">

      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl bg-white p-5"
        >
          <div className="h-3 w-28 rounded bg-ink/10" />

          <div className="mt-3 h-2 w-full rounded bg-ink/5" />

          <div className="mt-2 h-2 w-3/4 rounded bg-ink/5" />
        </div>
      ))}

    </div>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyIndustries() {
  return (
    <div className="
      flex
      min-h-[250px]
      items-center
      justify-center
    ">
      <div className="text-center">

        <p className="
          font-display
          text-xl
          text-ink
        ">
          Industries coming soon.
        </p>

        <p className="
          mt-2
          text-xs
          text-ink/45
        ">
          Add industries from Sanity Studio
          to populate this menu.
        </p>

      </div>
    </div>
  );
}