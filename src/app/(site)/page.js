import { client } from "@/lib/sanity/client";
import {
  homepageQuery,
  servicesListQuery,
  siteSettingsQuery,
  industriesListQuery,
  solutionsListQuery,
} from "@/lib/sanity/queries";

import DottedWorldHero from "@/components/home/DottedWorldHero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DigitalMarketingGrid from "@/components/home/DigitalMarketingGrid";
import VendorsSection from "@/components/home/VendorsSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

import Link from "next/link";
import UniversalSections from "@/components/content/UniversalSections";

export const revalidate = 60;

/* =========================================================
   FALLBACK DATA
========================================================= */

const fallbackStats = [
  { value: "250+", label: "Global Consultants" },
  { value: "3", label: "Global Hubs" },
  { value: "50+", label: "Agile Practitioners" },
];

const fallbackServices = [
  {
    _id: "fallback-build",
    name: "Build",
    title: "Build",
    slug: "build",
    pillar: "build",
    shortDescription:
      "High-performance Shopify experiences engineered for modern digital commerce.",
    heroImageUrl: null,
  },
  {
    _id: "fallback-automate",
    name: "Automate",
    title: "Automate",
    slug: "automate",
    pillar: "automate",
    shortDescription:
      "Connect systems, workflows, and data to eliminate operational friction.",
    heroImageUrl: null,
  },
  {
    _id: "fallback-scale",
    name: "Scale",
    title: "Scale",
    slug: "scale",
    pillar: "scale",
    shortDescription:
      "Commerce infrastructure designed to support ambitious enterprise growth.",
    heroImageUrl: null,
  },
];

const fallbackExpertise = {
  title: "Our Strategic Expertise",
  subtitle:
    "Driven by purpose, engineered for the future of digital commerce.",
  items: [
    {
      heading: "Our Mission",
      description:
        "To collaborate and foster disruption with leading-edge solutions that ensure our clients' future readiness.",
    },
    {
      heading: "Our Vision",
      description:
        "To shape a bold new era of digital disruption, with quality, agility, and integrity at the core.",
    },
  ],
};

const fallbackWhyChooseUs = {
  title: "Why Choose Tendrils?",
  subtitle:
    "We combine strategy, technology, and execution to create commerce systems built for long-term growth.",
  features: [
    {
      title: "Commerce Expertise",
      description:
        "Deep expertise across Shopify, digital commerce, and integrations.",
    },
    {
      title: "Built for Scale",
      description:
        "We design systems that evolve with your business.",
    },
    {
      title: "Connected Ecosystems",
      description:
        "From storefronts to ERP, CRM, PIM, and OMS.",
    },
    {
      title: "Long-Term Partnership",
      description:
        "Continuous optimisation, support, and strategic guidance.",
    },
  ],
};

const fallbackFinalCta = {
  eyebrow: "Ready for the next stage?",
  title: "Build the trajectory your commerce deserves.",
  description:
    "Tell us where your commerce operation is today, where it needs to go, and what is holding it back.",
  cta: {
    label: "Book a Consultation",
    href: "/contact",
  },
};

/* =========================================================
   FETCH HOMEPAGE + REAL CONTENT
========================================================= */

async function getHomepageData() {
  try {
    const [
      homepageData,
      servicesData,
      industriesData,
      solutionsData,
      siteSettings,
    ] = await Promise.all([
      client.fetch(
        homepageQuery,
        {},
        { next: { revalidate: 60 } }
      ),

      client.fetch(
        servicesListQuery,
        {},
        { next: { revalidate: 60 } }
      ),

      /*
       * IMPORTANT:
       * Fetch actual Industry documents directly.
       * This means the homepage does not depend only on
       * homepage.industriesSection.items references.
       */
      client.fetch(
        industriesListQuery,
        {},
        { next: { revalidate: 60 } }
      ),

      /*
       * IMPORTANT:
       * Fetch actual Solution documents directly.
       * This prevents the hardcoded Solutions fallback
       * from being shown when homepage references are empty.
       */
      client.fetch(
        solutionsListQuery,
        {},
        { next: { revalidate: 60 } }
      ),

      client.fetch(
        siteSettingsQuery,
        {},
        { next: { revalidate: 60 } }
      ),
    ]);

    return {
      ...(homepageData || {}),

      services: Array.isArray(servicesData)
        ? servicesData
        : [],

      /*
       * These are the REAL Sanity Industry documents.
       */
      industries: Array.isArray(industriesData)
        ? industriesData
        : [],

      /*
       * These are the REAL Sanity Solution documents.
       */
      solutions: Array.isArray(solutionsData)
        ? solutionsData
        : [],

      siteSettings: siteSettings || null,
    };
  } catch (error) {
    console.error("Sanity homepage fetch failed:", error);

    return null;
  }
}

/* =========================================================
   HOMEPAGE
========================================================= */

export default async function HomePage() {
  const data = await getHomepageData();

  /* =======================================================
     BASIC HOMEPAGE DATA
  ======================================================= */

  const stats =
    Array.isArray(data?.stats) && data.stats.length > 0
      ? data.stats
      : fallbackStats;

  const services =
    Array.isArray(data?.services) && data.services.length > 0
      ? data.services
      : fallbackServices;

  const expertise =
    data?.expertise || fallbackExpertise;

  const whyChooseUs =
    data?.whyChooseUs || fallbackWhyChooseUs;

  const finalCta =
    data?.finalCta || fallbackFinalCta;

  const marketingGrid =
    Array.isArray(data?.marketingGrid)
      ? data.marketingGrid
      : [];

  const partnersMarquee =
    data?.partnersMarquee || null;

  /* =======================================================
     REAL INDUSTRIES
     
     Priority:
     1. Real documents fetched from Sanity
     2. Existing homepage references as secondary fallback
     3. Empty array
  ======================================================= */

  const realIndustries =
    Array.isArray(data?.industries) &&
    data.industries.length > 0
      ? data.industries
      : Array.isArray(data?.industriesSection?.items)
        ? data.industriesSection.items
        : [];

  const industriesSection = {
    ...(data?.industriesSection || {}),

    /*
     * Force the UI to receive actual Industry documents.
     */
    items: realIndustries,
  };

  /* =======================================================
     REAL SOLUTIONS
     
     Priority:
     1. Real documents fetched from Sanity
     2. Existing homepage references as secondary fallback
     3. Empty array
     
     This is what stops:
       Shopify Replatforming
       ERP & OMS Integration
       Headless Commerce
       B2B Ordering Portals
     
     from appearing unless they actually exist in Sanity.
  ======================================================= */

  const realSolutions =
    Array.isArray(data?.solutions) &&
    data.solutions.length > 0
      ? data.solutions
      : Array.isArray(data?.solutionsSection?.items)
        ? data.solutionsSection.items
        : [];

  const solutionsSection = {
    ...(data?.solutionsSection || {}),

    /*
     * Force the UI to receive actual Solution documents.
     */
    items: realSolutions,
  };

  /* =======================================================
     DEBUG
     
     Temporarily useful while checking Sanity.
     Remove later if you want.
  ======================================================= */

  if (process.env.NODE_ENV !== "production") {
    console.log(
      "Homepage Industries:",
      realIndustries.map((item) => ({
        id: item?._id,
        title: item?.title,
        slug: item?.slug,
      }))
    );

    console.log(
      "Homepage Solutions:",
      realSolutions.map((item) => ({
        id: item?._id,
        title: item?.title,
        slug: item?.slug,
      }))
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="relative">

      {/* =================================================
          HERO
      ================================================= */}

      <DottedWorldHero
        stats={stats}
        hero={data?.hero || {}}
        logo={data?.siteSettings?.headerLogo}
        logoAlt={data?.siteSettings?.headerLogoAlt}
        partnersMarquee={partnersMarquee}
      />

      {/* =================================================
          VENDORS (right after hero)
      ================================================= */}

      <VendorsSection data={data?.vendorsSection} />

      {/* =================================================
          UNIVERSAL SECTIONS
      ================================================= */}

      {data?.sections?.length > 0 && (
        <ScrollReveal>
          <UniversalSections
            sections={data.sections}
          />
        </ScrollReveal>
      )}

      {/* =================================================
          SERVICES
      ================================================= */}

      <ServicesGrid services={services} />

      {/* =================================================
          WHY CHOOSE US
      ================================================= */}

      <ScrollReveal>
        <WhyChooseUs data={whyChooseUs} />
      </ScrollReveal>

      {/* =================================================
          DIGITAL MARKETING
      ================================================= */}

      <ScrollReveal>
        <DigitalMarketingGrid
          items={marketingGrid}
        />
      </ScrollReveal>

      {/* =================================================
          EXPERTISE
      ================================================= */}

      <ScrollReveal>
        <ExpertiseSection
          expertise={expertise}
        />
      </ScrollReveal>

      {/* =================================================
          INDUSTRIES
          
          IMPORTANT:
          industriesSection.items now contains REAL
          Sanity Industry documents.
      ================================================= */}

      <IndustriesSection
        data={industriesSection}
      />

      {/* =================================================
          SOLUTIONS
          
          IMPORTANT:
          solutionsSection.items now contains REAL
          Sanity Solution documents.
      ================================================= */}

      <SolutionsSection
        data={solutionsSection}
      />

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <ScrollReveal>
        <section className="bg-[#111111] px-6 py-24 text-center text-[#f7f2e8]">
          <div className="mx-auto max-w-4xl">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d5b45b]">
              {finalCta?.eyebrow ||
                "Ready for the next stage?"}
            </p>

            <h2 className="mt-5 font-display text-4xl md:text-6xl">
              {finalCta?.title ||
                "Build the trajectory your commerce deserves."}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#f7f2e8]/60">
              {finalCta?.description ||
                "Tell us where your commerce operation is today."}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">

              <Link
                href={
                  finalCta?.cta?.href ||
                  "/contact"
                }
                className="inline-flex rounded-full bg-[#d5b45b] px-7 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f2e8]"
              >
                {finalCta?.cta?.label ||
                  "Book a Consultation"}
              </Link>

              <Link
                href="/about"
                className="inline-flex rounded-full border border-white/20 bg-white/[0.04] px-7 py-3 text-sm font-semibold text-[#f7f2e8] transition hover:border-[#d5b45b] hover:text-[#d5b45b]"
              >
                About Us
              </Link>

            </div>
          </div>
        </section>
      </ScrollReveal>

    </main>
  );
}