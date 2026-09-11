import Image from "next/image";
import ChildPagesSection from "@/components/content/ChildPagesSection";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CaseStudyRenderer({ study }) {
  const hero = study.hero || {};
  const headline = hero.headline || study.title;
  const heroImage =
    hero.image?.assetUrl || study.heroImage?.assetUrl || study.heroImageUrl || study.imageUrl;
  const description =
    hero.description || study.shortDescription || study.challenge;

  return (
    <main className="bg-[#F7F2E8] text-[#111111]">
      <section className="border-b border-[#111111]/10 px-6 py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_.85fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#9A7625]">
              <span>{hero.eyebrow || "Case Study"}</span>
              {study.industry?.title && (
                <>
                  <span className="text-[#111111]/20">/</span>
                  <Link
                    href={`/industries/${study.industry.slug}`}
                    className="hover:text-[#111111]"
                  >
                    {study.industry.title}
                  </Link>
                </>
              )}
            </div>

            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
              {headline}
              {hero.highlight && (
                <>
                  {" "}
                  <span className="text-[#C9A227]">{hero.highlight}</span>
                </>
              )}
            </h1>

            {description && (
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#111111]/65">
                {typeof description === "string" ? description : "View case study details below."}
              </p>
            )}

            {study.client && (
              <p className="mt-8 text-sm font-semibold text-[#111111]/55">
                Client · <span className="text-[#111111]">{study.client}</span>
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={hero.primaryCta?.href || "/contact"}
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-7 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#E2C66B]"
              >
                {hero.primaryCta?.label || "Start a conversation"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href={hero.secondaryCta?.href || "/case-studies"}
                className="inline-flex items-center rounded-full border border-[#111111]/15 px-7 py-3.5 text-sm font-semibold transition hover:border-[#C9A227] hover:text-[#9A7625]"
              >
                {hero.secondaryCta?.label || "View case studies"}
              </Link>
            </div>
          </div>

          {heroImage ? (
            <div className="relative min-h-[360px] overflow-hidden rounded-[40px] bg-[#111111]">
              <Image
                src={heroImage}
                alt={hero.image?.alt || study.heroImage?.alt || study.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          ) : (
            <div className="relative min-h-[360px] overflow-hidden rounded-[40px] bg-[#111111]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,.22),transparent_45%)]" />
              <div className="absolute inset-10 rounded-[32px] border border-[#C9A227]/20" />
              <div className="absolute inset-20 rounded-[24px] border border-[#C9A227]/10" />
            </div>
          )}
        </div>
      </section>

      {Array.isArray(study.results) && study.results.length > 0 && (
        <section className="bg-[#111111] px-6 py-16 text-[#F7F2E8]">
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((result, index) => {
              if (!result) return null;
              return (
                <div key={`${result?.metric || "metric"}-${index}`}>
                  <p className="font-display text-4xl text-[#C9A227] md:text-5xl">
                    {result?.value || "—"}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">
                    {result?.metric || "Outcome"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.35fr_.65fr]">
          <article>
            <StorySection label="The Challenge" value={study.challenge} />
            <StorySection label="The Approach" value={study.approach} />
            <StorySection label="The Solution" value={study.solution} />
            <StorySection label="The Execution" value={study.execution} />

            {study.body?.length > 0 && (
              <div className="mt-16 border-t border-[#111111]/10 pt-14">
                <RichText value={study.body} />
              </div>
            )}

            {study.gallery?.length > 0 && (
              <div className="mt-16 grid gap-5 md:grid-cols-2">
                {study.gallery.map((image, index) =>
                  image?.assetUrl ? (
                    <div
                      key={image._key || index}
                      className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white"
                    >
                      <Image
                        src={image.assetUrl}
                        alt={image.alt || `${study.title} image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : null
                )}
              </div>
            )}
          </article>

          <aside className="space-y-6">
            {study.stack?.length > 0 && (
              <div className="rounded-3xl border border-[#111111]/10 bg-white p-8">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7625]">
                  Technology
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.stack.map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className="rounded-full bg-[#F7F2E8] px-3 py-2 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {study.servicesUsed?.length > 0 && (
              <div className="rounded-3xl border border-[#111111]/10 bg-white p-8">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7625]">
                  Services
                </p>
                <div className="mt-5 space-y-3">
                  {study.servicesUsed.map((service) => (
                    <Link
                      key={service._id}
                      href={`/services/${service.slug}`}
                      className="block text-sm font-medium transition hover:text-[#9A7625]"
                    >
                      {service.name} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {study.quote && (
        <section className="bg-[#EDE6D9] px-6 py-24 md:py-32">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-display text-3xl italic leading-relaxed md:text-5xl">
              “{study.quote}”
            </p>
            {(study.quoteAuthor || study.quoteRole) && (
              <footer className="mt-7 text-sm text-[#111111]/55">
                {[study.quoteAuthor, study.quoteRole]
                  .filter(Boolean)
                  .join(" · ")}
              </footer>
            )}
          </blockquote>
        </section>
      )}

      {study.relatedCaseStudies?.length > 0 && (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
                  More Work
                </p>
                <h2 className="mt-3 font-display text-4xl md:text-5xl">
                  Related case studies.
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="hidden text-sm font-semibold text-[#9A7625] md:block"
              >
                View all →
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {study.relatedCaseStudies.map((item) => (
                <Link
                  key={item._id}
                  href={`/case-studies/${item.slug}`}
                  className="group rounded-3xl bg-[#111111] p-7 text-[#F7F2E8] transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                    {item.industry?.title || "Case Study"}
                  </p>
                  <h3 className="mt-4 font-display text-2xl group-hover:text-[#C9A227]">
                    {item.title}
                  </h3>
                  {item.client && (
                    <p className="mt-2 text-sm text-white/45">{item.client}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#C9A227] px-6 py-24 text-[#111111] md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em]">
            Your next transformation
          </p>
          <h2 className="mt-5 font-display text-5xl tracking-tight md:text-7xl">
            Have a similar commerce challenge?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#111111]/65">
            Tell us where your commerce operation is today and what needs to
            change next.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex rounded-full bg-[#111111] px-8 py-4 text-sm font-semibold text-[#E2C66B] transition hover:bg-white hover:text-[#111111]"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
          <ChildPagesSection items={study.children} type="caseStudy" parentSlug={study.slug} />\n\n</main>
  );
}

function StorySection({ label, value }) {
  if (!value) return null;

  return (
    <section className="border-b border-[#111111]/10 py-10 first:pt-0">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7625]">
        {label}
      </p>
      <div className="mt-5 max-w-4xl text-lg leading-8 text-[#111111]/70">
        {Array.isArray(value) ? (
          <PortableText value={value} />
        ) : (
          <p>{value}</p>
        )}
      </div>
    </section>
  );
}

function RichText({ value }) {
  if (!value?.length) return null;

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[#111111] prose-p:text-[#111111]/70 prose-a:text-[#9A7625] prose-strong:text-[#111111]">
      <PortableText
        value={value}
        components={{
          types: {
            image: ({ value: image }) =>
              image?.assetUrl ? (
                <div className="relative my-10 aspect-[16/9] overflow-hidden rounded-3xl">
                  <Image
                    src={image.assetUrl}
                    alt={image.alt || "Case study content"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              ) : null,
          },
        }}
      />
    </div>
  );
}