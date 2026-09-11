import { notFound } from "next/navigation";

import ServicePageRenderer from "@/components/services/ServicePageRenderer";
import ReelsScrollWrapper from "@/components/services/ReelsScrollWrapper";
import { client } from "@/lib/sanity/client";
import {
  serviceBySlugQuery,
  serviceHierarchyQuery,
} from "@/lib/sanity/queries";

// Cache kill karo taaki Sanity ka content instant refresh ho
// export const dynamic = "force-dynamic";
export const revalidate = 0;

/* =========================================================
   BUILD FULL SERVICE PATH
========================================================= */
function buildServicePath(item, byId, seen = new Set()) {
  if (!item || !item.slug) return "";
  if (seen.has(item._id)) return item.slug;

  const nextSeen = new Set(seen);
  nextSeen.add(item._id);

  const parent = item.parentId ? byId.get(item.parentId) : null;
  const parentPath = parent ? buildServicePath(parent, byId, nextSeen) : "";

  return [parentPath, item.slug].filter(Boolean).join("/");
}

export async function generateStaticParams() {
  try {
    const items = await client.fetch(serviceHierarchyQuery);
    const services = Array.isArray(items) ? items : [];
    const byId = new Map(services.map((item) => [item._id, item]));

    return services
      .map((item) => {
        const fullPath = buildServicePath(item, byId);
        if (!fullPath) return null;
        return { slug: fullPath.split("/").filter(Boolean) };
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Could not generate service params:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const segments = Array.isArray(resolvedParams?.slug)
    ? resolvedParams.slug
    : [resolvedParams?.slug].filter(Boolean);

  const slug = segments[segments.length - 1];
  if (!slug) return { title: "Services | Tendrils" };

  try {
    const service = await client.fetch(
      serviceBySlugQuery,
      { slug },
      { cache: "no-store" }
    );
    if (!service) return { title: "Service | Tendrils" };

    return {
      title: service.seo?.title || `${service.name} | Tendrils`,
      description: service.seo?.description || service.shortDescription || "",
    };
  } catch {
    return { title: "Service | Tendrils" };
  }
}

export default async function ServicePage({ params }) {
  const resolvedParams = await params;
  const segments = Array.isArray(resolvedParams?.slug)
    ? resolvedParams.slug
    : [resolvedParams?.slug].filter(Boolean);

  if (!segments.length) notFound();

  const slug = segments[segments.length - 1];
  let service = null;

  try {
    // Fresh fetch without cache
    service = await client.fetch(
      serviceBySlugQuery,
      { slug },
      { cache: "no-store", next: { revalidate: 0 } }
    );
  } catch (error) {
    console.warn(`Could not load service "${slug}" from Sanity:`, error?.message);
  }

  if (!service) notFound();

  return (
    <ReelsScrollWrapper>
      <ServicePageRenderer service={service} />
    </ReelsScrollWrapper>
  );
}