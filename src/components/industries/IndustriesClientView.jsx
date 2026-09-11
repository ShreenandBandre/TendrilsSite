"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Building2, ShieldCheck } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";

function getIndustryImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;
  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source).width(1000).height(1000).fit("crop").auto("format").url();
    } catch (e) {
      console.warn("Industry image error:", e);
    }
  }
  if (source.image) return getIndustryImageUrl(source.image);
  return null;
}

export default function IndustriesClientView({ industries = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...new Set(industries.map((ind) => ind.category).filter(Boolean))];

  const filteredIndustries = activeCategory === "all"
    ? industries
    : industries.filter((ind) => ind.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="w-full">
      {/* =========================================================
          CATEGORY FILTER PILLS (Desktop & Mobile Scrollable)
      ========================================================= */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? "bg-[#C9A227] text-[#111111] shadow-lg shadow-[#C9A227]/25"
                    : "border border-[#111111]/15 bg-white/50 text-[#111111]/70 hover:border-[#C9A227]/50 hover:text-[#111111]"
                }`}
              >
                {cat === "all" ? "All Industries" : cat}
              </button>
            );
          })}
        </div>
      )}

      {/* =========================================================
          STUNNING CARD GRID SHOWCASE
      ========================================================= */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence>
          {filteredIndustries.map((industry, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");
            const slug = industry.slug?.current || industry.slug || "#";
            const imageUrl = getIndustryImageUrl(industry.hero?.image || industry.image || industry.heroImage);

            return (
              <motion.article
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                key={industry._id || index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-[#111111]/10 bg-white/85 p-8 md:p-10 backdrop-blur-2xl transition-all duration-500 hover:border-[#C9A227]/60 hover:bg-white hover:shadow-[0_25px_50px_rgba(201,162,39,0.15)]"
              >
                <div>
                  {/* Large Square Image Preview Frame */}
                  {imageUrl && (
                    <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-3xl bg-[#FAF7F2] border border-[#111111]/10">
                      <img
                        src={imageUrl}
                        alt={industry.title || "Industry visual"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Top Bar: Index & Category */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#9A7625]">
                      // {formattedIndex}
                    </span>
                    <div className="flex items-center gap-1.5 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/[0.08] px-3.5 py-1 text-[10px] font-bold tracking-wider text-[#9A7625] uppercase">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{industry.category || "Sector"}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 font-display text-3xl tracking-tight text-[#111111] group-hover:text-[#9A7625] transition-colors">
                    {industry.title}
                  </h3>

                  {/* Short Description */}
                  {industry.shortDescription && (
                    <p className="mt-4 text-base leading-relaxed text-[#111111]/70">
                      {industry.shortDescription}
                    </p>
                  )}

                  {/* Pain Points Highlights */}
                  {Array.isArray(industry.painPoints) && industry.painPoints.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#111111]/5 space-y-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]/40">Key Challenges Solved:</p>
                      {industry.painPoints.slice(0, 3).map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#111111]/75 leading-relaxed">
                          <ShieldCheck className="h-4 w-4 shrink-0 text-[#C9A227] mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action / Explore Link */}
                <div className="mt-10 pt-6 border-t border-[#111111]/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A7625]">
                    {industry.featured ? "Featured Sector" : "Industry Profile"}
                  </span>
                  <Link
                    href={`/industries/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111] group-hover:text-[#9A7625] transition-colors"
                  >
                    <span>Explore Context</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredIndustries.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-base text-[#111111]/60 font-medium">No industries found under this category.</p>
        </div>
      )}
    </div>
  );
}