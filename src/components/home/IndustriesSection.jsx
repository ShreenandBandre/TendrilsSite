"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fallbackData = {
  eyebrow: "Industries",
  title: "Built for your industry",
  subtitle:
    "Commerce systems shaped around how your category actually sells, ships, and scales.",
  cta: {
    label: "View all industries",
    href: "/industries",
  },
  items: [
    {
      _id: "fallback-fashion",
      title: "Fashion & Apparel",
      slug: "fashion-apparel",
      shortDescription:
        "High-velocity catalogs, size logic, and seasonal drops without the operational chaos.",
    },
    {
      _id: "fallback-cpg",
      title: "CPG & Beauty",
      slug: "cpg-beauty",
      shortDescription:
        "Subscription, replenishment, and retail-grade fulfillment built to scale.",
    },
    {
      _id: "fallback-furniture",
      title: "Furniture & Home",
      slug: "furniture-home",
      shortDescription:
        "Complex variants, freight logistics, and made-to-order commerce, simplified.",
    },
    {
      _id: "fallback-b2b",
      title: "B2B & Wholesale",
      slug: "b2b-wholesale",
      shortDescription:
        "Net terms, tiered pricing, and account-based buying on modern commerce rails.",
    },
  ],
};

/* =========================================================
   IMAGE URL RESOLVER
========================================================= */

function getImageUrl(item) {
  if (!item) return null;

  /*
   * 1. Direct URL
   */
  if (typeof item.imageUrl === "string" && item.imageUrl) {
    return item.imageUrl;
  }

  if (typeof item.heroImageUrl === "string" && item.heroImageUrl) {
    return item.heroImageUrl;
  }

  /*
   * 2. homeImage
   */
  if (typeof item.homeImage?.assetUrl === "string") {
    return item.homeImage.assetUrl;
  }

  if (typeof item.homeImage?.asset?.url === "string") {
    return item.homeImage.asset.url;
  }

  /*
   * 3. image
   */
  if (typeof item.image?.assetUrl === "string") {
    return item.image.assetUrl;
  }

  if (typeof item.image?.asset?.url === "string") {
    return item.image.asset.url;
  }

  /*
   * 4. hero.image
   */
  if (typeof item.hero?.image?.assetUrl === "string") {
    return item.hero.image.assetUrl;
  }

  if (typeof item.hero?.image?.asset?.url === "string") {
    return item.hero.image.asset.url;
  }

  /*
   * 5. heroImage
   */
  if (typeof item.heroImage?.assetUrl === "string") {
    return item.heroImage.assetUrl;
  }

  if (typeof item.heroImage?.asset?.url === "string") {
    return item.heroImage.asset.url;
  }

  return null;
}

/* =========================================================
   SLUG RESOLVER
========================================================= */

function getSlug(item) {
  if (!item) return null;

  if (typeof item.slug === "string") {
    return item.slug;
  }

  if (typeof item.slug?.current === "string") {
    return item.slug.current;
  }

  return null;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function IndustriesSection({ data }) {

  const eyebrow =
    data?.eyebrow || fallbackData.eyebrow;

  const title =
    data?.title || fallbackData.title;

  const subtitle =
    data?.subtitle || fallbackData.subtitle;

  const cta =
    data?.cta?.href
      ? data.cta
      : fallbackData.cta;

  /*
   * Use REAL Sanity Industry documents whenever
   * they are available.
   */
  const items =
    Array.isArray(data?.items) && data.items.length > 0
      ? data.items
      : fallbackData.items;

  return (
    <section className="relative w-full overflow-hidden bg-ivory px-6 py-24 md:py-32">

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-2xl"
          >

            <div className="mb-5 flex items-center gap-4">

              <div className="h-[2px] w-12 bg-gold" />

              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                {eyebrow}
              </span>

            </div>

            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">
                {subtitle}
              </p>
            )}

          </motion.div>

          {cta?.href && (
            <Link
              href={cta.href}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-gold hover:text-gold"
            >

              {cta.label || "View all industries"}

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />

            </Link>
          )}

        </div>

        {/* =================================================
            GRID
        ================================================= */}

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {items.map((item, idx) => {

            const slug = getSlug(item);

            const href = slug
              ? `/industries/${slug}`
              : cta?.href || "/industries";

            const imageUrl = getImageUrl(item);

            return (
              <motion.div
                key={item?._id || idx}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >

                <Link
                  href={href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10"
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative h-44 w-full overflow-hidden bg-ink/5">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item?.title || "Industry"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-display text-3xl text-ink/15">
                          {item?.title?.charAt(0) || "I"}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="flex flex-1 flex-col p-6">

                    {item?.category && (
                      <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                        {item.category}
                      </span>
                    )}

                    <h3 className="font-display text-xl text-ink">
                      {item?.title}
                    </h3>

                    {(item?.shortDescription || item?.summary) && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/60">
                        {item.shortDescription || item.summary}
                      </p>
                    )}

                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink/80 transition-colors duration-300 group-hover:text-gold">

                      Explore

                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />

                    </span>

                  </div>

                </Link>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}