"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  Share2,
  MousePointerClick,
  PenTool,
  Mail,
} from "lucide-react";
import { urlFor } from "@/lib/sanity/image";

/* =========================================================
   HARD-CODED DIGITAL MARKETING CONTENT
   Images can be connected from Sanity later.
========================================================= */

const DIGITAL_MARKETING_ITEMS = [
  {
    id: "seo",
    number: "01",
    title: "SEO",
    category: "SEARCH ENGINE OPTIMIZATION",
    shortTitle: "SEO",
    description:
      "At Tendril.io, we deeply understand search engine optimization (SEO) and how to drive organic traffic to your website. Our team of SEO experts can help you improve your website’s ranking on search engine results pages (SERPs) by optimizing your content, improving your website’s architecture, and building high-quality backlinks.",
    icon: Search,
    slug: "seo",
  },

  {
    id: "smm",
    number: "02",
    title: "SMM",
    category: "SOCIAL MEDIA MARKETING",
    shortTitle: "SMM",
    description:
      "Social media marketing (SMM) is essential to any digital marketing strategy. Our team of social media experts can help you build a strong social media presence, engage with your followers, and drive traffic to your website. We can help you with everything from social media strategy and content creation to social media advertising and analytics.",
    icon: Share2,
    slug: "smm",
  },

  {
    id: "ppc",
    number: "03",
    title: "PPC",
    category: "PAID ADVERTISING",
    shortTitle: "PPC",
    description:
      "Pay-per-click advertising helps businesses reach the right audience at the right moment. Our approach focuses on creating targeted campaigns, optimizing ad performance, and improving conversion opportunities while keeping your marketing spend efficient.",
    icon: MousePointerClick,
    slug: "ppc",
  },

  {
    id: "content",
    number: "04",
    title: "Content Marketing",
    category: "CONTENT STRATEGY",
    shortTitle: "CONTENT",
    description:
      "Content marketing helps brands communicate their value through useful, relevant, and engaging content. We create content strategies designed to attract your audience, build credibility, support search visibility, and turn attention into meaningful business opportunities.",
    icon: PenTool,
    slug: "content-marketing",
  },

  {
    id: "email",
    number: "05",
    title: "Email Marketing",
    category: "CUSTOMER ENGAGEMENT",
    shortTitle: "EMAIL",
    description:
      "Email marketing allows brands to build stronger relationships with their customers through relevant and timely communication. From campaign strategy to content and optimization, we help create email experiences that encourage engagement and repeat conversions.",
    icon: Mail,
    slug: "email-marketing",
  },
];

/* =========================================================
   IMAGE HELPER
   Resolves the Sanity image for a marketing grid item.
   Matched by "key" (seo/smm/ppc/content/email), not by index —
   the old index-based match against the unrelated services
   list is why images never showed up here.
========================================================= */

function getImageUrl(sanityItem) {
  if (!sanityItem) return null;

  if (typeof sanityItem.imageUrl === "string" && sanityItem.imageUrl.trim()) {
    return sanityItem.imageUrl;
  }

  if (typeof sanityItem.image?.assetUrl === "string" && sanityItem.image.assetUrl.trim()) {
    return sanityItem.image.assetUrl;
  }

  if (!sanityItem.image) return null;

  try {
    return urlFor(sanityItem.image)
      .width(1400)
      .height(900)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}

export default function DigitalMarketingGrid({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const baseItem =
    DIGITAL_MARKETING_ITEMS[activeIndex] || DIGITAL_MARKETING_ITEMS[0];

  /*
    "items" here is the Sanity `marketingGrid` array — matched to the
    hardcoded content by "key" so SEO always gets the SEO image, etc.
    Title/description from Sanity override the defaults when present;
    otherwise the hardcoded copy is used so the section never looks empty.
  */
  const sanityItems = Array.isArray(items) ? items : [];
  const currentSanityItem =
    sanityItems.find((entry) => entry?.key === baseItem.id) || null;

  const currentItem = {
    ...baseItem,
    title: currentSanityItem?.title || baseItem.title,
    description: currentSanityItem?.description || baseItem.description,
  };

  const imageUrl = getImageUrl(currentSanityItem);

  const Icon = currentItem.icon;

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-24 text-[#111111] md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C96A18]">
              // Digital Marketing
            </p>

            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
              Digital strategies built to move your business forward.
            </h2>
          </div>

          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C96A18] transition-colors hover:text-[#111111]"
          >
            Explore all services
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* =====================================================
            MAIN SPLIT LAYOUT

            LEFT  = 50%
            RIGHT = 50%

            This is the important part:
            left card is now equivalent in width to right side.
        ===================================================== */}

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">

          {/* ===================================================
              LEFT — LARGE FEATURED CARD
          =================================================== */}

          <div className="h-full">
            <motion.div
              layout
              className="relative flex h-full min-h-[760px] flex-col overflow-hidden rounded-[2.5rem] border border-[#E9D8C4] bg-white p-7 shadow-[0_20px_60px_rgba(60,40,20,0.06)] md:p-10"
            >

              {/* TOP META */}

              <div className="flex items-center justify-between border-b border-[#E8DED2] pb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C96A18]">
                  Digital Marketing
                </span>

                <span className="rounded-full border border-[#F0D9C1] bg-[#FFF9F3] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C96A18]">
                  {currentItem.shortTitle}
                </span>
              </div>

              {/* =================================================
                  TITLE + DESCRIPTION
              ================================================= */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <div className="mb-3 font-mono text-sm font-bold tracking-widest text-[#C96A18]">
                    {currentItem.number}.
                  </div>

                  <h3 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
                    {currentItem.title}
                  </h3>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-[#111111]/65 md:text-lg">
                    {currentItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* =================================================
                  LARGE IMAGE / VISUAL AREA

                  Later Sanity image will appear here.
              ================================================= */}

              <div className="relative mt-8 min-h-[350px] flex-1 overflow-hidden rounded-[2rem] bg-[#F5EFE7] md:min-h-[390px]">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={currentItem.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF9F2] via-[#F8F0E6] to-[#E7DED3]">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#E6B98E] bg-white/60">
                          <Icon
                            size={40}
                            strokeWidth={1.5}
                            className="text-[#E58A42]"
                          />
                        </div>

                        <span className="mt-6 font-display text-2xl font-semibold text-[#29231E]">
                          {currentItem.title}
                        </span>

                        <span className="mt-2 text-sm text-[#29231E]/50">
                          {currentItem.category}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Image overlay label */}

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-white/90 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C96A18] shadow-lg backdrop-blur-md">
                  {currentItem.category}
                </div>
              </div>

              {/* =================================================
                  BOTTOM ACTION
              ================================================= */}

              <div className="mt-7 flex items-center justify-between border-t border-[#E8DED2] pt-6">

                <span className="font-mono text-xs font-bold tracking-widest text-[#111111]/35">
                  {currentItem.number} / 05
                </span>

                <Link
                  href={`/services`}
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C96A18] transition-colors hover:text-[#111111]"
                >
                  View More

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ===================================================
              RIGHT — 5 HARD-CODED CARDS
          =================================================== */}

          <div className="flex h-full flex-col gap-5">

            {DIGITAL_MARKETING_ITEMS.map((item, index) => {
              const isActive = activeIndex === index;
              const ItemIcon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className={`group relative flex min-h-[132px] w-full items-center gap-5 overflow-hidden rounded-[1.5rem] border p-5 text-left transition-all duration-300 md:p-6 ${
                    isActive
                      ? "border-[#E58A42] bg-white shadow-[0_15px_40px_rgba(229,138,66,0.10)]"
                      : "border-[#E9D8C4] bg-white/65 hover:border-[#E58A42]/50 hover:bg-white"
                  }`}
                >

                  {/* Active orange line */}

                  <div
                    className={`absolute left-0 top-0 h-full w-1.5 rounded-r-full transition-all duration-300 ${
                      isActive ? "bg-[#E58A42]" : "bg-transparent"
                    }`}
                  />

                  {/* Number / Icon Box */}

                  <div
                    className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "border-[#F0C49D] bg-[#FFF7EF]"
                        : "border-[#EBDCCB] bg-[#FFFDF9]"
                    }`}
                  >
                    <ItemIcon
                      size={28}
                      strokeWidth={1.5}
                      className={`transition-colors ${
                        isActive
                          ? "text-[#E58A42]"
                          : "text-[#111111]/40 group-hover:text-[#E58A42]"
                      }`}
                    />
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">

                    <div className="mb-1 font-mono text-[10px] font-bold tracking-[0.2em] text-[#C96A18]">
                      {item.number}.
                    </div>

                    <h4
                      className={`font-display text-xl font-semibold transition-colors md:text-2xl ${
                        isActive
                          ? "text-[#111111]"
                          : "text-[#111111]/80 group-hover:text-[#111111]"
                      }`}
                    >
                      {item.title}
                    </h4>

                    <p className="mt-1 line-clamp-2 max-w-md text-sm leading-5 text-[#111111]/55">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? "border-[#E58A42] bg-[#E58A42] text-white"
                        : "border-[#E7D5C2] text-[#111111]/35 group-hover:border-[#E58A42] group-hover:text-[#E58A42]"
                    }`}
                  >
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}