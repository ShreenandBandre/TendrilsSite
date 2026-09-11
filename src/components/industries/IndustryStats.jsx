"use client";

import { motion } from "framer-motion";

export default function IndustryStats({ items = [] }) {
  if (!items.length) return null;

  // Logic: Agar items 3 se kam hain, toh max columns kam kar do taaki alignment bigde nahi
  const gridCols = items.length === 1 ? "md:grid-cols-1" : items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="relative overflow-hidden bg-[#161412] px-6 py-20 md:py-28 text-[#F5F1E9]">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Dynamic Grid: responsive and adapts to item count */}
        <div className={`grid grid-cols-1 ${gridCols} border-l border-t border-white/10 rounded-[2rem] overflow-hidden bg-white/5`}>
          {items.map((stat, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={stat._key || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between border-b border-r border-white/10 p-8 md:p-10 bg-[#1C1816]/60 hover:bg-[#1C1816] transition-colors duration-300"
              >
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-white/30">
                    {formattedIndex}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                </div>

                {/* Middle Row */}
                <div className="my-8">
                  {stat?.image?.assetUrl && <img src={stat.image.assetUrl} alt={stat.label || "Metric"} className="mb-6 h-32 w-full rounded-2xl object-cover border border-white/10" />}
                  <p className="font-display text-5xl md:text-6xl text-[#D4AF37] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70 leading-relaxed">
                    {stat.label}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                  <div className="h-px w-6 bg-[#D4AF37]/60" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
                    Metric
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}