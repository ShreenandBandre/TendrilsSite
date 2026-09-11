"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ActionLink from "@/components/content/ActionLink";

export default function CardsSection({ section }) {
  const cards = section?.cards || [];

  if (!cards.length) return null;

  const totalCards = cards.length;

  // Har count ke liye max-width aur responsive column sizing
  const getContainerWidth = (count) => {
    if (count === 1) return "max-w-xl mx-auto";
    if (count === 2) return "max-w-4xl mx-auto";
    if (count === 3) return "max-w-6xl mx-auto";
    if (count === 4) return "max-w-5xl mx-auto";
    return "max-w-7xl mx-auto";
  };

  // Card size calculation (2-col vs 3-col)
  const getCardBasisClass = (count) => {
    if (count === 1) return "w-full";
    if (count === 2 || count === 4) return "w-full md:w-[calc(50%-12px)]";
    return "w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]";
  };

  return (
    <section className="relative overflow-hidden bg-[#EAE1D0] px-6 py-24 md:py-32">
      
      {/* =====================================================
          RICH LAYERED BACKGROUND & ARCHITECTURAL GRID
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(154, 118, 37, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(154, 118, 37, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Floating Ambient Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#C9A227]/12 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#9A7625]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADING: PERFECTLY CENTERED IN THE SCREEN
        ====================================================== */}
        <div className="mb-16 flex flex-col items-center justify-center text-center mx-auto max-w-3xl">
          <SectionHeading 
            heading={section.heading} 
            description={section.description} 
            className="text-center [&_*]:text-center [&_*]:mx-auto"
          />
        </div>

        {/* =====================================================
            BALANCED AUTO-CENTERING CARD CONTAINER
        ====================================================== */}
        <div className={`flex flex-wrap justify-center gap-6 ${getContainerWidth(totalCards)}`}>
          {cards.map((card, index) => {
            const number = String(index + 1).padStart(2, "0");
            const imgSrc =
              card.image?.assetUrl ||
              card.image?.asset?.url ||
              card.imageUrl ||
              null;

            return (
              <motion.article
                key={card._key || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/[0.65] p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(40,32,20,0.06)] transition-all duration-500 hover:border-[#C9A227]/60 hover:bg-white/[0.9] hover:shadow-[0_30px_70px_rgba(40,32,20,0.12)] ${getCardBasisClass(totalCards)}`}
              >
                {/* Luxury Top Gold Line Animation */}
                <span className="absolute left-0 top-0 h-[3px] w-0 bg-[#C9A227] transition-all duration-700 ease-out group-hover:w-full" />

                {/* Inner Glow Card Accent */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#C9A227]/0 blur-2xl transition-all duration-700 group-hover:bg-[#C9A227]/10" />

                {/* Optional Top Card Image */}
                {imgSrc && (
                  <div className="-mx-8 -mt-8 mb-6 h-48 overflow-hidden bg-[#111111]/5">
                    <img 
                      src={imgSrc} 
                      alt={card.title || "Card visual"} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                )}

                <div className="relative flex h-full flex-col justify-between">
                  {/* Top Bar: Tag & Number */}
                  <div className="flex items-center justify-between">
                    {card.tag ? (
                      <span className="rounded-full border border-[#C9A227]/25 bg-[#C9A227]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7625]">
                        {card.tag}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#111111]/35">
                        Module 0{number}
                      </span>
                    )}

                    <span className="font-display text-3xl leading-none text-[#111111]/15 transition-colors duration-500 group-hover:text-[#C9A227]">
                      {number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-8 flex-1">
                    <h3 className="font-display text-2xl leading-tight tracking-tight text-[#111111] transition-colors duration-500 group-hover:text-[#9A7625] md:text-3xl">
                      {card.title}
                    </h3>

                    {card.description && (
                      <p className="mt-4 text-sm leading-relaxed text-[#111111]/65 transition-colors duration-500 group-hover:text-[#111111]/85">
                        {card.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#111111]/8">
                    <div className="flex items-center gap-2">
                      <span className="h-px w-6 bg-[#C9A227]/40 transition-all duration-500 group-hover:w-10 group-hover:bg-[#C9A227]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]/35 transition-colors duration-500 group-hover:text-[#9A7625]">
                        Explore
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {card.cta?.label && <ActionLink cta={card.cta} className="!px-4 !py-2" />}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/10 text-xs text-[#111111]/40 transition-all duration-500 group-hover:border-[#C9A227]/40 group-hover:bg-[#C9A227] group-hover:text-[#111111]">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Optional Section Level CTA */}
        {section.cta && (
          <div className="mt-14 flex justify-center">
            <ActionLink cta={section.cta} />
          </div>
        )}
      </div>
    </section>
  );
}