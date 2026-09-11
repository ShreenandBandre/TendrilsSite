"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const PILLARS = [
  {
    key: "build",
    label: "Build",
    description: "Foundational experiences & core architectures.",
  },
  {
    key: "automate",
    label: "Automate",
    description: "Workflows & seamless integrations.",
  },
  {
    key: "scale",
    label: "Scale",
    description: "Enterprise infrastructure & high availability.",
  },
  {
    key: "grow",
    label: "Grow",
    description: "Performance & revenue engines.",
  },
  {
    key: "support",
    label: "Support",
    description: "Continuous optimization & partnership.",
  },
];

const fallbackServices = [
  {
    _id: "fallback-build",
    name: "Build",
    slug: "build",
    pillar: "build",
    shortDescription:
      "High-performance Shopify experiences engineered for modern digital commerce.",
    heroImageUrl: null,
  },
  {
    _id: "fallback-automate",
    name: "Automate",
    slug: "automate",
    pillar: "automate",
    shortDescription:
      "Connect systems, workflows, and data to eliminate operational friction.",
    heroImageUrl: null,
  },
  {
    _id: "fallback-scale",
    name: "Scale",
    slug: "scale",
    pillar: "scale",
    shortDescription:
      "Commerce infrastructure designed to support ambitious enterprise growth.",
    heroImageUrl: null,
  },
  {
    _id: "fallback-grow",
    name: "Grow",
    slug: "grow",
    pillar: "grow",
    shortDescription:
      "Turn your storefront and digital ecosystem into a measurable growth engine.",
    heroImageUrl: null,
  },
  {
    _id: "fallback-support",
    name: "Support",
    slug: "support",
    pillar: "support",
    shortDescription:
      "Continuous optimisation, maintenance, and strategic support for your commerce operation.",
    heroImageUrl: null,
  },
];

/* =========================================================
   NORMALIZE & HELPERS
========================================================= */

function normalize(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[_\-\s]+/g, "");
}

function getSlug(service) {
  if (!service) return "";
  if (typeof service.slug === "string") return service.slug.trim();
  if (service.slug?.current) return String(service.slug.current).trim();
  return "";
}

function getPillar(service) {
  if (!service) return "";
  if (typeof service.pillar === "string" && service.pillar.trim()) return service.pillar;
  if (typeof service.pillar?.key === "string") return service.pillar.key;
  if (typeof service.pillar?.slug === "string") return service.pillar.slug;
  if (typeof service.pillar?.current === "string") return service.pillar.current;
  return "";
}

function hasParent(service) {
  if (!service) return false;
  if (service.parent?._ref || service.parent?._id || service.parentId?._ref) return true;
  if (typeof service.parentId === "string" && service.parentId.trim()) return true;
  return false;
}

function getServiceImage(service) {
  if (!service) return null;
  if (typeof service.heroImageUrl === "string" && service.heroImageUrl.trim()) return service.heroImageUrl;
  if (typeof service.hero?.image?.assetUrl === "string" && service.hero.image.assetUrl.trim()) return service.hero.image.assetUrl;
  if (typeof service.heroImage?.assetUrl === "string" && service.heroImage.assetUrl.trim()) return service.heroImage.assetUrl;
  if (typeof service.heroImage?.asset?.url === "string" && service.heroImage.asset.url.trim()) return service.heroImage.asset.url;
  if (typeof service.hero?.image?.asset?.url === "string" && service.hero.image.asset.url.trim()) return service.hero.image.asset.url;
  return null;
}

function getServiceForPillar(services, pillar) {
  if (!Array.isArray(services) || !services.length) return null;
  const targetPillar = normalize(pillar);
  const matching = services.filter((s) => normalize(getPillar(s)) === targetPillar);
  if (!matching.length) return null;

  const featuredRoot = matching.find((s) => s?.featured === true && !hasParent(s));
  if (featuredRoot) return featuredRoot;
  const featured = matching.find((s) => s?.featured === true);
  if (featured) return featured;
  const rootService = matching.find((s) => !hasParent(s));
  if (rootService) return rootService;
  return matching[0];
}

/* =========================================================
   COMPONENT: SERVICES GRID WITH INTERACTIVE CURSOR GLOW
========================================================= */

export default function ServicesGrid({ services = [] }) {
  const hasCmsServices = Array.isArray(services) && services.length > 0;
  const sourceServices = hasCmsServices ? services : fallbackServices;

  const cards = PILLARS.map((pillar) => {
    const service = getServiceForPillar(sourceServices, pillar.key);
    const slug = getSlug(service);
    return {
      ...pillar,
      service,
      title: service?.name || pillar.label,
      slug: slug || pillar.key,
      summary:
        service?.shortDescription ||
        service?.description ||
        pillar.description,
      image: getServiceImage(service),
      featured: Boolean(service?.featured),
    };
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = cards[activeIndex];
  const activeHref = activeItem.slug ? `/services/${activeItem.slug}` : "/services";

  const leftCards = cards.slice(0, 3);
  const rightCards = cards.slice(3, 5);

  // Mouse position spring physics for smooth movable cursor background glow
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-500);
    mouseY.set(-500);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen bg-[#070708] py-28 text-[#EDEAE2] md:py-36 lg:py-44 selection:bg-[#D4AF37]/30 overflow-hidden"
    >
      
      {/* =====================================================
          INTERACTIVE DYNAMIC CURSOR GLOW ORB (TIGDUM APPLIED)
      ===================================================== */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          background: useMotionValue`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(212,175,55,0.18), rgba(120,80,20,0.06) 40%, transparent 75%)`,
        }}
      />

      {/* Static Background Ambient Glow for depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[1000px] rounded-full bg-[#D4AF37]/[0.04] blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">

        {/* SECTION HEADER */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-md">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              Curated Studio Capabilities
            </span>
          </div>
          <h2 className="font-display text-5xl font-light tracking-tight text-white sm:text-7xl md:text-8xl leading-[1.05]">
            Excellence in <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">Execution.</span>
          </h2>
        </div>

        {/* MAIN LUXURY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT SIDE STEPS (01, 02, 03) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {leftCards.map((card, idx) => {
              const actualIndex = idx;
              const isActive = activeIndex === actualIndex;
              const number = String(actualIndex + 1).padStart(2, "0");

              return (
                <div
                  key={card.key}
                  onClick={() => setActiveIndex(actualIndex)}
                  onMouseEnter={() => setActiveIndex(actualIndex)}
                  className={`group cursor-pointer rounded-2xl p-7 transition-all duration-500 border ${
                    isActive
                      ? "bg-white/[0.07] border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(212,175,55,0.12)] backdrop-blur-xl"
                      : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-sm tracking-widest ${isActive ? "text-[#D4AF37] font-bold" : "text-white/40"}`}>
                      {number}
                    </span>
                    <span className={`h-1.5 rounded-full transition-all duration-500 ${isActive ? "w-10 bg-[#D4AF37]" : "w-4 bg-white/20"}`} />
                  </div>

                  <h3 className={`font-display text-2xl font-light tracking-tight transition-colors ${isActive ? "text-white font-normal" : "text-white/70 group-hover:text-white"}`}>
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm font-light leading-relaxed text-[#A8A196] line-clamp-2">
                    {card.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ================= CENTER LUXURY SHOWCASE STAGE ================= */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0D0C0B]/90 shadow-[0_50px_140px_rgba(0,0,0,0.9)] p-8 md:p-10 backdrop-blur-2xl">
              
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Phase 0{activeIndex + 1} // {activeItem.label}
                </span>
                {activeItem.featured && (
                  <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    Featured Discipline
                  </span>
                )}
              </div>

              {/* DYNAMIC HERO IMAGE STAGE */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#161514]">
                <AnimatePresence mode="wait">
                  {activeItem.image ? (
                    <motion.div
                      key={`img-${activeItem.key}`}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeItem.image}
                        alt={activeItem.title}
                        fill
                        unoptimized
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-transparent to-transparent opacity-80" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`fallback-img-${activeItem.key}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#161514] to-[#0A0908]"
                    >
                      <span className="font-display text-7xl font-light text-white/10">
                        0{activeIndex + 1}
                      </span>
                      <span className="mt-4 font-display text-xl text-white/90">
                        {activeItem.title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CONTENT INFO */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeItem.key}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mt-8 space-y-4"
                >
                  <h3 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm md:text-base font-light leading-relaxed text-[#A8A196]">
                    {activeItem.summary}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* FOOTER CTA */}
              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={activeHref}
                  className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] transition-colors hover:text-white"
                >
                  <span>Explore Discipline</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/40 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black">
                    <ArrowUpRight size={15} />
                  </span>
                </Link>

                <span className="text-xs text-white/30 uppercase tracking-widest font-mono">
                  Studio Asset
                </span>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE STEPS (04, 05) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {rightCards.map((card, idx) => {
              const actualIndex = idx + 3;
              const isActive = activeIndex === actualIndex;
              const number = String(actualIndex + 1).padStart(2, "0");

              return (
                <div
                  key={card.key}
                  onClick={() => setActiveIndex(actualIndex)}
                  onMouseEnter={() => setActiveIndex(actualIndex)}
                  className={`group cursor-pointer rounded-2xl p-7 transition-all duration-500 border ${
                    isActive
                      ? "bg-white/[0.07] border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(212,175,55,0.12)] backdrop-blur-xl"
                      : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-sm tracking-widest ${isActive ? "text-[#D4AF37]" : "text-white/40"}`}>
                      {number}
                    </span>
                    <span className={`h-1.5 rounded-full transition-all duration-500 ${isActive ? "w-10 bg-[#D4AF37]" : "w-4 bg-white/20"}`} />
                  </div>

                  <h3 className={`font-display text-2xl font-light tracking-tight transition-colors ${isActive ? "text-white font-normal" : "text-white/70 group-hover:text-white"}`}>
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm font-light leading-relaxed text-[#A8A196] line-clamp-2">
                    {card.summary}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
















// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { ArrowUpRight } from "lucide-react";

// const PILLARS = [
//   {
//     key: "build",
//     label: "Build",
//     description: "Foundational experiences & core architectures.",
//   },
//   {
//     key: "automate",
//     label: "Automate",
//     description: "Workflows & seamless integrations.",
//   },
//   {
//     key: "scale",
//     label: "Scale",
//     description: "Enterprise infrastructure & high availability.",
//   },
//   {
//     key: "grow",
//     label: "Grow",
//     description: "Performance & revenue engines.",
//   },
//   {
//     key: "support",
//     label: "Support",
//     description: "Continuous optimization & partnership.",
//   },
// ];

// const fallbackServices = [
//   {
//     _id: "fallback-build",
//     name: "Build",
//     slug: "build",
//     pillar: "build",
//     shortDescription:
//       "High-performance Shopify experiences engineered for modern digital commerce.",
//     heroImageUrl: null,
//   },
//   {
//     _id: "fallback-automate",
//     name: "Automate",
//     slug: "automate",
//     pillar: "automate",
//     shortDescription:
//       "Connect systems, workflows, and data to eliminate operational friction.",
//     heroImageUrl: null,
//   },
//   {
//     _id: "fallback-scale",
//     name: "Scale",
//     slug: "scale",
//     pillar: "scale",
//     shortDescription:
//       "Commerce infrastructure designed to support ambitious enterprise growth.",
//     heroImageUrl: null,
//   },
//   {
//     _id: "fallback-grow",
//     name: "Grow",
//     slug: "grow",
//     pillar: "grow",
//     shortDescription:
//       "Turn your storefront and digital ecosystem into a measurable growth engine.",
//     heroImageUrl: null,
//   },
//   {
//     _id: "fallback-support",
//     name: "Support",
//     slug: "support",
//     pillar: "support",
//     shortDescription:
//       "Continuous optimisation, maintenance, and strategic support for your commerce operation.",
//     heroImageUrl: null,
//   },
// ];

// /* =========================================================
//    NORMALIZE
// ========================================================= */

// function normalize(value = "") {
//   return String(value)
//     .trim()
//     .toLowerCase()
//     .replace(/[_\-\s]+/g, "");
// }

// /* =========================================================
//    SLUG
// ========================================================= */

// function getSlug(service) {
//   if (!service) return "";

//   if (typeof service.slug === "string") {
//     return service.slug.trim();
//   }

//   if (service.slug?.current) {
//     return String(service.slug.current).trim();
//   }

//   return "";
// }

// /* =========================================================
//    PILLAR
// ========================================================= */

// function getPillar(service) {
//   if (!service) return "";

//   // Direct pillar field
//   if (typeof service.pillar === "string" && service.pillar.trim()) {
//     return service.pillar;
//   }

//   // In case pillar comes through a nested reference/object
//   if (typeof service.pillar?.key === "string") {
//     return service.pillar.key;
//   }

//   if (typeof service.pillar?.slug === "string") {
//     return service.pillar.slug;
//   }

//   if (typeof service.pillar?.current === "string") {
//     return service.pillar.current;
//   }

//   return "";
// }

// /* =========================================================
//    PARENT
// ========================================================= */

// function hasParent(service) {
//   if (!service) return false;

//   // Query may expose parent._ref
//   if (service.parent?._ref) return true;

//   // Query may expose parent object
//   if (service.parent?._id) return true;

//   // Query may expose parentId directly
//   if (service.parentId?._ref) return true;

//   if (typeof service.parentId === "string" && service.parentId.trim()) {
//     return true;
//   }

//   return false;
// }

// /* =========================================================
//    IMAGE
// ========================================================= */

// function getServiceImage(service) {
//   if (!service) return null;

//   // Query-projected URL
//   if (
//     typeof service.heroImageUrl === "string" &&
//     service.heroImageUrl.trim()
//   ) {
//     return service.heroImageUrl;
//   }

//   // Direct hero image projected from Sanity
//   if (
//     typeof service.hero?.image?.assetUrl === "string" &&
//     service.hero.image.assetUrl.trim()
//   ) {
//     return service.hero.image.assetUrl;
//   }

//   // heroImage.assetUrl
//   if (
//     typeof service.heroImage?.assetUrl === "string" &&
//     service.heroImage.assetUrl.trim()
//   ) {
//     return service.heroImage.assetUrl;
//   }

//   // heroImage.asset.url
//   if (
//     typeof service.heroImage?.asset?.url === "string" &&
//     service.heroImage.asset.url.trim()
//   ) {
//     return service.heroImage.asset.url;
//   }

//   // hero.image.asset.url
//   if (
//     typeof service.hero?.image?.asset?.url === "string" &&
//     service.hero.image.asset.url.trim()
//   ) {
//     return service.hero.image.asset.url;
//   }

//   return null;
// }

// /* =========================================================
//    FIND SERVICE FOR PILLAR

//    Priority:
//    1. Featured root service
//    2. Any featured service
//    3. Root service
//    4. First matching service
// ========================================================= */

// function getServiceForPillar(services, pillar) {
//   if (!Array.isArray(services) || !services.length) {
//     return null;
//   }

//   const targetPillar = normalize(pillar);

//   const matching = services.filter((service) => {
//     return normalize(getPillar(service)) === targetPillar;
//   });

//   if (!matching.length) {
//     return null;
//   }

//   const featuredRoot = matching.find(
//     (service) => service?.featured === true && !hasParent(service)
//   );

//   if (featuredRoot) {
//     return featuredRoot;
//   }

//   const featured = matching.find(
//     (service) => service?.featured === true
//   );

//   if (featured) {
//     return featured;
//   }

//   const rootService = matching.find(
//     (service) => !hasParent(service)
//   );

//   if (rootService) {
//     return rootService;
//   }

//   return matching[0];
// }

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function ServicesGrid({ services = [] }) {
//   const hasCmsServices =
//     Array.isArray(services) && services.length > 0;

//   const sourceServices = hasCmsServices
//     ? services
//     : fallbackServices;

//   const cards = PILLARS.map((pillar) => {
//     const service = getServiceForPillar(
//       sourceServices,
//       pillar.key
//     );

//     const slug = getSlug(service);

//     return {
//       ...pillar,
//       service,

//       title: service?.name || pillar.label,

//       slug: slug || pillar.key,

//       summary:
//         service?.shortDescription ||
//         service?.description ||
//         pillar.description,

//       image: getServiceImage(service),

//       featured: Boolean(service?.featured),

//       isFallback: !service,
//     };
//   });

//   return (
//     <section className="relative overflow-visible bg-[#141210] py-20 text-[#F5F1E9] md:py-28 lg:py-32">
//       {/* Background Ambience */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div
//           className="absolute inset-0 opacity-[0.035]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
//             backgroundSize: "80px 80px",
//           }}
//         />

//         <div className="absolute left-[-10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[#D4AF37]/[0.06] blur-[140px]" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-[1300px] px-6 md:px-10 lg:px-12">

//         {/* HEADER */}
//         <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
//           <div>
//             <div className="mb-6 flex items-center gap-3">
//               <span className="h-px w-8 bg-[#D4AF37]" />

//               <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
//                 Our capabilities
//               </span>
//             </div>

//             <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
//               One commerce system.{" "}
//               <span className="block font-normal italic text-[#D4AF37]/90">
//                 Every discipline.
//               </span>
//             </h2>
//           </div>

//           <p className="max-w-md text-sm leading-relaxed text-[#D3CBC0] md:text-base">
//             We combine strategy, technology, automation and growth into a
//             connected digital commerce ecosystem — built to perform today
//             and evolve tomorrow.
//           </p>
//         </div>

//         {/* STICKY STACK CARDS */}
//         <div className="relative mt-16">
//           {cards.map((card, index) => {
//             const number = String(index + 1).padStart(2, "0");

//             /*
//              * IMPORTANT:
//              * Previously every card linked to /services.
//              *
//              * Now the actual Sanity slug is used.
//              */
//             const href = card.slug
//               ? `/services/${card.slug}`
//               : "/services";

//             return (
//               <div
//                 key={`${card.key}-${card.service?._id || "fallback"}`}
//                 className="sticky"
//                 style={{
//                   top: `calc(100px + ${index * 16}px)`,
//                   zIndex: index + 1,
//                   marginBottom: "12vh",
//                 }}
//               >
//                 <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#1A1614] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#D4AF37]/50">

//                   <Link
//                     href={href}
//                     className="block"
//                     aria-label={`Explore ${card.title}`}
//                   >
//                     <div className="grid min-h-[340px] md:grid-cols-[64px_1fr_38%_64px]">

//                       {/* NUMBER */}
//                       <div className="hidden border-r border-white/10 p-6 md:flex md:items-start md:justify-center">
//                         <span className="font-mono text-xs tracking-[0.2em] text-[#D4AF37]">
//                           {number}
//                         </span>
//                       </div>

//                       {/* CONTENT */}
//                       <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
//                         <div>
//                           <div className="flex items-center gap-3">
//                             <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
//                               {card.label}
//                             </span>

//                             {card.featured && (
//                               <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2 py-0.5 text-[8px] uppercase tracking-widest text-[#D4AF37]">
//                                 Featured
//                               </span>
//                             )}
//                           </div>

//                           <h3 className="mt-3 font-display text-3xl tracking-tight text-white transition-colors duration-300 group-hover:text-[#D4AF37] sm:text-4xl md:text-5xl">
//                             {card.title}
//                           </h3>

//                           <p className="mt-3 max-w-lg text-sm leading-6 text-[#C2B8A8]">
//                             {card.summary}
//                           </p>
//                         </div>

//                         <div className="mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
//                           <span>
//                             Explore {card.title}
//                           </span>

//                           <span className="h-px w-6 bg-[#D4AF37]/40 transition-all duration-300 group-hover:w-12" />
//                         </div>
//                       </div>

//                       {/* IMAGE */}
//                       <div className="relative aspect-[16/9] min-h-[220px] overflow-hidden border-y border-white/10 bg-[#11100F] md:aspect-square md:min-h-0 md:border-y-0 md:border-l">
//                         {card.image ? (
//                           <Image
//                             src={card.image}
//                             alt={`${card.title} service`}
//                             fill
//                             unoptimized
//                             priority={index === 0}
//                             sizes="(max-width: 768px) 100vw, 35vw"
//                             className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <span className="font-display text-8xl leading-none text-[#D4AF37]/10">
//                               {card.label.charAt(0)}
//                             </span>

//                             {!card.isFallback && (
//                               <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
//                                 No image
//                               </span>
//                             )}
//                           </div>
//                         )}

//                         <div className="absolute inset-0 bg-gradient-to-r from-[#1A1614]/20 via-transparent to-black/20" />

//                         <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md">
//                           {card.label}
//                         </span>
//                       </div>

//                       {/* ARROW */}
//                       <div className="flex items-center justify-center border-l border-white/10 bg-[#171311]/50 p-4 md:p-0">
//                         <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black">
//                           <ArrowUpRight size={16} />
//                         </span>
//                       </div>
//                     </div>
//                   </Link>
//                 </article>
//               </div>
//             );
//           })}

//           {/* Extra scroll runway */}
//           <div className="h-[30vh]" />
//         </div>
//       </div>
//     </section>
//   );
// }