import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { caseStudiesListQuery } from "@/lib/sanity/queries";
import PageHeader from "@/components/content/PageHeader";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

export const metadata = {
  title: "Case Studies",
  description:
    "Selected Tendrils commerce transformation case studies and measurable outcomes.",
};

/* Universal Image Extractor for Case Study Hero Images */
function getCaseStudyImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;

  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source)
        .width(1200)
        .height(800)
        .fit("crop")
        .auto("format")
        .url();
    } catch (e) {
      console.warn("Case study image extraction error:", e);
    }
  }

  if (source.image) return getCaseStudyImageUrl(source.image);
  if (source.heroImage) return getCaseStudyImageUrl(source.heroImage);

  return null;
}

/* Helper to safely extract text from Sanity Portable Text objects */
function getPlainText(content) {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (typeof block === "string") return block;
        if (block && Array.isArray(block.children)) {
          return block.children.map((child) => child.text || "").join("");
        }
        return "";
      })
      .join(" ");
  }
  return "";
}

export default async function CaseStudiesPage() {
  const studies = await client.fetch(caseStudiesListQuery);

  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Proof in the work."
        description="A selection of commerce transformations, integrations, and growth systems built with measurable outcomes in mind."
      />

      <section className="bg-[#FAF7F2] px-6 py-20 md:py-28 text-stone-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-12">
            {(studies || []).map((study, index) => {
              const descriptionText = getPlainText(study.shortDescription || study.challenge);
              const isLarge = index % 3 === 0;

              // Resolve the hero image. `caseStudiesListQuery` already
              // coalesces every possible source (hero.image / legacy
              // heroImage / image) into a ready-to-use `heroImageUrl`
              // string server-side — that's the reliable source of
              // truth. The object-shaped fallbacks below only matter if
              // the query is ever changed to stop providing that string.
              const heroImgUrl =
                study.heroImageUrl ||
                getCaseStudyImageUrl(
                  study.heroImage ||
                  study.hero?.image ||
                  study.image ||
                  study.thumbnail
                );

              return (
                <Link
                  key={study._id}
                  href={`/case-studies/${study.slug}`}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white p-5 md:p-6 transition-all duration-500 hover:border-amber-600/40 hover:shadow-[0_15px_40px_rgba(201,162,39,0.1)] ${
                    isLarge ? "md:col-span-12 lg:col-span-7" : "md:col-span-6 lg:col-span-5"
                  }`}
                >
                  <div>
                    {heroImgUrl ? (
                      <div className={`relative w-full overflow-hidden rounded-xl bg-stone-100 ${isLarge ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                        <Image
                          src={heroImgUrl}
                          alt={study.heroImage?.alt || study.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className={`w-full rounded-xl bg-[#FAF7F2] ${isLarge ? "aspect-[16/9]" : "aspect-[16/10]"} flex items-center justify-center`}>
                        <span className="font-serif text-2xl text-amber-700/20">// {index + 1}</span>
                      </div>
                    )}

                    <div className="mt-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700">
                          {study.industry?.title || "Case Study"}
                        </p>
                        {study.client && (
                          <span className="text-[11px] text-stone-400">· {study.client}</span>
                        )}
                      </div>

                      <h2 className="mt-2 font-serif text-xl md:text-2xl text-stone-900 group-hover:text-amber-800 transition-colors">
                        {study.title}
                      </h2>

                      {descriptionText && (
                        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-stone-600 font-medium md:text-sm">
                          {descriptionText}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    {Array.isArray(study.results) && study.results.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-stone-100">
                        {study.results.slice(0, 2).map((result, rIndex) => {
                          if (!result) return null;
                          return (
                            <div key={`${result?.metric || "metric"}-${rIndex}`}>
                              <div className="font-serif text-lg text-amber-800 font-bold">
                                {result?.value || "—"}
                              </div>
                              <div className="mt-0.5 text-[10px] uppercase tracking-wider text-stone-500">
                                {result?.metric || "Outcome"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-100">
                      <span className="text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:text-amber-800 transition-colors">
                        Read study →
                      </span>
                      <span className="font-mono text-[10px] text-stone-400">
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {(!studies || studies.length === 0) && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-12 text-center shadow-sm">
              <h2 className="font-serif text-3xl">Case studies are coming next.</h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                We are preparing the first set of detailed client stories and measurable outcomes.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}