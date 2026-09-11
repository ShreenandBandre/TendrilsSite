"use client";

import { ServiceHero, StatsSection } from "./solution-heroes";
import { RelatedSolutionsCTA } from "./solution-sections";
import UniversalSections from "@/components/content/UniversalSections";
import ChildPagesSection from "@/components/content/ChildPagesSection";

export default function SolutionPageRenderer({ solution }) {
  if (!solution) return null;
  const pageStyle = solution.pageStyle || "editorial";

  return (
    <main className="bg-[#F7F2E8] text-[#111111]">
      <ServiceHero solution={solution} style={pageStyle} />
      {solution.stats?.length > 0 && <StatsSection stats={solution.stats} />}

      <ChildPagesSection items={solution.children} type="solution" parentSlug={solution.slug} />

      <UniversalSections sections={solution.sections || []} />

      <RelatedSolutionsCTA
        services={solution.relatedServices}
        industries={solution.relatedIndustries}
        caseStudies={solution.relatedCaseStudies}
      />

      <SolutionCTA />
    </main>
  );
}

function SolutionCTA() {
  return (
    <section className="bg-[#111111] px-6 py-28 text-center text-[#F7F2E8]">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
          Ready for the next stage?
        </p>
        <h2 className="mt-5 font-display text-4xl md:text-6xl">
          Let&apos;s build your next trajectory.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50">
          Tell us where your business is today and where you want it to go.
        </p>
        <a
          href="/contact"
          className="mt-9 inline-flex rounded-full bg-[#C9A227] px-8 py-4 text-sm font-semibold text-[#111111] transition hover:bg-[#E2C66B]"
        >
          Book a Consultation
        </a>
      </div>
    </section>
  );
}