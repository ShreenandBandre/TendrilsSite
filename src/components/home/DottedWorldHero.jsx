"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import DottedMap from "dotted-map";
import MagneticButton from "@/components/ui/MagneticButton";
import PartnersMarquee from "@/components/home/PartnersMarquee";

const map = new DottedMap({ height: 60, grid: "diagonal" });
const rawMapSvg = map.getSVG({
  radius: 0.22,
  color: "#C9A227",
  shape: "circle",
  backgroundColor: "transparent",
});
const mapSvg = rawMapSvg.replace(
  "<svg ",
  '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" '
);

const defaultStats = [
  { value: "250+", label: "Global Consultants" },
  { value: "3", label: "Global Hubs" },
  { value: "50+", label: "Agile Practitioners" },
];

export default function DottedWorldHero({ stats = [], hero = {}, logo, logoAlt = "Tendrils", partnersMarquee = null }) {
  const activeStats = stats?.length > 0 ? stats : defaultStats;

  return (
    <DesktopHero hero={hero} logo={logo} logoAlt={logoAlt} activeStats={activeStats} partnersMarquee={partnersMarquee} />
  );
}

function DesktopHero({ hero, logo, logoAlt, activeStats, partnersMarquee }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const tendrilsScale = useTransform(scrollYProgress, [0.3, 0.85], [0.85, 1.1]);
  const tendrilsOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.85], [0, 1, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [0.3, 0.15, 0]);
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={ref} className="relative h-[250vh] bg-ivory">
      <div className="sticky top-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          style={{ opacity: mapOpacity, scale: mapScale }}
          animate={{ x: ["0%", "-12%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none [&_svg]:w-[130%] [&_svg]:h-[130%] [&_svg]:max-w-none z-0"
          dangerouslySetInnerHTML={{ __html: mapSvg }}
        />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-20 mx-auto max-w-4xl text-center flex flex-col items-center pointer-events-auto">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-deep font-bold">{hero.eyebrow || "Ecommerce Growth Partner"}</p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl leading-tight text-ink font-bold drop-shadow-sm">{hero.headline || "We do not sell hours."}<br /><span className="gold-text font-bold">{hero.highlight || "We sell trajectory."}</span></h1>
          <p className="mx-auto mt-6 max-w-xl text-sm sm:text-lg text-ink font-medium leading-relaxed">{hero.description || "Tendrils builds, integrates, automates, and scales Shopify businesses end-to-end — from first store to multi-entity, ERP-integrated commerce."}</p>
          <div className="mt-10 flex flex-row items-center justify-center gap-4 w-full">
            <MagneticButton className="rounded-full bg-gold px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-ink hover:opacity-90 hover:shadow-md transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.15)]"><Link href={hero.primaryCta?.href || "/contact"}>{hero.primaryCta?.label || "Book a Consultation"}</Link></MagneticButton>
            <Link href={hero.secondaryCta?.href || "/case-studies"} className="text-xs sm:text-sm font-semibold text-ink hover:text-gold-deep underline underline-offset-4">{hero.secondaryCta?.label || "See our results"}</Link>
          </div>
        </motion.div>

        <motion.div style={{ scale: tendrilsScale, opacity: tendrilsOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-4">
          {logo?.assetUrl && <img src={logo.assetUrl} alt={logoAlt} className="mb-4 sm:mb-6 h-10 sm:h-16 w-auto object-contain opacity-95" />}
          <h2 className="select-none font-display text-5xl sm:text-7xl md:text-9xl text-black tracking-tight">Tendrils</h2>
          <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gold-deep font-semibold">Global Commerce Architecture</p>
          <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-3xl w-full pointer-events-auto">
            {activeStats.map((stat, idx) => (
              <div key={idx} className="rounded-xl sm:rounded-2xl border border-gold/20 bg-white/70 backdrop-blur-md p-2.5 sm:p-4 md:p-6 shadow-sm text-center">
                {stat?.image?.assetUrl && <img src={stat.image.assetUrl} alt={stat.label || "Stat"} className="mb-4 hidden h-20 w-full rounded-xl object-cover sm:block" />}
                <p className="font-display text-lg sm:text-2xl md:text-4xl gold-text font-bold">{stat.value}</p>
                <p className="mt-1 text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-widest text-ink/70 font-bold leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-4 sm:bottom-8 z-10 flex w-full flex-col items-center px-4">
          <PartnersMarquee data={partnersMarquee} />
          <p className="mt-4 sm:mt-8 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-ink/50 font-semibold">Scroll to explore ↓</p>
        </motion.div>
      </div>
    </section>
  );
}