import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { aboutPageQuery } from "@/lib/sanity/queries";

import UniversalSections from "@/components/content/UniversalSections";
// import PartnerGridSection from "@/components/content/PartnerGridSection";
import ActionLink from "@/components/content/ActionLink";
import DarkMarqueeStrip from "@/components/content/DarkMarqueeStrip";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await client.fetch(aboutPageQuery);

  return {
    title:
      data?.seo?.metaTitle ||
      data?.seo?.title ||
      data?.title ||
      "About Us | Tendrils",

    description:
      data?.seo?.metaDescription ||
      data?.seo?.description ||
      data?.hero?.description ||
      "Learn about Tendrils.",
  };
}

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery);

  if (!data) {
    notFound();
  }

  const hero = data.hero || {};

  let headlineText = hero.headline || data.title || "";
  let highlightText = hero.highlight || "";

  // Prevent duplicate highlight rendering
  if (highlightText && headlineText.includes(highlightText)) {
    highlightText = "";
  }

  const heroImageUrl =
    hero?.imageUrl ||
    hero?.image?.assetUrl ||
    hero?.image?.asset?.url ||
    null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">

      {/* Ambient background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#9A7625]/20 via-[#C9A227]/15 to-[#9A7625]/10 blur-[160px]" />

      <div className="pointer-events-none absolute left-10 top-1/3 h-96 w-96 rounded-full bg-[#9A7625]/10 blur-[130px]" />

      <div className="pointer-events-none absolute right-10 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[130px]" />

      {/* Floating grid */}
      <div className="pointer-events-none absolute inset-0 mx-auto grid max-w-7xl grid-cols-3 gap-6 px-6 py-20 opacity-30 md:grid-cols-4">

        <div className="h-56 translate-y-6 rounded-[2rem] border border-[#C9A227]/25 bg-white/[0.03] shadow-2xl backdrop-blur-3xl" />

        <div className="h-72 -translate-y-12 rounded-[2rem] border border-[#C9A227]/25 bg-white/[0.05] shadow-2xl backdrop-blur-3xl" />

        <div className="h-64 translate-y-10 rounded-[2rem] border border-[#C9A227]/25 bg-white/[0.03] shadow-2xl backdrop-blur-3xl" />

        <div className="h-80 -translate-y-6 rounded-[2rem] border border-[#C9A227]/25 bg-white/[0.05] shadow-2xl backdrop-blur-3xl" />

        <div className="h-60 translate-y-4 rounded-[2rem] border border-[#C9A227]/25 bg-white/[0.03] shadow-2xl backdrop-blur-3xl" />

        <div className="h-64 -translate-y-16 rounded-[2rem] border border-[#C9A227]/25 bg-white/[0.05] shadow-2xl backdrop-blur-3xl" />

        <div className="h-72 translate-y-12 rounded-[2rem] border border-[#C9A227]/25 bg-white/[0.03] shadow-2xl backdrop-blur-3xl" />

        <div className="h-60 -translate-y-8 rounded-[2rem] border border-[#C9A227]/25 bg-white/[0.05] shadow-2xl backdrop-blur-3xl" />

      </div>

      {/* Hero */}
      <section className="relative z-10 px-6 pb-28 pt-36 md:pb-36 md:pt-48">

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Hero image */}
          <div className="relative order-2 lg:order-1">

            <div className="relative min-h-[440px] w-full overflow-hidden rounded-[3rem] border border-[#C9A227]/40 bg-[#141414] shadow-2xl shadow-black/80">

              {heroImageUrl ? (
                <img
                  src={heroImageUrl}
                  alt={hero.headline || "Tendrils"}
                  className="h-full min-h-[440px] w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[440px] w-full items-center justify-center font-display text-sm text-white/30">
                  Image Area
                </div>
              )}

            </div>

          </div>

          {/* Hero content */}
          <div className="order-1 lg:order-2">

            {hero.eyebrow && (
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C9A227]/40 bg-[#161616]/90 px-5 py-2 shadow-lg backdrop-blur-md">

                <span className="h-2 w-2 animate-pulse rounded-full bg-[#C9A227]" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
                  {hero.eyebrow}
                </p>

              </div>
            )}

            <h1 className="font-display text-5xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              {headlineText}

              {highlightText && (
                <>
                  {" "}
                  <span className="text-[#C9A227]">
                    {highlightText}
                  </span>
                </>
              )}
            </h1>

            {hero.description && (
              <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-white/70">
                {hero.description}
              </p>
            )}

            {hero.primaryCta && (
              <div className="mt-8">
                <ActionLink cta={hero.primaryCta} />
              </div>
            )}

          </div>

        </div>

        {/* Bottom strip — mirrors the homepage hero's marquee + scroll cue */}
        <DarkMarqueeStrip
          label={data.partnerGrid?.label || "We work with"}
          partners={data.partnerGrid?.partners}
        />

      </section>

      {/* Universal sections */}
      <UniversalSections sections={data.sections || []} />

      {/* Partners
      {data.partnerGrid?.partners?.length > 0 && (
        <PartnerGridSection section={data.partnerGrid} />
      )} */}

    </main>
  );
}