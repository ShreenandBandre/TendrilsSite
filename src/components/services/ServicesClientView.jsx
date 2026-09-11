"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Layers, Cpu, Workflow, TrendingUp, ShieldCheck } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";

function getServiceImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;
  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source).width(800).height(600).fit("crop").auto("format").url();
    } catch (e) {
      console.warn("Service image error:", e);
    }
  }
  if (source.image) return getServiceImageUrl(source.image);
  return null;
}

const pillarIcons = {
  build: Layers,
  automate: Workflow,
  scale: Cpu,
  grow: TrendingUp,
  support: ShieldCheck,
};

export default function ServicesClientView({ services = [] }) {
  const [activePillar, setActivePillar] = useState("all");

  const pillars = [
    { id: "all", label: "All Capabilities" },
    { id: "build", label: "Build" },
    { id: "automate", label: "Automate" },
    { id: "scale", label: "Scale" },
    { id: "grow", label: "Grow" },
    { id: "support", label: "Support" },
  ];

  const filteredServices = activePillar === "all"
    ? services
    : services.filter((s) => s.pillar?.toLowerCase() === activePillar);

  return (
    <div className="w-full">
      {/* =========================================================
          PILLAR FILTER PILLS (Desktop & Mobile Scrollable)
      ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-12">
        {pillars.map((pillar) => {
          const isActive = activePillar === pillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              className={`whitespace-nowrap rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? "bg-[#C9A227] text-[#111111] shadow-lg shadow-[#C9A227]/25"
                  : "border border-[#111111]/15 bg-white/50 text-[#111111]/70 hover:border-[#C9A227]/50 hover:text-[#111111]"
              }`}
            >
              {pillar.label}
            </button>
          );
        })}
      </div>

      {/* =========================================================
          STUNNING CARD GRID SHOWCASE
      ========================================================= */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredServices.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");
            const slug = service.slug?.current || service.slug || "#";
            const imageUrl = getServiceImageUrl(service.image || service.heroImage || service.imageUrl);
            const PillarIcon = pillarIcons[service.pillar?.toLowerCase()] || Layers;

            return (
              <motion.article
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                key={service._id || index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-[#111111]/10 bg-white/85 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-[#C9A227]/60 hover:bg-white hover:shadow-[0_25px_50px_rgba(201,162,39,0.15)]"
              >
                <div>
                  {/* Optional Service Visual Thumbnail */}
                  {imageUrl && (
                    <div className="relative mb-6 h-52 w-full overflow-hidden rounded-2xl bg-[#FAF7F2]">
                      <img
                        src={imageUrl}
                        alt={service.name || "Service visual"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Top Bar: Index & Pillar Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#9A7625]">
                      // {formattedIndex}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A227]/30 bg-[#C9A227]/[0.08] group-hover:bg-[#C9A227]/20 transition-colors">
                      <PillarIcon className="h-5 w-5 text-[#9A7625]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 font-display text-2xl tracking-tight text-[#111111] group-hover:text-[#9A7625] transition-colors">
                    {service.name}
                  </h3>

                  {/* Short Description */}
                  {service.shortDescription && (
                    <p className="mt-4 text-sm leading-relaxed text-[#111111]/70">
                      {service.shortDescription}
                    </p>
                  )}
                </div>

                {/* Bottom Action / Explore Link */}
                <div className="mt-10 pt-6 border-t border-[#111111]/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A7625]">
                    {service.pillar || "Capability"}
                  </span>
                  <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111] group-hover:text-[#9A7625] transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-base text-[#111111]/60 font-medium">No services found under this capability pillar.</p>
        </div>
      )}
    </div>
  );
}