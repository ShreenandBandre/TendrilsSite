import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import {
  industryBySlugQuery,
  industryHierarchyQuery,
} from "@/lib/sanity/queries";

import IndustryHero from "@/components/industries/IndustryHero";
import IndustryChallenges from "@/components/industries/IndustryChallenges";
import IndustryCharacteristics from "@/components/industries/IndustryCharacteristics";
import IndustryJourney from "@/components/industries/IndustryJourney";
import IndustryEcosystem from "@/components/industries/IndustryEcosystem";
import IndustryCapabilities from "@/components/industries/IndustryCapabilities";
import IndustryStats from "@/components/industries/IndustryStats";
import IndustryRelatedServices from "@/components/industries/IndustryRelatedServices";
import IndustryCaseStudies from "@/components/industries/IndustryCaseStudies";
import IndustryFAQ from "@/components/industries/IndustryFAQ";
import ProseContent from "@/components/content/ProseContent";
import ChildPagesSection from "@/components/content/ChildPagesSection";

export const revalidate = 60;

/* =========================================================
   STATIC PARAMS
========================================================= */

export async function generateStaticParams() {
  const items = await client.fetch(industryHierarchyQuery);

  const byId = new Map(
    (items || []).map((item) => [item._id, item])
  );

  const pathFor = (item, seen = new Set()) => {
    if (!item) return "";

    if (seen.has(item._id)) {
      return item.slug || "";
    }

    const nextSeen = new Set(seen);
    nextSeen.add(item._id);

    const parentId =
      item.parentId?._ref ||
      item.parentId ||
      item.parent?._ref ||
      item.parent?._id ||
      null;

    const parent = parentId ? byId.get(parentId) : null;

    const parentPath = parent
      ? pathFor(parent, nextSeen)
      : "";

    return [parentPath, item.slug]
      .filter(Boolean)
      .join("/");
  };

  return (items || [])
    .map((item) => {
      const path = pathFor(item);

      return {
        slug: path
          .split("/")
          .map((part) => part.trim())
          .filter(Boolean),
      };
    })
    .filter((item) => item.slug.length > 0);
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const segments = resolvedParams?.slug;

  const slug = Array.isArray(segments)
    ? segments[segments.length - 1]
    : segments;

  if (!slug) {
    return {};
  }

  const industry = await client.fetch(
    industryBySlugQuery,
    { slug }
  );

  if (!industry) {
    return {};
  }

  const metaTitle =
    industry.seo?.metaTitle ||
    industry.seo?.title ||
    industry.title;

  const metaDescription =
    industry.seo?.metaDescription ||
    industry.seo?.description ||
    industry.shortDescription ||
    industry.painPoints?.[0] ||
    industry.description;

  return {
    title: metaTitle,
    description: metaDescription,

    robots: industry.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function IndustryPage({ params }) {
  const resolvedParams = await params;

  const segments = resolvedParams?.slug;

  const slug = Array.isArray(segments)
    ? segments[segments.length - 1]
    : segments;

  if (!slug) {
    notFound();
  }

  const industry = await client.fetch(
    industryBySlugQuery,
    { slug }
  );

  if (!industry) {
    notFound();
  }

  const children = Array.isArray(industry.children)
    ? industry.children
    : [];

  const stats = Array.isArray(industry.stats)
    ? industry.stats
    : [];

  const painPoints = Array.isArray(industry.painPoints)
    ? industry.painPoints
    : [];

  const characteristics = Array.isArray(industry.characteristics)
    ? industry.characteristics
    : [];

  const journey = Array.isArray(industry.journey)
    ? industry.journey
    : [];

  const ecosystem = Array.isArray(industry.ecosystem)
    ? industry.ecosystem
    : [];

  const capabilities = Array.isArray(industry.capabilities)
    ? industry.capabilities
    : [];

  const body = Array.isArray(industry.body)
    ? industry.body
    : [];

  const relatedServices = Array.isArray(
    industry.relatedServices
  )
    ? industry.relatedServices
    : [];

  const relatedCaseStudies = Array.isArray(
    industry.relatedCaseStudies
  )
    ? industry.relatedCaseStudies
    : [];

  const faqs = Array.isArray(industry.faqs)
    ? industry.faqs
    : [];

  return (
    <main>
      {/* =====================================================
          HERO
      ===================================================== */}

      <IndustryHero industry={industry} />

      {/* =====================================================
          CHILD INDUSTRIES
      ===================================================== */}

      {children.length > 0 && (
        <ChildPagesSection
          items={children}
          type="industry"
          parentSlug={industry.slug}
        />
      )}

      {/* =====================================================
          STATS
      ===================================================== */}

      {stats.length > 0 && (
        <IndustryStats items={stats} />
      )}

      {/* =====================================================
          CHALLENGES
      ===================================================== */}

      {painPoints.length > 0 && (
        <IndustryChallenges items={painPoints} />
      )}

      {/* =====================================================
          INDUSTRY CHARACTERISTICS
      ===================================================== */}

      {characteristics.length > 0 && (
        <IndustryCharacteristics
          items={characteristics}
        />
      )}

      {/* =====================================================
          COMMERCE JOURNEY
      ===================================================== */}

      {journey.length > 0 && (
        <IndustryJourney items={journey} />
      )}

      {/* =====================================================
          ECOSYSTEM
      ===================================================== */}

      {ecosystem.length > 0 && (
        <IndustryEcosystem items={ecosystem} />
      )}

      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      {capabilities.length > 0 && (
        <IndustryCapabilities items={capabilities} />
      )}

      {/* =====================================================
          BODY CONTENT
      ===================================================== */}

      {body.length > 0 && (
        <section className="bg-ivory px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <ProseContent value={body} />
          </div>
        </section>
      )}

      {/* =====================================================
          RELATED SERVICES
      ===================================================== */}

      {relatedServices.length > 0 && (
        <IndustryRelatedServices
          services={relatedServices}
        />
      )}

      {/* =====================================================
          CASE STUDIES
      ===================================================== */}

      {relatedCaseStudies.length > 0 && (
        <IndustryCaseStudies
          items={relatedCaseStudies}
        />
      )}

      {/* =====================================================
          FAQ
      ===================================================== */}

      {faqs.length > 0 && (
        <IndustryFAQ items={faqs} />
      )}

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-gold px-6 py-24 text-ink md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em]">
            Build What Comes Next
          </p>

          <h2 className="mt-6 font-display text-5xl tracking-tight md:text-7xl">
            Ready to engineer your commerce ecosystem?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink/65">
            Tell us where your commerce operation is today.
            We will help you understand what it needs to become
            next.
          </p>

          <a
            href="/contact"
            className="
              mt-10
              inline-flex
              rounded-full
              bg-[#121110]
              px-8
              py-4
              text-sm
              font-semibold
              text-[#FAF7F2]
              shadow-lg
              transition-all
              duration-300
              hover:bg-white
              hover:text-ink
            "
          >
            Book a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}