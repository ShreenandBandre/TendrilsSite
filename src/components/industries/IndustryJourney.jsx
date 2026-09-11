"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

/**
 * Universal Image Extractor for Journey Timeline Items
 */
function getJourneyItemImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;

  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source)
        .width(1000)
        .height(800)
        .fit("crop")
        .auto("format")
        .url();
    } catch (e) {
      console.warn("Journey item image error:", e);
    }
  }

  if (source.image) return getJourneyItemImageUrl(source.image);
  if (source.heroImage) return getJourneyItemImageUrl(source.heroImage);

  return null;
}

export default function IndustryJourney({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-28 md:py-36 text-[#111111]">
      {/* Subtle Warm Grid Pattern + Soft Pastels */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-[130px]" />
        <div className="absolute bottom-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-amber-200/30 blur-[130px]" />

        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,162,39,0.5) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
            Commerce Journey
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
            Where the experience comes together.
          </h2>
        </div>

        <div className="relative mt-16">

          {/* Timeline Line */}
          <div className="absolute left-5 top-0 h-full w-px bg-[#C9A227]/40 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-20">

            {items.map((item, index) => {
              const left = index % 2 === 0;
              const imageUrl = getJourneyItemImageUrl(
                item.image || item.imageUrl || item.photo || item.heroImage
              );

              return (
                <motion.div
                  key={item._key || index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="relative grid md:grid-cols-2 md:gap-16 items-center"
                >

                  {/* Content Card */}
                  <div
                    className={`
                      ${
                        left
                          ? "md:col-start-1 md:text-right"
                          : "md:col-start-2 md:text-left"
                      }
                      pl-14 md:pl-0
                    `}
                  >
                    <div className="group relative rounded-[2.5rem] border border-[#111111]/10 bg-white/85 p-7 md:p-9 backdrop-blur-xl transition-all duration-500 hover:border-[#C9A227]/50 hover:bg-white hover:shadow-[0_20px_50px_rgba(201,162,39,0.12)]">
                      
                      {/* Mobile or Compact Image inside Card if present */}
                      {imageUrl && (
                        <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-[#FAF7F2] md:hidden">
                          <Image
                            src={imageUrl}
                            alt={item.title || "Journey stage"}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                      )}

                      <span className="font-mono text-xs tracking-[0.25em] text-[#9A7625] font-bold">
                        // STEP {item.number || String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-3 font-display text-2xl md:text-3xl text-[#111111] tracking-tight group-hover:text-[#9A7625] transition-colors">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="mt-3 text-sm md:text-base leading-relaxed text-[#111111]/70">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Desktop Alternate Column: Image Preview Card */}
                  <div
                    className={`
                      hidden md:block
                      ${
                        left
                          ? "md:col-start-2 md:text-left"
                          : "md:col-start-1 md:text-right"
                      }
                    `}
                  >
                    {imageUrl ? (
                      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#C9A227]/30 bg-white/80 p-2.5 shadow-[0_20px_40px_rgba(17,17,17,0.06)] backdrop-blur-lg">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-[#FAF7F2]">
                          <Image
                            src={imageUrl}
                            alt={item.title || "Journey visual"}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 1024px) 50vw, 400px"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="opacity-25 border border-dashed border-[#111111]/30 rounded-[2.5rem] p-10 text-center text-xs uppercase tracking-widest font-mono text-[#111111]">
                        // Stage Visual Placeholder
                      </div>
                    )}
                  </div>

                  {/* Center Node Dot */}
                  <div
                    className="
                      absolute left-[12px] top-8
                      h-6 w-6
                      rounded-full
                      border-4 border-[#FAF7F2]
                      bg-[#C9A227]
                      shadow-[0_0_0_4px_rgba(201,162,39,0.2)]
                      md:left-1/2
                      md:-translate-x-1/2
                      md:top-1/2
                      md:-translate-y-1/2
                    "
                  />

                </motion.div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}