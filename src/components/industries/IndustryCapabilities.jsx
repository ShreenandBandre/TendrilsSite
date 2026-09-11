"use client";

import { motion } from "framer-motion";

export default function IndustryCapabilities({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="bg-[#FAF7F2] px-6 py-20 md:py-24 text-ink">
      <div className="mx-auto max-w-5xl">

        {/* Compact Header */}
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-deep">
            What Tendrils Brings
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-5xl">
            Capabilities shaped for the industry.
          </h2>
        </div>

        {/* Clean, Short List Rows */}
        <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {items.map((item, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={item._key || index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="group py-6 grid gap-3 md:grid-cols-[80px_1fr_1.5fr] md:items-center transition-colors duration-300 hover:bg-white/60 px-4 rounded-2xl"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-gold-deep font-bold">
                  // {formattedIndex}
                </span>

                {item?.image?.assetUrl && <img src={item.image.assetUrl} alt={item.title || "Capability"} className="h-14 w-20 rounded-xl object-cover border border-ink/10" />}
                <h3 className="font-display text-xl text-ink group-hover:text-gold-deep transition-colors">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-sm leading-relaxed text-ink/70">
                    {item.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}