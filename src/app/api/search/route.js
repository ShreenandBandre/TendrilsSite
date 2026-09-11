import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

const TYPES = [
  { type: "service", title: "name", base: "services" },
  { type: "industry", title: "title", base: "industries" },
  { type: "solution", title: "title", base: "solutions" },
  { type: "caseStudy", title: "title", base: "case-studies" },
];

function buildPaths(items, base) {
  const byId = new Map(items.map((item) => [item._id, item]));
  const cache = new Map();

  function pathFor(item, seen = new Set()) {
    if (!item) return "";
    if (cache.has(item._id)) return cache.get(item._id);
    if (seen.has(item._id)) return item.slug || "";

    const next = new Set(seen);
    next.add(item._id);

    const parent = item.parentId ? byId.get(item.parentId) : null;
    const value = [parent ? pathFor(parent, next) : "", item.slug]
      .filter(Boolean)
      .join("/");

    cache.set(item._id, value);
    return value;
  }

  return items.map((item) => ({ ...item, href: `/${base}/${pathFor(item)}` }));
}

// Lightweight relevance ranking so exact / prefix title matches surface first.
function scoreItem(item, normalizedQuery) {
  const title = String(item.title || "").toLowerCase();
  if (title === normalizedQuery) return 3;
  if (title.startsWith(normalizedQuery)) return 2;
  if (title.includes(normalizedQuery)) return 1.5;
  return 1;
}

export async function GET(request) {
  try {
    const q = new URL(request.url).searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    const normalizedQuery = q.toLowerCase();
    const pattern = `*${q}*`;

    const results = await Promise.all(
      TYPES.map(async ({ type, title, base }) => {
        // Filter inside Sanity (case-insensitive match) instead of pulling
        // every document of the type down to filter in JS — this scales
        // far better as content grows and keeps each request lean.
        const [items, slugIndex] = await Promise.all([
          client.fetch(
            `*[
              _type == $type &&
              defined(slug.current) &&
              (
                ${title} match $pattern ||
                shortDescription match $pattern ||
                category match $pattern
              )
            ]{
              _id,
              "title": ${title},
              "slug": slug.current,
              "parentId": parent._ref,
              shortDescription,
              category
            }`,
            { type, pattern }
          ),
          // Lightweight index (3 fields only) used purely to resolve
          // nested slugs (e.g. service > child service) for hrefs.
          client.fetch(
            `*[_type == $type && defined(slug.current)]{
              _id, "slug": slug.current, "parentId": parent._ref
            }`,
            { type }
          ),
        ]);

        const parentIndex = new Map(slugIndex.map((p) => [p._id, p]));
        const enriched = items.map((item) => ({
          ...item,
          parentId: item.parentId || parentIndex.get(item._id)?.parentId,
        }));

        return buildPaths(enriched, base).map((item) => ({
          _id: item._id,
          title: item.title,
          type,
          href: item.href,
          shortDescription: item.shortDescription || "",
          category: item.category || "",
          _score: scoreItem(item, normalizedQuery),
        }));
      })
    );

    const flat = results
      .flat()
      .sort((a, b) => b._score - a._score)
      .slice(0, 20)
      .map(({ _score, ...rest }) => rest);

    return NextResponse.json({ results: flat });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { results: [], error: "Search failed" },
      { status: 500 }
    );
  }
}
