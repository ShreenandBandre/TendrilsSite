"use client";

import SectionHeading from "./SectionHeading";
import ActionLink from "@/components/content/ActionLink";
import { urlFor } from "@/lib/sanity/image";

/**
 * Universal Image Extractor:
 * 1. Dereferenced URL (assetUrl, asset.url, imageUrl)
 * 2. Raw Sanity reference (_ref) -> urlFor()
 */
function getStepImageUrl(step) {
  if (!step) return null;
  const target = step.image || step.heroImage || step.icon || step.photo;

  if (!target && step.imageUrl) return step.imageUrl;
  if (!target && step.assetUrl) return step.assetUrl;
  if (!target) return null;

  if (typeof target === "string" && target.startsWith("http")) return target;
  if (target.assetUrl) return target.assetUrl;
  if (target.asset?.url) return target.asset.url;
  if (target.url) return target.url;

  if (target.asset?._ref || target._ref) {
    try {
      return urlFor(target)
        .width(1200)
        .height(800)
        .fit("crop")
        .auto("format")
        .url();
    } catch (error) {
      console.warn("ProcessSection image resolution error:", error);
    }
  }

  return null;
}

export default function ProcessSection({ section }) {
  const steps = section?.steps || [];
  if (!steps.length) return null;

  const count = steps.length;

  // Badi aur impactful layout widths
  const getGridConfig = () => {
    if (count === 1) return "max-w-2xl mx-auto grid-cols-1";
    if (count === 2) return "max-w-5xl mx-auto grid-cols-1 md:grid-cols-2";
    if (count === 3) return "max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    return "max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  };

  return (
    <section className="relative px-6 py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SectionHeading heading={section.heading} />
        </div>

        {/* Dynamic Centered Grid with Larger Cards */}
        <div className={`grid gap-8 lg:gap-10 justify-center ${getGridConfig()}`}>
          {steps.map((step, index) => {
            const imgSrc = getStepImageUrl(step);

            return (
              <div
                key={step._key || index}
                className="group relative flex flex-col items-center text-center md:items-start md:text-left rounded-[2.5rem] border border-[#111111]/10 bg-white/70 p-7 sm:p-9 md:p-10 backdrop-blur-md shadow-[0_20px_50px_rgba(40,32,20,0.05)] transition-all duration-500 hover:border-[#C9A227]/50 hover:bg-white/90 hover:shadow-[0_25px_60px_rgba(201,162,39,0.12)] hover:-translate-y-1.5"
              >
                {/* Larger Step Number Badge */}
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A227] font-display text-lg font-bold text-[#111111] shadow-lg shadow-[#C9A227]/25 transition-transform duration-500 group-hover:scale-110">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Substantially Larger Step Image Frame */}
                {imgSrc && (
                  <div className="mb-7 h-60 md:h-72 w-full overflow-hidden rounded-2xl bg-[#111111]/5 shadow-inner">
                    <img
                      src={imgSrc}
                      alt={step.title || `Step ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Larger Title & Editorial Description */}
                <h3 className="font-display text-2xl md:text-3xl text-[#111111] leading-tight transition-colors duration-300 group-hover:text-[#9A7625]">
                  {step.title}
                </h3>

                {step.description && (
                  <p className="mt-4 text-base leading-relaxed text-[#111111]/70 font-normal">
                    {step.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Centered CTA */}
        {section.cta && (
          <div className="mt-16 flex justify-center">
            <ActionLink cta={section.cta} />
          </div>
        )}
      </div>
    </section>
  );
}