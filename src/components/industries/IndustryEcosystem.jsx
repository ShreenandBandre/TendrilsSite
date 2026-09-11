"use client";

import { motion } from "framer-motion";

export default function IndustryEcosystem({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#161412] px-6 py-24 text-[#F5F1E9] md:py-32">
      {/* Subtle Dark Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* 2-Column Layout: Left Text, Right Sanity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: Static Text & Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Commerce Architecture
            </p>

            <h2 className="mt-4 font-display text-4xl tracking-tight text-white md:text-5xl leading-[1.08]">
              The ecosystem behind the experience.
            </h2>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#C2B8A8]">
              A connected network of systems and modules built specifically to handle the structural complexities of your industry.
            </p>
          </div>

          {/* RIGHT: Sanity Ecosystem Cards Grid */}
          <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
            {items.map((item, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={item._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                  }}
                  whileHover={{ y: -4 }}
                  className="
                    group relative flex flex-col justify-between
                    rounded-[2rem]
                    border border-white/10
                    bg-[#1C1816]/80
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:border-[#D4AF37]/50
                    hover:bg-[#1C1816]
                    hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]
                  "
                >
                  <div>
                    {item?.image?.assetUrl && <div className="mb-6 relative h-40 overflow-hidden rounded-2xl border border-white/10"><img src={item.image.assetUrl} alt={item.name || "System"} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" /></div>}
                    {/* Top Category and Number */}
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]/80">
                        {item.category || "System"}
                      </p>
                      <span className="font-mono text-xs text-white/30">
                        // {formattedIndex}
                      </span>
                    </div>

                    {/* Item Name from Sanity */}
                    <h3 className="mt-6 font-display text-2xl text-white tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {item.name}
                    </h3>

                    {/* Item Description from Sanity */}
                    {item.description && (
                      <p className="mt-3 text-sm leading-relaxed text-[#C2B8A8]">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Indicator */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/30">
                    <span>Module</span>
                    <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">Integrated</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}