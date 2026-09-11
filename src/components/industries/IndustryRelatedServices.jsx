"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function IndustryRelatedServices({ services = [] }) {
  if (!services.length) return null;

  return (
    <section className="bg-ivory px-6 py-24 md:py-32">

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-deep">
              Relevant Services
            </p>

            <h2 className="mt-5 font-display text-4xl text-ink md:text-6xl">
              Built for this environment.
            </h2>
          </div>

        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service, index) => {
            const slug =
              service.slug?.current ||
              service.slug;

            const title =
              service.name ||
              service.title;

            if (!slug || !title) return null;

            return (
              <motion.div
                key={service._id || index}
                whileHover={{ y: -6 }}
                className="
                  group
                  rounded-[2rem]
                  border border-ink/10
                  bg-white/60
                  p-8
                  transition-all
                  duration-500
                  hover:border-gold/40
                  hover:bg-white
                  hover:shadow-[0_20px_60px_rgba(17,17,17,0.07)]
                "
              >

                {service?.heroImage?.assetUrl && <img src={service.heroImage.assetUrl} alt={title} className="mb-6 h-40 w-full rounded-2xl object-cover" />}
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-deep">
                  {service.pillar || "Capability"}
                </p>

                <h3 className="mt-6 font-display text-2xl text-ink">
                  {title}
                </h3>

                {(service.shortDescription || service.summary) && (
                  <p className="mt-4 text-sm leading-7 text-ink/55">
                    {service.shortDescription || service.summary}
                  </p>
                )}

                <Link
                  href={`/services/${slug}`}
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-ink
                    transition-colors
                    group-hover:text-gold-deep
                  "
                >
                  Explore Service
                  <span>↗</span>
                </Link>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}