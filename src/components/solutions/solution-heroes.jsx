"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Database,
  Layers3,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react";

/**
 * Universal Image Resolver:
 * Sanity se aane wale kisi bhi image structure se valid URL extract karta hai
 */
function extractSafeImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;

  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;

  if (source.asset?.url) return source.asset.url;
  if (typeof source.asset === "string" && source.asset.startsWith("http"))
    return source.asset;

  if (source.image) return extractSafeImageUrl(source.image);
  if (source.heroImage) return extractSafeImageUrl(source.heroImage);
  if (source.mainImage) return extractSafeImageUrl(source.mainImage);

  return null;
}

export function ServiceHero({ solution, style }) {
  if (style === "systems") return <SystemsHero solution={solution} />;
  if (style === "innovation") return <InnovationHero solution={solution} />;
  if (style === "growth") return <GrowthHero solution={solution} />;
  if (style === "journey") return <JourneyHero solution={solution} />;
  return <EditorialHero solution={solution} />;
}

// Innovation Hero ke liye: Pehle wale pastel blobs + High-Visibility Honeycomb Pattern
function InnovationHoneycombBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wahi pehle wale Multicolor Soft Pastel Gradients */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-200/50 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[650px] w-[650px] rounded-full bg-amber-200/50 blur-[130px]" />
      <div className="absolute -bottom-40 left-1/3 h-[550px] w-[550px] rounded-full bg-emerald-200/40 blur-[120px]" />

      {/* Clearly Visible Crisp Honeycomb Pattern */}
      <div className="absolute inset-0 opacity-[0.38]">
        <svg
          className="h-full w-full stroke-[#C9A227]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="honeycomb-pattern-vivid"
              width="56"
              height="96"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z 
                    M28 48 L56 64 L56 96 L28 112 L0 96 L0 64 Z"
                fill="none"
                strokeWidth="1.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb-pattern-vivid)" />
        </svg>
      </div>

      {/* Floating subtle glass hexagons accents */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FAF7F2]/40 to-[#FAF7F2]/80" />
    </div>
  );
}

// Systems Hero ke liye: Partial Tech/Circuit Honeycomb Pattern with Connector Nodes
function SystemsHoneycombBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Multicolor Soft Pastel Gradients */}
      <div className="absolute -top-36 -left-36 h-[550px] w-[550px] rounded-full bg-purple-200/40 blur-[120px]" />
      <div className="absolute top-1/4 -right-40 h-[600px] w-[600px] rounded-full bg-amber-200/45 blur-[130px]" />
      <div className="absolute -bottom-36 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-[120px]" />

      {/* Partial Tech Honeycomb Grid (Radial fade towards top-right) */}
      <div className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_75%)]">
        <svg
          className="h-full w-full stroke-[#C9A227]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="systems-honeycomb-pattern"
              width="60"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z
                    M30 69.28 L60 86.6 L60 121.24 L30 138.56 L0 121.24 L0 86.6 Z"
                fill="none"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <circle cx="30" cy="0" r="2.5" className="fill-[#C9A227]" />
              <circle cx="60" cy="17.32" r="2.5" className="fill-[#C9A227]" />
              <circle cx="0" cy="17.32" r="2.5" className="fill-[#C9A227]" />
              <circle cx="30" cy="69.28" r="2.5" className="fill-[#C9A227]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#systems-honeycomb-pattern)" />
        </svg>
      </div>

      {/* Subtle bottom-left partial accent */}
      <div className="absolute -bottom-20 -left-20 h-96 w-96 opacity-[0.25] [mask-image:radial-gradient(circle,black_25%,transparent_70%)]">
        <svg className="h-full w-full stroke-[#9A7625]" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#systems-honeycomb-pattern)" />
        </svg>
      </div>
    </div>
  );
}

// Shared Multicolor Pastel Squarish Background Component
function PastelGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-200/40 blur-[120px]" />
      <div className="absolute top-1/3 -right-45 h-[650px] w-[650px] rounded-full bg-amber-200/40 blur-[130px]" />
      <div className="absolute -bottom-40 left-1/3 h-[550px] w-[550px] rounded-full bg-emerald-200/30 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(201,162,39,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,162,39,0.15) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-6 p-8 opacity-[0.15]">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-[#C9A227]/30 bg-white/20 h-40"
          />
        ))}
      </div>
    </div>
  );
}

function EditorialHero({ solution }) {
  const hero = solution.hero || {};
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#111111]/10 px-6 py-28 md:py-40">
      <PastelGridBackground />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
            {hero.eyebrow || solution.category || solution.name}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl text-[#111111]">
            {hero.headline || solution.name}
            {hero.highlight && (
              <>
                {" "}
                <span className="text-[#C9A227]">{hero.highlight}</span>
              </>
            )}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#111111]/75">
            {hero.description ||
              solution.description ||
              solution.shortDescription}
          </p>
          <HeroButtons hero={hero} />
        </div>
        <HeroVisual solution={solution} />
      </div>
    </section>
  );
}

function SystemsHero({ solution }) {
  const hero = solution.hero || {};

  // Sanity image safe resolution (nested, direct, or parent solution level)
  const imgSrc =
    extractSafeImageUrl(hero.image) ||
    extractSafeImageUrl(hero.imageUrl) ||
    extractSafeImageUrl(solution.image) ||
    extractSafeImageUrl(solution.heroImage) ||
    extractSafeImageUrl(solution.imageUrl) ||
    null;

  const hasImage = Boolean(imgSrc);

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-28 md:py-36 text-[#111111]">
      {/* Partial Systems-Specific Honeycomb + Soft Pastel Blobs */}
      <SystemsHoneycombBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            hasImage ? "lg:grid-cols-12" : "max-w-4xl"
          }`}
        >
          {/* Content Column */}
          <div className={hasImage ? "lg:col-span-7" : "w-full"}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
              {hero.eyebrow || solution.category || "Systems & Integration"}
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl text-[#111111]">
              {hero.headline || solution.title || solution.name}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#111111]/75">
              {hero.description ||
                solution.description ||
                solution.shortDescription ||
                solution.summary}
            </p>
            <HeroButtons hero={hero} />
          </div>

          {/* Right Side: Sanity Image Showcase */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <div className="group relative w-full max-w-md lg:max-w-none">
                {/* Tech gold ambient glow */}
                <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-[#C9A227]/30 via-amber-200/30 to-purple-200/20 blur-2xl opacity-80 transition duration-500 group-hover:opacity-100" />

                {/* Glass Container Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-[#C9A227]/40 bg-white/80 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[1.5rem] bg-[#FAF7F2]">
                    <Image
                      src={imgSrc}
                      alt={
                        hero.headline ||
                        solution.name ||
                        "Systems architecture visual"
                      }
                      fill
                      unoptimized={imgSrc.endsWith(".svg")}
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Systems Node Pipeline Visual */}
        <ArchitectureVisual />
      </div>
    </section>
  );
}

function InnovationHero({ solution }) {
  const hero = solution.hero || {};
  const image = hero?.image || solution?.image;
  const src =
    extractSafeImageUrl(image) ||
    extractSafeImageUrl(hero?.imageUrl) ||
    extractSafeImageUrl(solution?.imageUrl) ||
    null;

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-24 md:py-36 text-[#111111]">
      {/* Pastel Colors + Visible Honeycomb Pattern */}
      <InnovationHoneycombBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`grid items-center gap-12 lg:gap-14 ${
            src ? "lg:grid-cols-12" : "max-w-5xl mx-auto"
          }`}
        >
          {/* Main Info Column */}
          <div
            className={`flex flex-col items-center text-center ${
              src ? "lg:col-span-7" : "w-full"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#C9A227]" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
                {hero.eyebrow || "Innovation"}
              </p>
            </div>

            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl text-[#111111]">
              {hero.headline || solution.name}
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[#111111]/75">
              {hero.description ||
                solution.description ||
                solution.shortDescription}
            </p>

            {/* Centered CTA Buttons */}
            <div className="w-full flex justify-center">
              <HeroButtons hero={hero} />
            </div>
          </div>

          {/* Right Side: Sanity Image Showcase */}
          {src && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <div className="group relative w-full max-w-md lg:max-w-none">
                {/* Subtle Amber/Gold Aura */}
                <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-[#C9A227]/30 via-amber-200/40 to-purple-200/30 blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" />

                {/* Glass Container Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-[#C9A227]/40 bg-white/80 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[1.5rem] bg-[#FAF7F2]">
                    <Image
                      src={src}
                      alt={
                        image?.alt ||
                        hero.headline ||
                        solution.name ||
                        "Innovation visual"
                      }
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function GrowthHero({ solution }) {
  const hero = solution.hero || {};

  // Safe image resolution for GrowthHero's main hero illustration/image display
  const mainImgSrc =
    extractSafeImageUrl(hero.image) ||
    extractSafeImageUrl(hero.imageUrl) ||
    extractSafeImageUrl(solution.image) ||
    extractSafeImageUrl(solution.heroImage) ||
    extractSafeImageUrl(solution.imageUrl) ||
    null;

  const hasMainImage = Boolean(mainImgSrc);

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-28 md:py-36 text-[#111111]">
      <PastelGridBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            hasMainImage ? "lg:grid-cols-12" : "lg:grid-cols-[.9fr_1.1fr]"
          }`}
        >
          {/* Left Text Column */}
          <div className={hasMainImage ? "lg:col-span-7" : "w-full"}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
              {hero.eyebrow || "Growth"}
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl text-[#111111]">
              {hero.headline || solution.name}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#111111]/75">
              {hero.description ||
                solution.description ||
                solution.shortDescription}
            </p>
            <HeroButtons hero={hero} />
          </div>

          {/* Right Column: Dynamic Sanity Main Image or Stats Cards */}
          {hasMainImage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <div className="group relative w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-[#C9A227]/30 via-amber-200/30 to-purple-200/20 blur-2xl opacity-80 transition duration-500 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-[2rem] border border-[#C9A227]/40 bg-white/80 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[1.5rem] bg-[#FAF7F2]">
                    <Image
                      src={mainImgSrc}
                      alt={hero.headline || solution.name || "Growth visual"}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {(solution.stats || []).slice(0, 4).map((stat, index) => (
                <motion.div
                  key={stat._key || index}
                  whileHover={{ y: -5 }}
                  className="overflow-hidden rounded-3xl border border-[#C9A227]/30 bg-white/80 backdrop-blur-md p-8 shadow-sm"
                >
                  {stat?.image?.assetUrl && (
                    <img
                      src={stat.image.assetUrl}
                      alt={stat.label || "Metric"}
                      className="mb-6 h-32 w-full rounded-2xl object-cover"
                    />
                  )}
                  <p className="font-display text-4xl text-[#C9A227] md:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.15em] text-[#111111]/60 font-semibold">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function JourneyHero({ solution }) {
  const hero = solution.hero || {};
  
  // Safe image resolution for JourneyHero
  const imgSrc =
    extractSafeImageUrl(hero.image) ||
    extractSafeImageUrl(hero.imageUrl) ||
    extractSafeImageUrl(solution.image) ||
    extractSafeImageUrl(solution.heroImage) ||
    extractSafeImageUrl(solution.imageUrl) ||
    null;

  const hasImage = Boolean(imgSrc);

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-28 md:py-36 text-[#111111]">
      <PastelGridBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            hasImage ? "lg:grid-cols-12" : "max-w-5xl mx-auto text-center"
          }`}
        >
          {/* Left Text Column */}
          <div className={hasImage ? "lg:col-span-7 text-left" : "w-full"}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
              {hero.eyebrow || "Long-Term Partnership"}
            </p>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-[#111111]">
              {hero.headline || solution.name}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#111111]/75">
              {hero.description ||
                solution.description ||
                solution.shortDescription}
            </p>
            <div className={hasImage ? "flex justify-start" : "flex justify-center"}>
              <HeroButtons hero={hero} />
            </div>
          </div>

          {/* Right Image Column */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <div className="group relative w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-[#C9A227]/30 via-amber-200/30 to-purple-200/20 blur-2xl opacity-80 transition duration-500 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-[2rem] border border-[#C9A227]/40 bg-white/80 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[1.5rem] bg-[#FAF7F2]">
                    <Image
                      src={imgSrc}
                      alt={hero.headline || solution.name || "Journey visual"}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroButtons({ hero }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <Link
        href={hero?.primaryCta?.href || "/contact"}
        className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-7 py-3.5 text-sm font-semibold text-[#111111] transition-all hover:opacity-90 hover:shadow-lg shadow-[0_10px_30px_rgba(201,162,39,0.25)]"
      >
        {hero?.primaryCta?.label || "Book a Consultation"}{" "}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
      <Link
        href={hero?.secondaryCta?.href || "/case-studies"}
        className="inline-flex items-center rounded-full border border-[#111111]/20 px-7 py-3.5 text-sm font-semibold text-[#111111] transition hover:border-[#C9A227] hover:text-[#9A7625] bg-white/40 backdrop-blur-sm"
      >
        {hero?.secondaryCta?.label || "See our work"}
      </Link>
    </div>
  );
}

function HeroVisual({ solution }) {
  const image = solution?.hero?.image;
  const src =
    extractSafeImageUrl(image) ||
    extractSafeImageUrl(solution?.hero?.imageUrl) ||
    extractSafeImageUrl(solution?.image) ||
    null;

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[40px] bg-[#111111] shadow-2xl">
      {src ? (
        <Image
          src={src}
          alt={solution?.hero?.headline || solution?.title || "Solution visual"}
          fill
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover transition duration-700 hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#111111] to-[#222222]" />
      )}
      <div className="absolute inset-0 overflow-hidden rounded-[40px]">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/30" />
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/40" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227] shadow-[0_0_40px_10px_rgba(201,162,39,.35)]" />
      </div>
      <div className="absolute bottom-8 left-8 right-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
          Tendrils / {solution.category || solution.name}
        </p>
        <p className="mt-2 text-sm text-white/60">
          Digital architecture designed around your business.
        </p>
      </div>
    </div>
  );
}

function ArchitectureVisual() {
  const nodes = [
    { icon: Database, label: "ERP" },
    { icon: Network, label: "CRM" },
    { icon: Layers3, label: "PIM" },
    { icon: Workflow, label: "Commerce" },
  ];

  return (
    <div className="mt-20 grid gap-4 md:grid-cols-4">
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-3xl border border-[#C9A227]/30 bg-white/70 backdrop-blur-md p-7 shadow-sm"
          >
            <Icon className="h-6 w-6 text-[#C9A227]" />
            <p className="mt-5 font-display text-xl text-[#111111]">
              {node.label}
            </p>
            {index < nodes.length - 1 && (
              <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-[#C9A227]/50 md:block" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export function StatsSection({ stats }) {
  if (!stats || stats.length === 0) return null;

  const getGridCols = (count) => {
    if (count === 1) return "max-w-md mx-auto grid-cols-1";
    if (count === 2) return "max-w-3xl mx-auto grid-cols-1 md:grid-cols-2";
    if (count === 3) return "max-w-5xl mx-auto grid-cols-1 md:grid-cols-3";
    return "max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  };

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#121110] py-24 md:py-32 text-[#F5F2EC]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
            // Performance Metrics
          </p>
        </div>

        <div className={`grid gap-6 ${getGridCols(stats.length)}`}>
          {stats.map((stat, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={stat._key || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="
                  group relative flex flex-col items-center text-center justify-between
                  rounded-[2.5rem]
                  border border-white/10
                  bg-[#1A1816]/90
                  p-8 md:p-10
                  backdrop-blur-2xl
                  shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                  transition-all
                  duration-500
                  hover:border-[#C9A227]/50
                  hover:bg-[#201D1A]
                  hover:shadow-[0_25px_60px_rgba(201,162,39,0.12)]
                "
              >
                <div className="w-full flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-white/40 group-hover:text-[#C9A227] transition-colors">
                    // {formattedIndex}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-[#C9A227] shadow-[0_0_10px_rgba(201,162,39,0.6)]" />
                </div>

                <div className="my-8">
                  <p className="font-display text-5xl md:text-6xl text-[#C9A227] tracking-tight group-hover:scale-105 transition-transform">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70 leading-relaxed max-w-[200px] mx-auto">
                    {stat.label}
                  </p>
                </div>

                <div className="w-full pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                  <span className="h-px w-4 bg-[#C9A227]/50" />
                  <span>Verified Metric</span>
                  <span className="h-px w-4 bg-[#C9A227]/50" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;