import { client } from "@/lib/sanity/client";
import { servicesListQuery } from "@/lib/sanity/queries";
import ServicesClientView from "@/components/services/ServicesClientView";
import { Sparkles, ArrowUpRight, Layers, Cpu, Workflow, TrendingUp, ShieldCheck } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "Services",
  description:
    "Shopify development, integrations, automation, optimization, and growth services from Tendrils.",
};

const fallbackServices = [
  {
    _id: "fallback-build",
    name: "Shopify Development",
    pillar: "build",
    slug: { current: "shopify-development" },
    shortDescription:
      "High-performance Shopify experiences engineered for modern digital commerce.",
  },
  {
    _id: "fallback-automate",
    name: "ERP & System Integration",
    pillar: "automate",
    slug: { current: "erp-system-integration" },
    shortDescription:
      "Connect systems, workflows, and data to eliminate operational friction.",
  },
  {
    _id: "fallback-scale",
    name: "AI & Commerce Intelligence",
    pillar: "scale",
    slug: { current: "ai-commerce-intelligence" },
    shortDescription:
      "Commerce infrastructure designed to support ambitious enterprise growth.",
  },
  {
    _id: "fallback-grow",
    name: "Conversion Rate Optimization",
    pillar: "grow",
    slug: { current: "conversion-rate-optimization" },
    shortDescription:
      "Turn your storefront and digital ecosystem into a measurable growth engine.",
  },
  {
    _id: "fallback-support",
    name: "Continuous Optimization",
    pillar: "support",
    slug: { current: "continuous-optimization" },
    shortDescription:
      "Continuous optimisation, maintenance, and strategic support for your commerce operation.",
  },
];

export default async function ServicesPage() {
  let services = [];

  try {
    const result = await client.fetch(servicesListQuery);
    services = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Failed to fetch services from Sanity:", error);
  }

  const hasRealData = services.length > 0;
  const displayServices = hasRealData ? services : fallbackServices;

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
                Our Capabilities & Services
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-8xl text-[#111111]">
              Commerce infrastructure built for the next stage.
            </h1>

            {/* Description */}
            <p className="mt-7 text-base leading-relaxed text-[#111111]/70 md:text-xl">
              From Shopify builds to complex integrations and growth systems, Tendrils connects the technical pieces that let ambitious commerce teams move faster.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES INTERACTIVE CLIENT VIEW (List & Filter)
      ===================================================== */}
      <section className="relative z-10 px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <ServicesClientView
            services={displayServices}
            hasRealData={hasRealData}
          />
        </div>
      </section>

      {/* =====================================================
          BOTTOM ENTERPRISE BANNER CTA
      ===================================================== */}
      <section className="relative z-10 border-t border-[#111111]/10 bg-white/60 px-6 py-24 backdrop-blur-xl md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
            Custom Solutions
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-[#111111] md:text-6xl">
            Need a bespoke engineering architecture?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#111111]/70">
            Every commerce ecosystem has unique friction points. Let&apos;s talk about custom enterprise pipelines tailored to your operations.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-8 py-4 text-sm font-semibold text-[#111111] transition-all hover:opacity-90 hover:shadow-xl shadow-[0_10px_30px_rgba(201,162,39,0.25)]"
            >
              Start a Conversation <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}