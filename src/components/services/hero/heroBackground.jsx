"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  const squares = [
    { className: "left-[4%] top-[10%] h-24 w-24 md:h-36 md:w-36", delay: 0, duration: 8 },
    { className: "left-[16%] top-[32%] h-20 w-20 md:h-28 md:w-28", delay: 1.2, duration: 7 },
    { className: "right-[6%] top-[12%] h-28 w-28 md:h-40 md:w-40", delay: 0.5, duration: 9 },
    { className: "right-[18%] top-[45%] h-20 w-20 md:h-28 md:w-28", delay: 1.8, duration: 8 },
    { className: "left-[8%] bottom-[10%] h-24 w-24 md:h-32 md:w-32", delay: 2.2, duration: 9 },
    { className: "right-[8%] bottom-[6%] h-28 w-28 md:h-36 md:w-36", delay: 1.4, duration: 10 },
    { className: "left-[44%] bottom-[8%] h-16 w-16 md:h-24 md:w-24", delay: 2.5, duration: 7 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* =====================================================
          BASE WARM BACKGROUND (Native Brand Tone)
      ====================================================== */}
      <div className="absolute inset-0 bg-[#EDE2D0]" />

      {/* =====================================================
          WARM GOLD CENTRAL GLOW
      ====================================================== */}
      <div
        className="
          absolute
          left-1/2
          top-1/3
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C9A227]/20
          blur-[140px]
        "
      />

      {/* =====================================================
          ACCENT AMBIENT LIGHT
      ====================================================== */}
      <motion.div
        animate={{
          opacity: [0.18, 0.3, 0.18],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[10%]
          top-[20%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#9A7625]/15
          blur-[120px]
        "
      />

      {/* =====================================================
          GEOMETRIC GRID PATTERN (Enhanced Contrast)
      ====================================================== */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.55]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(120, 92, 35, 0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(120, 92, 35, 0.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* =====================================================
          FLOATING ROUNDED SQUARES (Made more visible / darker contrast)
      ====================================================== */}
      {squares.map((square, index) => (
        <motion.div
          key={index}
          className={`
            absolute
            ${square.className}
            rounded-[28px]
            border
            border-white/80
            bg-white/[0.28]
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_12px_35px_rgba(120,92,35,0.12)]
            backdrop-blur-[6px]
          `}
          animate={{
            y: [0, -10, 0],
            x: [0, index % 2 === 0 ? 4 : -4, 0],
            opacity: [0.75, 0.95, 0.75],
          }}
          transition={{
            duration: square.duration,
            delay: square.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* =====================================================
          SOFT EDGE VIGNETTE FADE
      ====================================================== */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(
            to_bottom,
            rgba(75,62,42,0.05),
            transparent_25%,
            transparent_75%,
            rgba(75,62,42,0.09)
          )]
        "
      />
    </div>
  );
}