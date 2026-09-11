"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const META = {
  service: { base: "services", label: "Related service pages" },
  industry: { base: "industries", label: "Related industry pages" },
  solution: { base: "solutions", label: "Related solution pages" },
  caseStudy: { base: "case-studies", label: "Related case-study pages" },
};

export default function ChildPagesSection({ items = [], type, parentSlug }) {
  if (!items?.length || !parentSlug) return null;

  const meta = META[type];
  if (!meta) return null;

  return (
    <section className="border-t border-[#111111]/10 bg-[#FAF7F2] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
          {meta.label}
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl tracking-tight text-[#111111] md:text-6xl">
          Explore the capabilities within this page.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const slug = typeof item.slug === "string" ? item.slug : item.slug?.current;
            if (!slug) return null;

            const href = `/${meta.base}/${parentSlug}/${slug}`;
            const title = item.name || item.title;

            return (
              <Link
                key={item._id || slug}
                href={href}
                className="group relative overflow-hidden rounded-[2rem] border border-[#111111]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/50 hover:shadow-[0_24px_60px_rgba(17,17,17,0.09)]"
              >
                <span className="absolute left-0 top-0 h-[3px] w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-full" />
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-xs tracking-[0.25em] text-[#C9A227]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[#111111]/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C9A227]" />
                </div>
                <h3 className="mt-12 font-display text-2xl text-[#111111] transition group-hover:text-[#9A7625]">
                  {title}
                </h3>
                {item.shortDescription && (
                  <p className="mt-3 text-sm leading-6 text-[#111111]/55">
                    {item.shortDescription}
                  </p>
                )}
                <span className="mt-7 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-[#9A7625]">
                  Explore page →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
