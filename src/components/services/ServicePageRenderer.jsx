"use client";

import ServiceHero from "./hero/ServiceHero";
import StatsSection from "./sections/StatsSection";
import SectionRenderer from "./sections/SectionRenderer";
import SplitContent from "./sections/SplitContent";
import RelatedServices from "./RelatedServices";
import ChildPagesSection from "@/components/content/ChildPagesSection";
import ServiceCTA from "./ServiceCTA";

export default function ServicePageRenderer({ service }) {
  if (!service) return null;

  const pageStyle = service.pageStyle || "editorial";
  const sections = service.sections || [];

  const renderedSections = [];
  let splitGroup = [];

  const flushSplitGroup = () => {
    if (!splitGroup.length) return;

    renderedSections.push(
      <div
        key={`split-stack-${splitGroup[0].index}`}
        className="relative"
      >
        {splitGroup.map((item, stackIndex) => (
          <SplitContent
            key={item.section._key || `split-${item.index}`}
            section={item.section}
            index={stackIndex}
            stackIndex={stackIndex}
            stackLength={splitGroup.length}
          />
        ))}
      </div>
    );

    splitGroup = [];
  };

  sections.forEach((section, index) => {
    if (section._type === "splitContent") {
      splitGroup.push({
        section,
        index,
      });
    } else {
      flushSplitGroup();

      renderedSections.push(
        <SectionRenderer
          key={`${section._type}-${index}`}
          section={section}
          index={index}
          pageStyle={pageStyle}
        />
      );
    }
  });

  flushSplitGroup();

  return (
    <main className="bg-[#F7F2E8] text-[#111111]">
      <ServiceHero
        service={service}
        style={pageStyle}
      />

      {service.stats?.length > 0 && (
        <StatsSection stats={service.stats} />
      )}

      <div>
        {renderedSections}
      </div>

      <ChildPagesSection items={service.children} type="service" parentSlug={service.slug} />
      <RelatedServices services={service.relatedServices} />

      <ServiceCTA />
    </main>
  );
}


// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   ArrowUpRight,
//   Check,
//   ChevronDown,
//   Database,
//   Layers3,
//   Network,
//   Sparkles,
//   TrendingUp,
//   Workflow,
// } from "lucide-react";

// import { useState } from "react";

// /* =========================================================
//    MAIN RENDERER
// ========================================================= */

// export default function ServicePageRenderer({ service }) {
//   if (!service) {
//     return null;
//   }

//   const pageStyle = service.pageStyle || "editorial";

//   return (
//     <main className="bg-[#F7F2E8] text-[#111111]">

//       <ServiceHero
//         service={service}
//         style={pageStyle}
//       />

//       {service.stats?.length > 0 && (
//         <StatsSection stats={service.stats} />
//       )}

//       <div>
//         {service.sections?.map((section, index) => (
//           <SectionRenderer
//             key={`${section._type}-${index}`}
//             section={section}
//             index={index}
//             pageStyle={pageStyle}
//           />
//         ))}
//       </div>

//       <RelatedServices
//         services={service.relatedServices}
//       />

//       <ServiceCTA />

//     </main>
//   );
// }

// /* =========================================================
//    HERO
// ========================================================= */

// function ServiceHero({ service, style }) {
//   if (style === "systems") {
//     return <SystemsHero service={service} />;
//   }

//   if (style === "innovation") {
//     return <InnovationHero service={service} />;
//   }

//   if (style === "growth") {
//     return <GrowthHero service={service} />;
//   }

//   if (style === "journey") {
//     return <JourneyHero service={service} />;
//   }

//   return <EditorialHero service={service} />;
// }

// /* =========================================================
//    EDITORIAL HERO
// ========================================================= */

// function EditorialHero({ service }) {
//   const hero = service.hero || {};

//   return (
//     <section className="relative overflow-hidden border-b border-[#111111]/10 px-6 py-28 md:py-40">

//       <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">

//         <div>

//           <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
//             {hero.eyebrow || service.pillar}
//           </p>

//           <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">

//             {hero.headline || service.name}

//             {hero.highlight && (
//               <>
//                 {" "}
//                 <span className="text-[#C9A227]">
//                   {hero.highlight}
//                 </span>
//               </>
//             )}

//           </h1>

//           <p className="mt-8 max-w-2xl text-lg leading-8 text-[#111111]/65">
//             {hero.description ||
//               service.description ||
//               service.shortDescription}
//           </p>

//           <HeroButtons hero={hero} />

//         </div>

//         <HeroVisual service={service} />

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    SYSTEMS HERO
// ========================================================= */

// function SystemsHero({ service }) {
//   const hero = service.hero || {};

//   return (
//     <section className="relative overflow-hidden bg-[#111111] px-6 py-28 text-[#F7F2E8] md:py-36">

//       <div className="absolute inset-0 opacity-20">

//         <div
//           className="h-full w-full"
//           style={{
//             backgroundImage: `
//               linear-gradient(
//                 rgba(201,162,39,.2) 1px,
//                 transparent 1px
//               ),
//               linear-gradient(
//                 90deg,
//                 rgba(201,162,39,.2) 1px,
//                 transparent 1px
//               )
//             `,
//             backgroundSize: "70px 70px",
//           }}
//         />

//       </div>

//       <div className="relative mx-auto max-w-7xl">

//         <div className="max-w-4xl">

//           <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
//             {hero.eyebrow || "Systems & Integration"}
//           </p>

//           <h1 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">

//             {hero.headline || service.name}

//           </h1>

//           <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">
//             {hero.description ||
//               service.description ||
//               service.shortDescription}
//           </p>

//           <HeroButtons hero={hero} dark />

//         </div>

//         <ArchitectureVisual />

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    INNOVATION HERO
// ========================================================= */

// function InnovationHero({ service }) {
//   const hero = service.hero || {};

//   return (
//     <section className="relative overflow-hidden bg-[#111111] px-6 py-28 text-white md:py-40">

//       <motion.div
//         animate={{
//           scale: [1, 1.12, 1],
//           opacity: [0.15, 0.25, 0.15],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//         }}
//         className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/20 blur-[120px]"
//       />

//       <div className="relative mx-auto max-w-5xl text-center">

//         <Sparkles className="mx-auto h-7 w-7 text-[#C9A227]" />

//         <p className="mt-6 text-xs font-bold uppercase tracking-[0.35em] text-[#C9A227]">
//           {hero.eyebrow || "Commerce Intelligence"}
//         </p>

//         <h1 className="mt-6 font-display text-5xl leading-none md:text-8xl">

//           {hero.headline || service.name}

//         </h1>

//         <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60">
//           {hero.description ||
//             service.description ||
//             service.shortDescription}
//         </p>

//         <HeroButtons hero={hero} dark />

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    GROWTH HERO
// ========================================================= */

// function GrowthHero({ service }) {
//   const hero = service.hero || {};

//   return (
//     <section className="px-6 py-28 md:py-36">

//       <div className="mx-auto max-w-7xl">

//         <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">

//           <div>

//             <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
//               {hero.eyebrow || "Growth"}
//             </p>

//             <h1 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
//               {hero.headline || service.name}
//             </h1>

//             <p className="mt-7 max-w-xl text-lg leading-8 text-[#111111]/60">
//               {hero.description ||
//                 service.description ||
//                 service.shortDescription}
//             </p>

//             <HeroButtons hero={hero} />

//           </div>

//           <div className="grid grid-cols-2 gap-4">

//             {(service.stats || []).slice(0, 4).map((stat, index) => (

//               <motion.div
//                 key={index}
//                 whileHover={{ y: -5 }}
//                 className="rounded-3xl border border-[#111111]/10 bg-white p-8"
//               >

//                 <p className="font-display text-4xl text-[#C9A227] md:text-6xl">
//                   {stat.value}
//                 </p>

//                 <p className="mt-3 text-sm uppercase tracking-[0.15em] text-[#111111]/50">
//                   {stat.label}
//                 </p>

//               </motion.div>

//             ))}

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    JOURNEY HERO
// ========================================================= */

// function JourneyHero({ service }) {
//   const hero = service.hero || {};

//   return (
//     <section className="px-6 py-28 md:py-36">

//       <div className="mx-auto max-w-5xl text-center">

//         <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
//           {hero.eyebrow || "Long-Term Partnership"}
//         </p>

//         <h1 className="mt-6 font-display text-5xl md:text-7xl">
//           {hero.headline || service.name}
//         </h1>

//         <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#111111]/60">
//           {hero.description ||
//             service.description ||
//             service.shortDescription}
//         </p>

//         <HeroButtons hero={hero} />

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    HERO BUTTONS
// ========================================================= */

// function HeroButtons({ hero, dark = false }) {
//   return (
//     <div className="mt-10 flex flex-wrap gap-4">

//       <Link
//         href={hero?.primaryCta?.href || "/contact"}
//         className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-7 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#E2C66B]"
//       >
//         {hero?.primaryCta?.label || "Book a Consultation"}
//         <ArrowUpRight className="h-4 w-4" />
//       </Link>

//       <Link
//         href={hero?.secondaryCta?.href || "/case-studies"}
//         className={`inline-flex items-center rounded-full border px-7 py-3.5 text-sm font-semibold transition ${
//           dark
//             ? "border-white/20 text-white hover:border-[#C9A227] hover:text-[#C9A227]"
//             : "border-[#111111]/15 text-[#111111] hover:border-[#C9A227] hover:text-[#9A7625]"
//         }`}
//       >
//         {hero?.secondaryCta?.label || "See our work"}
//       </Link>

//     </div>
//   );
// }

// /* =========================================================
//    HERO VISUAL
// ========================================================= */

// function HeroVisual({ service }) {
//   return (
//     <div className="relative min-h-[420px]">

//       <div className="absolute inset-0 rounded-[40px] bg-[#111111]" />

//       <div className="absolute inset-0 overflow-hidden rounded-[40px]">

//         <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/30" />

//         <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/40" />

//         <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227] shadow-[0_0_40px_10px_rgba(201,162,39,.35)]" />

//       </div>

//       <div className="absolute bottom-8 left-8 right-8">

//         <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
//           Tendrils / {service.pillar}
//         </p>

//         <p className="mt-2 text-sm text-white/50">
//           Commerce architecture designed around your business.
//         </p>

//       </div>

//     </div>
//   );
// }

// /* =========================================================
//    ARCHITECTURE VISUAL
// ========================================================= */

// function ArchitectureVisual() {
//   const nodes = [
//     {
//       icon: Database,
//       label: "ERP",
//     },
//     {
//       icon: Network,
//       label: "CRM",
//     },
//     {
//       icon: Layers3,
//       label: "PIM",
//     },
//     {
//       icon: Workflow,
//       label: "Shopify",
//     },
//   ];

//   return (
//     <div className="mt-20 grid gap-4 md:grid-cols-4">

//       {nodes.map((node, index) => {

//         const Icon = node.icon;

//         return (
//           <motion.div
//             key={node.label}
//             initial={{
//               opacity: 0,
//               y: 20,
//             }}
//             whileInView={{
//               opacity: 1,
//               y: 0,
//             }}
//             viewport={{
//               once: true,
//             }}
//             transition={{
//               delay: index * 0.1,
//             }}
//             className="relative rounded-2xl border border-[#C9A227]/20 bg-white/[0.04] p-7"
//           >

//             <Icon className="h-6 w-6 text-[#C9A227]" />

//             <p className="mt-5 font-display text-xl">
//               {node.label}
//             </p>

//             {index < nodes.length - 1 && (
//               <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-[#C9A227]/50 md:block" />
//             )}

//           </motion.div>
//         );
//       })}

//     </div>
//   );
// }

// /* =========================================================
//    STATS
// ========================================================= */

// function StatsSection({ stats }) {
//   return (
//     <section className="border-b border-[#111111]/10 bg-white px-6 py-12">

//       <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">

//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="text-center md:border-r md:border-[#111111]/10 last:md:border-0"
//           >

//             <p className="font-display text-4xl text-[#C9A227] md:text-5xl">
//               {stat.value}
//             </p>

//             <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111]/50">
//               {stat.label}
//             </p>

//           </div>
//         ))}

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    SECTION ROUTER
// ========================================================= */

// function SectionRenderer({
//   section,
//   index,
//   pageStyle,
// }) {
//   switch (section._type) {

//     case "featureGrid":
//       return (
//         <FeatureGrid
//           section={section}
//           index={index}
//         />
//       );

//     case "timeline":
//       return (
//         <TimelineSection
//           section={section}
//           index={index}
//         />
//       );

//     case "splitContent":
//       return (
//         <SplitContent
//           section={section}
//           index={index}
//         />
//       );

//     case "cards":
//       return (
//         <CardsSection
//           section={section}
//           index={index}
//         />
//       );

//     case "process":
//       return (
//         <ProcessSection
//           section={section}
//           index={index}
//         />
//       );

//     case "faq":
//       return (
//         <FAQSection
//           section={section}
//           index={index}
//         />
//       );

//     case "quote":
//       return (
//         <QuoteSection
//           section={section}
//           index={index}
//         />
//       );

//     default:
//       return null;
//   }
// }

// /* =========================================================
//    FEATURE GRID — EDITORIAL / ASYMMETRIC
// ========================================================= */

// function FeatureGrid({ section }) {
//   const items = section.items || [];

//   if (!items.length) {
//     return null;
//   }

//   return (
//     <section className="px-6 py-24 md:py-32">
//       <div className="mx-auto max-w-7xl">

//         <SectionHeading
//           heading={section.heading}
//           description={section.description}
//         />

//         <div className="mt-14 grid gap-4 md:grid-cols-2">
//           {items.map((item, index) => {
//             const number = item.number || String(index + 1).padStart(2, "0");

//             /*
//               Editorial pattern:

//               4 items:
//               01 large | 02 normal
//               03 normal | 04 large

//               5 items:
//               01 large | 02 normal
//               03 normal | 04 large
//               05 large across

//               6 items:
//               01 large | 02 normal
//               03 normal | 04 large
//               05 large | 06 normal

//               This keeps odd/even counts looking intentional.
//             */

//             const isLarge =
//               index % 4 === 0 ||
//               index % 4 === 3 ||
//               (items.length % 2 !== 0 && index === items.length - 1);

//             const isLastOdd =
//               items.length % 2 !== 0 &&
//               index === items.length - 1;

//             return (
//               <motion.article
//                 key={item._key || index}
//                 initial={{ opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{
//                   duration: 0.55,
//                   delay: Math.min(index * 0.06, 0.3),
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//                 whileHover={{ y: -5 }}
//                 className={`
//                   group relative overflow-hidden rounded-[2rem]
//                   border border-[#111111]/10
//                   bg-[#F7F2E8]
//                   transition-all duration-500
//                   hover:border-[#C9A227]/40
//                   hover:bg-white
//                   hover:shadow-[0_20px_60px_rgba(17,17,17,0.08)]
//                   ${isLastOdd ? "md:col-span-2" : ""}
//                   ${isLarge ? "min-h-[330px] md:min-h-[390px]" : "min-h-[280px] md:min-h-[320px]"}
//                 `}
//               >

//                 {/* Gold hover line */}
//                 <span
//                   className="
//                     absolute left-0 top-0 h-[3px] w-0
//                     bg-[#C9A227]
//                     transition-all duration-700
//                     group-hover:w-full
//                   "
//                 />

//                 {/* Soft background glow */}
//                 <span
//                   className="
//                     pointer-events-none absolute
//                     -right-20 -top-20
//                     h-56 w-56
//                     rounded-full
//                     bg-[#C9A227]/0
//                     blur-3xl
//                     transition-all duration-700
//                     group-hover:bg-[#C9A227]/[0.07]
//                   "
//                 />

//                 <div className="relative flex h-full flex-col justify-between p-7 md:p-9">

//                   {/* Top */}
//                   <div className="flex items-start justify-between gap-6">

//                     <span
//                       className="
//                         font-display text-5xl leading-none
//                         text-[#111111]/10
//                         transition-colors duration-500
//                         group-hover:text-[#C9A227]/30
//                       "
//                     >
//                       {number}
//                     </span>

//                     <span
//                       className="
//                         flex h-9 w-9 shrink-0 items-center justify-center
//                         rounded-full
//                         border border-[#111111]/10
//                         text-sm text-[#111111]/35
//                         transition-all duration-500
//                         group-hover:border-[#C9A227]/50
//                         group-hover:bg-[#C9A227]
//                         group-hover:text-[#111111]
//                       "
//                     >
//                       ↗
//                     </span>
//                   </div>

//                   {/* Content */}
//                   <div className="mt-14 max-w-2xl">

//                     <h3
//                       className={`
//                         font-display leading-[1.05]
//                         tracking-tight
//                         transition-colors duration-500
//                         group-hover:text-[#9A7625]
//                         ${
//                           isLarge
//                             ? "text-3xl md:text-4xl"
//                             : "text-2xl md:text-3xl"
//                         }
//                       `}
//                     >
//                       {item.title}
//                     </h3>

//                     {item.description && (
//                       <p
//                         className="
//                           mt-4 max-w-xl
//                           text-sm leading-6
//                           text-[#111111]/55
//                           transition-colors duration-500
//                           group-hover:text-[#111111]/70
//                         "
//                       >
//                         {item.description}
//                       </p>
//                     )}
//                   </div>

//                   {/* Bottom accent */}
//                   <div className="mt-8 flex items-center gap-3">

//                     <span
//                       className="
//                         h-px w-8
//                         bg-[#C9A227]/40
//                         transition-all duration-500
//                         group-hover:w-16
//                         group-hover:bg-[#C9A227]
//                       "
//                     />

//                     <span
//                       className="
//                         text-[10px]
//                         font-bold
//                         uppercase
//                         tracking-[0.25em]
//                         text-[#111111]/30
//                         transition-colors duration-500
//                         group-hover:text-[#9A7625]
//                       "
//                     >
//                       Explore
//                     </span>

//                   </div>

//                 </div>
//               </motion.article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* =========================================================
//    TIMELINE — PREMIUM PROCESS JOURNEY
// ========================================================= */

// function TimelineSection({ section }) {
//   const steps = section.steps || [];

//   if (!steps.length) return null;

//   return (
//     <section className="relative overflow-hidden bg-[#111111] px-6 py-24 text-[#F7F2E8] md:py-32">

//       {/* Ambient gold glow */}
//       <div
//         className="
//           pointer-events-none
//           absolute -right-40 top-20
//           h-[500px] w-[500px]
//           rounded-full
//           bg-[#C9A227]/[0.035]
//           blur-[120px]
//         "
//       />

//       <div
//         className="
//           pointer-events-none
//           absolute -left-40 bottom-0
//           h-[400px] w-[400px]
//           rounded-full
//           bg-[#C9A227]/[0.025]
//           blur-[100px]
//         "
//       />

//       <div className="relative mx-auto max-w-6xl">

//         {/* -------------------------------------------------
//             HEADER
//         ------------------------------------------------- */}

//         <SectionHeading
//           heading={section.heading}
//           description={section.description}
//           dark
//         />

//         {/* -------------------------------------------------
//             TIMELINE
//         ------------------------------------------------- */}

//         <div className="relative mt-20 md:mt-24">

//           {/* Main timeline */}
//           <div
//             className="
//               pointer-events-none
//               absolute bottom-0 left-[23px] top-0
//               w-px
//               bg-gradient-to-b
//               from-transparent
//               via-[#C9A227]/35
//               to-transparent
//               md:left-1/2
//               md:-translate-x-1/2
//             "
//           />

//           {/* Animated gold progress */}
//           <motion.div
//             initial={{ scaleY: 0 }}
//             whileInView={{ scaleY: 1 }}
//             viewport={{ once: true, amount: 0.1 }}
//             transition={{
//               duration: 1.8,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="
//               pointer-events-none
//               absolute bottom-0 left-[23px] top-0
//               w-px
//               origin-top
//               bg-gradient-to-b
//               from-[#C9A227]
//               via-[#C9A227]/50
//               to-transparent
//               md:left-1/2
//               md:-translate-x-1/2
//             "
//           />

//           <div className="space-y-14 md:space-y-20">

//             {steps.map((step, index) => {

//               const isLeft = index % 2 === 0;

//               const number =
//                 step.number ||
//                 String(index + 1).padStart(2, "0");

//               return (
//                 <motion.div
//                   key={step._key || index}
//                   initial={{
//                     opacity: 0,
//                     y: 35,
//                     x: isLeft ? -20 : 20,
//                   }}
//                   whileInView={{
//                     opacity: 1,
//                     y: 0,
//                     x: 0,
//                   }}
//                   viewport={{
//                     once: true,
//                     amount: 0.2,
//                   }}
//                   transition={{
//                     duration: 0.65,
//                     delay: Math.min(index * 0.08, 0.3),
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   className="
//                     relative
//                     grid
//                     grid-cols-[48px_1fr]
//                     gap-5
//                     md:grid-cols-2
//                     md:gap-20
//                   "
//                 >

//                   {/* -------------------------------------------------
//                       MOBILE NODE
//                   ------------------------------------------------- */}

//                   <div
//                     className="
//                       absolute left-0 top-0
//                       z-20
//                       flex h-12 w-12
//                       items-center justify-center
//                       rounded-full
//                       border
//                       border-[#C9A227]/60
//                       bg-[#111111]
//                       font-display
//                       text-sm
//                       text-[#C9A227]
//                       shadow-[0_0_0_6px_rgba(201,162,39,0.05)]
//                       md:hidden
//                     "
//                   >
//                     {number}
//                   </div>

//                   {/* -------------------------------------------------
//                       DESKTOP LEFT SIDE
//                   ------------------------------------------------- */}

//                   {isLeft ? (
//                     <div className="hidden md:flex md:justify-end">

//                       <TimelineCard
//                         step={step}
//                         number={number}
//                         index={index}
//                       />

//                     </div>
//                   ) : (
//                     <div className="hidden md:block" />
//                   )}

//                   {/* -------------------------------------------------
//                       CENTER NODE
//                   ------------------------------------------------- */}

//                   <motion.div
//                     initial={{ scale: 0 }}
//                     whileInView={{ scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{
//                       duration: 0.4,
//                       delay: 0.15 + index * 0.06,
//                     }}
//                     className="
//                       absolute left-1/2 top-8
//                       z-30
//                       hidden
//                       h-4 w-4
//                       -translate-x-1/2
//                       -translate-y-1/2
//                       rounded-full
//                       border-[3px]
//                       border-[#111111]
//                       bg-[#C9A227]
//                       shadow-[0_0_0_5px_rgba(201,162,39,0.12)]
//                       md:block
//                     "
//                   />

//                   {/* -------------------------------------------------
//                       CONNECTOR
//                   ------------------------------------------------- */}

//                   <div
//                     className={`
//                       pointer-events-none
//                       absolute top-8
//                       hidden h-px
//                       w-20
//                       bg-gradient-to-r
//                       from-[#C9A227]/5
//                       to-[#C9A227]/35
//                       md:block
//                       ${
//                         isLeft
//                           ? "right-1/2 mr-2"
//                           : "left-1/2 ml-2"
//                       }
//                     `}
//                   />

//                   {/* -------------------------------------------------
//                       MOBILE CONTENT
//                   ------------------------------------------------- */}

//                   <div className="min-w-0 pl-0 md:hidden">

//                     <TimelineCard
//                       step={step}
//                       number={number}
//                       index={index}
//                     />

//                   </div>

//                   {/* -------------------------------------------------
//                       DESKTOP RIGHT SIDE
//                   ------------------------------------------------- */}

//                   {!isLeft ? (
//                     <div className="hidden md:block">

//                       <TimelineCard
//                         step={step}
//                         number={number}
//                         index={index}
//                       />

//                     </div>
//                   ) : (
//                     <div className="hidden md:block" />
//                   )}

//                 </motion.div>
//               );
//             })}

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// /* =========================================================
//    TIMELINE CARD
// ========================================================= */

// function TimelineCard({ step, number, index }) {
//   return (
//     <motion.article
//       whileHover={{ y: -5 }}
//       transition={{
//         duration: 0.3,
//         ease: "easeOut",
//       }}
//       className="
//         group
//         relative
//         w-full
//         max-w-[470px]
//         overflow-hidden
//         rounded-[1.75rem]
//         border
//         border-white/[0.09]
//         bg-white/[0.035]
//         p-7
//         transition-all
//         duration-500
//         hover:border-[#C9A227]/30
//         hover:bg-white/[0.055]
//         hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
//         md:p-8
//       "
//     >

//       {/* Gold top line */}
//       <span
//         className="
//           absolute left-0 top-0
//           h-[2px] w-0
//           bg-[#C9A227]
//           transition-all duration-700
//           group-hover:w-full
//         "
//       />

//       {/* Soft glow */}
//       <span
//         className="
//           pointer-events-none
//           absolute -right-20 -top-20
//           h-48 w-48
//           rounded-full
//           bg-[#C9A227]/0
//           blur-3xl
//           transition-all duration-700
//           group-hover:bg-[#C9A227]/[0.06]
//         "
//       />

//       <div className="relative">

//         {/* Top row */}
//         <div className="flex items-center justify-between">

//           <span
//             className="
//               font-display
//               text-5xl
//               leading-none
//               text-white/[0.08]
//               transition-colors
//               duration-500
//               group-hover:text-[#C9A227]/25
//             "
//           >
//             {number}
//           </span>

//           <span
//             className="
//               text-[10px]
//               font-bold
//               uppercase
//               tracking-[0.28em]
//               text-[#C9A227]/60
//             "
//           >
//             Phase {number}
//           </span>

//         </div>

//         {/* Title */}
//         <h3
//           className="
//             mt-10
//             font-display
//             text-2xl
//             leading-tight
//             tracking-tight
//             text-[#F7F2E8]
//             transition-colors
//             duration-500
//             group-hover:text-[#C9A227]
//             md:text-3xl
//           "
//         >
//           {step.title}
//         </h3>

//         {/* Description */}
//         {step.description && (
//           <p
//             className="
//               mt-4
//               max-w-md
//               text-sm
//               leading-7
//               text-white/45
//               transition-colors
//               duration-500
//               group-hover:text-white/60
//             "
//           >
//             {step.description}
//           </p>
//         )}

//         {/* Bottom indicator */}
//         <div className="mt-7 flex items-center gap-3">

//           <span
//             className="
//               h-px w-8
//               bg-[#C9A227]/35
//               transition-all duration-500
//               group-hover:w-14
//               group-hover:bg-[#C9A227]
//             "
//           />

//           <span
//             className="
//               text-[10px]
//               font-semibold
//               uppercase
//               tracking-[0.25em]
//               text-white/25
//               transition-colors duration-500
//               group-hover:text-[#C9A227]/70
//             "
//           >
//             {index === 0
//               ? "Start"
//               : index === 1
//                 ? "Build"
//                 : index === 2
//                   ? "Connect"
//                   : "Scale"}
//           </span>

//         </div>

//       </div>
//     </motion.article>
//   );
// }

// /* =========================================================
//    SPLIT CONTENT
// ========================================================= */

// function SplitContent({ section }) {
//   const imageUrl =
//     section.image?.asset?.url ||
//     null;

//   return (
//     <section className="px-6 py-24 md:py-32">

//       <div
//         className={`mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 ${
//           section.side === "left"
//             ? "lg:[&>*:first-child]:order-2"
//             : ""
//         }`}
//       >

//         <div>

//           <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
//             {section.eyebrow}
//           </p>

//           <h2 className="mt-4 font-display text-4xl md:text-5xl">
//             {section.heading}
//           </h2>

//           <p className="mt-6 max-w-xl text-base leading-7 text-[#111111]/60">
//             {section.description}
//           </p>

//         </div>

//         <div className="min-h-[350px] overflow-hidden rounded-3xl bg-[#111111]">

//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt=""
//               className="h-full min-h-[350px] w-full object-cover"
//             />
//           ) : (
//             <div className="flex min-h-[350px] items-center justify-center">

//               <Sparkles className="h-12 w-12 text-[#C9A227]" />

//             </div>
//           )}

//         </div>

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    CARDS
// ========================================================= */

// function CardsSection({ section }) {
//   return (
//     <section className="bg-white px-6 py-24 md:py-32">

//       <div className="mx-auto max-w-7xl">

//         <SectionHeading heading={section.heading} />

//         <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

//           {section.cards?.map((card, index) => (

//             <motion.article
//               key={index}
//               whileHover={{
//                 y: -6,
//               }}
//               className="rounded-3xl border border-[#111111]/10 p-8 transition-shadow hover:shadow-xl"
//             >

//               {card.tag && (
//                 <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7625]">
//                   {card.tag}
//                 </p>
//               )}

//               <h3 className="mt-4 font-display text-2xl">
//                 {card.title}
//               </h3>

//               <p className="mt-3 text-sm leading-6 text-[#111111]/60">
//                 {card.description}
//               </p>

//             </motion.article>

//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    PROCESS
// ========================================================= */

// function ProcessSection({ section }) {
//   return (
//     <section className="px-6 py-24 md:py-32">

//       <div className="mx-auto max-w-7xl">

//         <SectionHeading heading={section.heading} />

//         <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

//           {section.steps?.map((step, index) => (

//             <div key={index}>

//               <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A227] font-display text-[#111111]">

//                 {String(index + 1).padStart(2, "0")}

//               </div>

//               <h3 className="font-display text-xl">
//                 {step.title}
//               </h3>

//               <p className="mt-3 text-sm leading-6 text-[#111111]/60">
//                 {step.description}
//               </p>

//             </div>

//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    FAQ
// ========================================================= */

// function FAQSection({ section }) {
//   return (
//     <section className="bg-white px-6 py-24 md:py-32">

//       <div className="mx-auto max-w-4xl">

//         <SectionHeading heading={section.heading || "Frequently Asked Questions"} />

//         <div className="mt-12 divide-y divide-[#111111]/10">

//           {section.items?.map((item, index) => (

//             <FAQItem
//               key={index}
//               item={item}
//             />

//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    FAQ ITEM
// ========================================================= */

// function FAQItem({ item }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="py-6">

//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className="flex w-full items-center justify-between gap-6 text-left"
//       >

//         <span className="font-display text-xl">
//           {item.question}
//         </span>

//         <ChevronDown
//           className={`h-5 w-5 shrink-0 text-[#C9A227] transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//         />

//       </button>

//       {open && (
//         <motion.div
//           initial={{
//             opacity: 0,
//             height: 0,
//           }}
//           animate={{
//             opacity: 1,
//             height: "auto",
//           }}
//           className="overflow-hidden"
//         >

//           <p className="max-w-3xl pt-4 text-sm leading-7 text-[#111111]/60">
//             {item.answer}
//           </p>

//         </motion.div>
//       )}

//     </div>
//   );
// }

// /* =========================================================
//    QUOTE
// ========================================================= */

// function QuoteSection({ section }) {
//   return (
//     <section className="px-6 py-24 md:py-32">

//       <div className="mx-auto max-w-5xl text-center">

//         <div className="mx-auto mb-8 h-px w-16 bg-[#C9A227]" />

//         <blockquote className="font-display text-3xl leading-tight md:text-5xl">
//           “{section.text}”
//         </blockquote>

//         {section.author && (
//           <p className="mt-8 text-sm text-[#111111]/50">
//             {section.author}
//             {section.role ? ` — ${section.role}` : ""}
//           </p>
//         )}

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    SECTION HEADING
// ========================================================= */

// function SectionHeading({
//   heading,
//   description,
//   dark = false,
// }) {
//   return (
//     <div className="max-w-3xl">

//       {heading && (
//         <h2
//           className={`font-display text-4xl leading-tight md:text-5xl ${
//             dark
//               ? "text-[#F7F2E8]"
//               : "text-[#111111]"
//           }`}
//         >
//           {heading}
//         </h2>
//       )}

//       {description && (
//         <p
//           className={`mt-5 max-w-2xl text-base leading-7 ${
//             dark
//               ? "text-white/55"
//               : "text-[#111111]/60"
//           }`}
//         >
//           {description}
//         </p>
//       )}

//     </div>
//   );
// }

// /* =========================================================
//    RELATED SERVICES
// ========================================================= */

// function RelatedServices({ services = [] }) {
//   if (!services?.length) {
//     return null;
//   }

//   return (
//     <section className="border-t border-[#111111]/10 px-6 py-24">

//       <div className="mx-auto max-w-7xl">

//         <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
//           Continue the journey
//         </p>

//         <h2 className="mt-4 font-display text-4xl">
//           Related Services
//         </h2>

//         <div className="mt-10 grid gap-5 md:grid-cols-3">

//           {services.slice(0, 3).map((service) => (

//             <Link
//               key={service._id}
//               href={`/services/${service.slug}`}
//               className="group rounded-3xl border border-[#111111]/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[#C9A227]/40"
//             >

//               <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7625]">
//                 {service.pillar}
//               </p>

//               <h3 className="mt-3 font-display text-2xl group-hover:text-[#9A7625]">
//                 {service.name}
//               </h3>

//               <p className="mt-3 text-sm leading-6 text-[#111111]/55">
//                 {service.shortDescription}
//               </p>

//               <span className="mt-6 inline-flex text-sm font-semibold text-[#9A7625]">
//                 Explore →
//               </span>

//             </Link>

//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }

// /* =========================================================
//    FINAL CTA
// ========================================================= */

// function ServiceCTA() {
//   return (
//     <section className="bg-[#111111] px-6 py-28 text-center text-[#F7F2E8]">

//       <div className="mx-auto max-w-4xl">

//         <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
//           Ready for the next stage?
//         </p>

//         <h2 className="mt-5 font-display text-4xl md:text-6xl">
//           Let's build your next trajectory.
//         </h2>

//         <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50">
//           Tell us where your commerce operation is today and where you want it to go.
//         </p>

//         <Link
//           href="/contact"
//           className="mt-9 inline-flex rounded-full bg-[#C9A227] px-8 py-4 text-sm font-semibold text-[#111111] transition hover:bg-[#E2C66B]"
//         >
//           Book a Consultation
//         </Link>

//       </div>

//     </section>
//   );
// }