import { client } from "@/lib/sanity/client";
import { industriesListQuery } from "@/lib/sanity/queries";
import IndustriesClientView from "@/components/industries/IndustriesClientView";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "Industries",
  description: "Industry-specific digital commerce systems engineered by Tendrils.",
};

const fallbackIndustries = [
  {
    _id: "fallback-furniture",
    title: "Furniture & Interior",
    slug: { current: "furniture" },
    category: "Retail",
    featured: true,
    shortDescription: "Engineered high-performance product catalogs, visualizers, and automated ERP sync tailored for furniture retail.",
    painPoints: [
      "Handling massive variant inventories and heavy 3D assets",
      "Real-time multi-location inventory synchronization",
      "Complex custom shipping and white-glove delivery rules"
    ]
  },
  {
    _id: "fallback-luxury",
    title: "Luxury & High-End",
    slug: { current: "luxury" },
    category: "Brand Equity",
    featured: true,
    shortDescription: "Bespoke digital flagships crafted with immaculate editorial typography and high-contrast aesthetics.",
    painPoints: [
      "Exclusive clienteling and private digital access gates",
      "Ultra-secure transactional security and fraud prevention",
      "Immaculate storytelling paired with frictionless headless speed"
    ]
  },
  {
    _id: "fallback-fashion",
    title: "Fashion & Apparel",
    slug: { current: "fashion" },
    category: "D2C",
    featured: false,
    shortDescription: "Lightning-fast headless storefronts built to handle high-velocity seasonal drops and global traffic spikes.",
    painPoints: [
      "Managing massive flash traffic spikes during seasonal launches",
      "Zero overselling with real-time omni-channel stock levels",
      "Complex return and exchange workflow automation"
    ]
  },
  {
    _id: "fallback-enterprise",
    title: "Enterprise Commerce",
    slug: { current: "enterprise" },
    category: "B2B / B2C",
    featured: false,
    shortDescription: "Robust, scalable infrastructure engineered to support complex multi-region business models.",
    painPoints: [
      "Legacy ERP and PIM system decoupling",
      "Strict role-based access control and deterministic routing",
      "Multi-currency, multi-language localization scaling"
    ]
  }
];

export default async function IndustriesPage() {
  let industries = [];
  try {
    industries = await client.fetch(industriesListQuery);
  } catch (error) {
    console.warn("Failed to fetch industries from Sanity, using fallback.", error);
  }

  const displayIndustries = Array.isArray(industries) && industries.length > 0 ? industries : fallbackIndustries;
  const isSanityData = Array.isArray(industries) && industries.length > 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF7F2] text-[#111111]">
      
      {/* =====================================================
          BACKGROUND DOTTED MATRIX + PASTEL AMBIENT GLOWS
      ===================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[650px] w-[650px] rounded-full bg-purple-200/40 blur-[140px]" />
        <div className="absolute top-1/3 -right-45 h-[700px] w-[700px] rounded-full bg-amber-200/40 blur-[150px]" />
        <div className="absolute -bottom-40 left-1/4 h-[600px] w-[600px] rounded-full bg-emerald-200/30 blur-[130px]" />

        <div 
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,162,39,0.55) 1.5px, transparent 1.5px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* =====================================================
          REDESIGNED HERO SECTION
      ===================================================== */}
      <section className="relative z-10 px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start max-w-3xl">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-white/70 px-4.5 py-1.5 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#C9A227]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
                Industries We Serve
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-8xl text-[#111111]">
              Deep context. Better commerce decisions.
            </h1>

            {/* Description */}
            <p className="mt-7 text-base leading-relaxed text-[#111111]/70 md:text-xl">
              We adapt the architecture to the operational realities of your category instead of forcing every business into the same template.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES CLIENT VIEW (Cards & Filter)
      ===================================================== */}
      <section className="relative z-10 px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <IndustriesClientView
            industries={displayIndustries}
            hasRealData={isSanityData}
          />
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA BANNER
      ===================================================== */}
      <section className="relative z-10 border-t border-[#111111]/10 bg-white/60 px-6 py-24 backdrop-blur-xl md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
            Sector Expertise
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-[#111111] md:text-6xl">
            Don&apos;t see your specific industry category?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#111111]/70">
            Our modular commerce architecture scales across unique verticals. Let&apos;s discuss your operational workflow.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-8 py-4 text-sm font-semibold text-[#111111] transition-all hover:opacity-90 hover:shadow-xl shadow-[0_10px_30px_rgba(201,162,39,0.25)]"
            >
              Consult an Architect <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}