"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Building2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Zap, 
  Boxes 
} from "lucide-react";
import { urlFor } from "@/lib/sanity/image";

/**
 * Universal Image Extractor for Characteristics items
 */
function getCharacteristicImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;

  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source)
        .width(800)
        .height(600)
        .fit("crop")
        .auto("format")
        .url();
    } catch (e) {
      console.warn("Characteristic image error:", e);
    }
  }

  if (source.image) return getCharacteristicImageUrl(source.image);

  return null;
}

// Helper to map symbols or auto-detect based on text/index
function getCharacteristicIcon(iconName, index) {
  const icons = [Building2, Layers, Cpu, ShieldCheck, TrendingUp, Globe, Zap, Boxes];
  
  if (iconName && icons[iconName]) {
    const SelectedIcon = icons[iconName];
    return <SelectedIcon className="w-5 h-5 text-[#9A7625]" />;
  }
  
  const DefaultIcon = icons[index % icons.length];
  return <DefaultIcon className="w-5 h-5 text-[#9A7625]" />;
}

export default function IndustryCharacteristics({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-28 text-[#111111] md:py-36">
      
      {/* =====================================================
          DOTTED MATRIX BACKGROUND + PASTEL GLOWS
      ===================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-200/35 blur-[130px]" />
        <div className="absolute top-1/2 -right-45 h-[650px] w-[650px] rounded-full bg-amber-200/35 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 h-[550px] w-[550px] rounded-full bg-emerald-200/25 blur-[120px]" />

        <div 
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,162,39,0.6) 1.5px, transparent 1.5px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111111]/10 pb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">Industry DNA</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-[#111111] md:text-6xl">
              Built around the realities of the market.
            </h2>
          </div>
        </div>

        {/* Flexbox Centered Layout (Ensures last row items like 2 out of 5 stay perfectly centered) */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {items.map((item, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");
            const imageUrl = getCharacteristicImageUrl(item.image || item.imageUrl);

            return (
              <motion.article
                key={item._key || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-[#111111]/10 bg-white/80 p-7 backdrop-blur-2xl transition-all duration-500 hover:border-[#C9A227]/50 hover:bg-white hover:shadow-[0_25px_50px_rgba(201,162,39,0.12)] w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
              >
                <div>
                  {/* Optional Card Image Frame */}
                  {imageUrl && (
                    <div className="relative mb-6 h-44 w-full overflow-hidden rounded-2xl bg-[#FAF7F2]">
                      <Image
                        src={imageUrl}
                        alt={item.title || "Characteristic visual"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Top Row: Index and Symbol */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.25em] text-[#9A7625] font-bold">// {formattedIndex}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A227]/20 bg-[#C9A227]/[0.06] group-hover:bg-[#C9A227]/15 transition-colors">
                      {getCharacteristicIcon(item.icon, index)}
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-xl md:text-2xl text-[#111111] tracking-tight group-hover:text-[#9A7625] transition-colors">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-[#111111]/70">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-[#111111]/5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#111111]/40">
                  <span>Pillar</span>
                  <span className="text-[#9A7625] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Tendrils Verified</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}