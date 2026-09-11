"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const fallbackExpertise = {
  title: "Strategic Expertise",
  subtitle: "Driven by purpose, engineered for the future of digital commerce.",
  items: [
    {
      heading: "Our Mission",
      description:
        "To collaborate and foster disruption with leading-edge solutions that ensure our clients' future readiness.",
    },
    {
      heading: "Our Vision",
      description:
        "To shape a bold new era of digital disruption, with quality, agility, and integrity at the core — paving the path to uncharted dimensions of technology and innovation.",
    },
  ],
};

export default function ExpertiseSection({ expertise }) {
  const data = expertise || fallbackExpertise;
  const items = data?.items?.length > 0 ? data.items : fallbackExpertise.items;

  return (
    <section className="relative w-full bg-[#030305] text-white py-24 md:py-40 selection:bg-amber-500/30">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[150px] mix-blend-screen" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* =====================================================
              LEFT COLUMN: STICKY EDITORIAL HEADER
          ===================================================== */}
          <div className="lg:sticky lg:top-40 lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="h-[2px] w-12 bg-amber-400" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
                  Core Principles
                </span>
              </div>

              {/* High-Contrast Editorial Title */}
              <h2 className="text-5xl font-serif font-light leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
                {data?.title?.split(" ")[0] || "Strategic"} <br />
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 italic">
                  {data?.title?.split(" ").slice(1).join(" ") || "Expertise"}
                </span>
              </h2>

              <p className="mt-8 max-w-md font-sans text-lg font-light leading-relaxed text-gray-400">
                {data?.subtitle || fallbackExpertise.subtitle}
              </p>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT COLUMN: SCROLLING CONTENT BLOCKS
          ===================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-12 md:gap-20">
            {items.map((item, index) => (
              <motion.div
                key={`${item?.heading || "expertise"}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col md:flex-row gap-8 border-t border-white/10 pt-10 transition-colors duration-500 hover:border-amber-400/50"
              >
                {/* Huge Typography Numbers (01, 02) */}
                <div className="font-mono text-5xl font-light text-white/10 transition-colors duration-500 group-hover:text-amber-400/40 md:text-7xl">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex-1">
                  {/* Optional Image Integration */}
                  {item?.image?.assetUrl && (
                    <div className="mb-8 w-full overflow-hidden rounded-xl bg-white/5">
                      <img
                        src={item.image.assetUrl}
                        alt={item.heading}
                        className="h-64 w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                  )}

                  <h3 className="mb-6 font-serif text-3xl font-medium tracking-tight text-white md:text-4xl">
                    {item?.heading}
                  </h3>

                  <p className="max-w-xl font-sans text-base font-light leading-relaxed text-gray-400 md:text-lg">
                    {item?.description}
                  </p>

                  {/* Elegant CTA Arrow */}
                  {item?.cta?.href && item?.cta?.label && (
                    <a
                      href={item.cta.href}
                      className="group/btn mt-8 inline-flex items-center gap-3 text-sm font-medium tracking-wide text-white transition-colors hover:text-amber-400"
                    >
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-full">
                          {item.cta.label}
                        </span>
                        <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0 text-amber-400">
                          {item.cta.label}
                        </span>
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      >
                        <path
                          d="M1 8H15M15 8L8 1M15 8L8 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}