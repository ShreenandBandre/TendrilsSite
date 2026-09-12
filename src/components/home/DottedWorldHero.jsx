"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import DottedMap from "dotted-map";

import MagneticButton from "@/components/ui/MagneticButton";
import PartnersMarquee from "@/components/home/PartnersMarquee";

/* =========================================================
   DOTTED WORLD MAP
========================================================= */

const map = new DottedMap({
  height: 60,
  grid: "diagonal",
});

const rawMapSvg = map.getSVG({
  radius: 0.22,
  color: "#C9A227",
  shape: "circle",
  backgroundColor: "transparent",
});

/*
 * Force explicit dimensions because dotted-map only provides
 * a viewBox. This avoids sizing problems on mobile browsers.
 */
const mapSvg = rawMapSvg.replace(
  "<svg ",
  '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" '
);

/* =========================================================
   COMPONENT
========================================================= */

export default function DottedWorldHero({
  stats = [],
  hero = {},
  logo,
  logoAlt = "Tendrils",
  partnersMarquee = null,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* =======================================================
     SCROLL ANIMATIONS
  ======================================================= */

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 0]
  );

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, -40]
  );

  const tendrilsScale = useTransform(
    scrollYProgress,
    [0.3, 0.85],
    [0.85, 1.1]
  );

  const tendrilsOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.45, 0.85],
    [0, 1, 1]
  );

  const mapOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5],
    [0.3, 0.15, 0]
  );

  const mapScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.2]
  );

  /* =======================================================
     FALLBACK STATS
  ======================================================= */

  const defaultStats = [
    {
      value: "250+",
      label: "Global Consultants",
    },
    {
      value: "3",
      label: "Global Hubs",
    },
    {
      value: "50+",
      label: "Agile Practitioners",
    },
  ];

  const activeStats =
    Array.isArray(stats) && stats.length > 0
      ? stats
      : defaultStats;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={ref}
      className="relative h-[250vh] w-full overflow-x-hidden bg-ivory"
    >
      {/* ===================================================
          STICKY HERO VIEWPORT
      =================================================== */}

      <div
        className="
          sticky
          top-0
          flex
          h-dvh
          min-h-[600px]
          w-full
          flex-col
          items-center
          justify-center
          overflow-hidden
          px-4
          sm:px-6
        "
      >
        {/* =================================================
            WORLD MAP BACKGROUND
        ================================================= */}

        <motion.div
          style={{
            opacity: mapOpacity,
            scale: mapScale,
          }}
          animate={{
            x: ["0%", "-12%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            flex
            items-center
            justify-center
            overflow-hidden
          "
          dangerouslySetInnerHTML={{
            __html: mapSvg,
          }}
        />

        {/* =================================================
            LAYER 1 — MAIN HERO CONTENT
        ================================================= */}

        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
          }}
          className="
            relative
            z-20
            mx-auto
            flex
            w-full
            max-w-4xl
            flex-col
            items-center
            px-0
            text-center
            pointer-events-auto
          "
        >
          {/* EYEBROW */}

          <p
            className="
              mb-4
              px-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-gold-deep
              sm:text-xs
              sm:tracking-[0.3em]
            "
          >
            {hero.eyebrow || "Ecommerce Growth Partner"}
          </p>

          {/* =================================================
              HEADLINE
          ================================================= */}

          <h1
            className="
              w-full
              max-w-4xl
              px-0
              font-display
              text-[2.35rem]
              font-bold
              leading-[1.05]
              tracking-tight
              text-ink
              drop-shadow-sm
              sm:text-5xl
              sm:leading-tight
              md:text-7xl
            "
          >
            {hero.headline || "We do not sell hours."}

            <br />

            <span className="gold-text font-bold">
              {hero.highlight || "We sell trajectory."}
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mx-auto
              mt-6
              w-full
              max-w-[360px]
              px-1
              text-[15px]
              font-medium
              leading-relaxed
              text-ink
              sm:max-w-xl
              sm:text-lg
            "
          >
            {hero.description ||
              "Tendrils builds, integrates, automates, and scales Shopify businesses end-to-end — from first store to multi-entity, ERP-integrated commerce."}
          </p>

          {/* =================================================
              CTA BUTTONS
          ================================================= */}

          <div
            className="
              mt-8
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-4
              sm:mt-10
              sm:flex-row
            "
          >
            <MagneticButton
              className="
                rounded-full
                bg-gold
                px-8
                py-4
                text-sm
                font-semibold
                text-ink
                shadow-[0_10px_30px_rgba(201,162,39,0.15)]
                transition-all
                duration-300
                hover:opacity-90
                hover:shadow-md
              "
            >
              <Link
                href={
                  hero.primaryCta?.href ||
                  "/contact"
                }
              >
                {hero.primaryCta?.label ||
                  "Book a Consultation"}
              </Link>
            </MagneticButton>

            <Link
              href={
                hero.secondaryCta?.href ||
                "/case-studies"
              }
              className="
                text-sm
                font-semibold
                text-ink
                underline
                underline-offset-4
                transition-colors
                hover:text-gold-deep
              "
            >
              {hero.secondaryCta?.label ||
                "See our results"}
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            LAYER 2 — TENDRILS / STATS
        ================================================= */}

        <motion.div
          style={{
            scale: tendrilsScale,
            opacity: tendrilsOpacity,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            flex
            flex-col
            items-center
            justify-center
            px-4
            text-center
          "
        >
          {/* LOGO */}

          {logo?.assetUrl && (
            <img
              src={logo.assetUrl}
              alt={logoAlt}
              className="
                mb-6
                h-12
                w-auto
                object-contain
                opacity-95
                sm:h-14
                md:h-16
              "
            />
          )}

          {/* TENDRILS TITLE */}

          <h2
            className="
              select-none
              font-display
              text-6xl
              tracking-tight
              text-black
              sm:text-7xl
              md:text-9xl
            "
          >
            Tendrils
          </h2>

          <p
            className="
              mt-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-gold-deep
              sm:text-xs
              sm:tracking-[0.5em]
            "
          >
            Global Commerce Architecture
          </p>

          {/* =================================================
              STATS
          ================================================= */}

          <div
            className="
              pointer-events-auto
              mt-8
              grid
              w-full
              max-w-3xl
              grid-cols-3
              gap-2
              sm:mt-10
              sm:gap-4
              md:gap-6
            "
          >
            {activeStats.map((stat, idx) => (
              <div
                key={idx}
                className="
                  rounded-xl
                  border
                  border-gold/20
                  bg-white/70
                  p-2.5
                  text-center
                  shadow-sm
                  backdrop-blur-md
                  sm:rounded-2xl
                  sm:p-4
                  md:p-6
                "
              >
                {stat?.image?.assetUrl && (
                  <img
                    src={stat.image.assetUrl}
                    alt={stat.label || "Stat"}
                    className="
                      mb-2
                      hidden
                      h-20
                      w-full
                      rounded-xl
                      object-cover
                      sm:block
                      md:mb-4
                    "
                  />
                )}

                <p
                  className="
                    gold-text
                    font-display
                    text-lg
                    font-bold
                    sm:text-2xl
                    md:text-4xl
                  "
                >
                  {stat.value}
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    font-bold
                    uppercase
                    leading-tight
                    tracking-tight
                    text-ink/70
                    sm:text-[10px]
                    sm:tracking-widest
                    md:text-[11px]
                  "
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* =================================================
            BOTTOM — PARTNERS + SCROLL
        ================================================= */}

        <motion.div
          style={{
            opacity: heroOpacity,
          }}
          className="
            absolute
            bottom-5
            z-10
            flex
            w-full
            flex-col
            items-center
            px-2
            sm:bottom-8
            sm:px-4
          "
        >
          <PartnersMarquee data={partnersMarquee} />

          <p
            className="
              mt-5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-ink/50
              sm:mt-8
              sm:text-xs
              sm:tracking-[0.3em]
            "
          >
            Scroll to explore ↓
          </p>
        </motion.div>
      </div>
    </section>
  );
}