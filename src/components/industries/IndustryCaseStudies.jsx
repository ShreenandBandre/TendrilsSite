"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function IndustryCaseStudies({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="bg-ink px-6 py-24 text-ivory md:py-32">

      <div className="mx-auto max-w-7xl">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Relevant Work
          </p>

          <h2 className="mt-5 font-display text-4xl md:text-6xl">
            What this looks like in practice.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">

          {items.map((item, index) => (
            <motion.article
              key={item._id || index}
              whileHover={{ y: -6 }}
              className="
                group
                overflow-hidden
                rounded-[2rem]
                border border-white/10
                bg-white/[0.035]
                transition-all
                duration-500
                hover:border-gold/30
              "
            >

              {item.heroImage?.assetUrl && (
                <img
                  src={item.heroImage.assetUrl}
                  alt={item.title}
                  className="aspect-[16/9] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              )}

              <div className="p-8">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  {item.client || "Case Study"}
                </p>

                <h3 className="mt-5 font-display text-3xl">
                  {item.title}
                </h3>

                {item.results?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4">
                    {item.results.slice(0, 3).map((result, resultIndex) => (
                      <div key={`${result.metric}-${resultIndex}`}>
                        <p className="font-display text-2xl text-gold">
                          {result.value}
                        </p>
                        <p className="mt-1 text-xs text-white/45">
                          {result.metric}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {item.slug && (
                  <Link
                    href={`/case-studies/${item.slug}`}
                    className="mt-7 inline-flex text-xs font-bold uppercase tracking-[0.2em] text-gold"
                  >
                    Read Case Study →
                  </Link>
                )}

              </div>
            </motion.article>
          ))}

        </div>

      </div>
    </section>
  );
}