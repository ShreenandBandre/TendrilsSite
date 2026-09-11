import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import {
  caseStudiesQuery,
  caseStudyBySlugQuery,
  caseStudyHierarchyQuery,
} from "@/lib/sanity/queries";
import CaseStudyRenderer from "@/components/case-studies/CaseStudyRenderer";

export const revalidate = 60;

export async function generateStaticParams() {
  const items = await client.fetch(caseStudyHierarchyQuery);
  const byId = new Map((items || []).map((x) => [x._id, x]));
  const pathFor = (item, seen = new Set()) => {
    if (!item || seen.has(item._id)) return item?.slug;
    const next = new Set(seen); next.add(item._id);
    const parent = item.parentId ? byId.get(item.parentId) : null;
    return [parent ? pathFor(parent, next) : "", item.slug].filter(Boolean).join("/");
  };
  return (items || []).map((item) => ({ slug: pathFor(item).split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }) {
  const { slug: segments } = await params;
  const slug = Array.isArray(segments) ? segments[segments.length - 1] : segments;
  const study = await client.fetch(caseStudyBySlugQuery, { slug });

  if (!study) return {};

  const title = study.seo?.metaTitle || study.seo?.title || study.title;
  const description =
    study.seo?.metaDescription ||
    study.seo?.description ||
    study.shortDescription ||
    study.challenge;

  return {
    title,
    description,
    robots: study.seo?.noIndex
      ? { index: false, follow: false }
      : undefined,
    openGraph: {
      title,
      description,
      images: study.seo?.ogImage?.assetUrl
        ? [study.seo.ogImage.assetUrl]
        : study.hero?.image?.assetUrl
          ? [study.hero.image.assetUrl]
          : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug: segments } = await params;
  const slug = Array.isArray(segments) ? segments[segments.length - 1] : segments;
  const study = await client.fetch(caseStudyBySlugQuery, { slug });

  if (!study) notFound();

  return <CaseStudyRenderer study={study} />;
}
