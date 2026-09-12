"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

export function SectionRenderer({ section, index, pageStyle }) {
  if (!section) return null;

  switch (section._type) {
    case "featureGrid":
      return <FeatureGrid section={section} index={index} />;
    case "timeline":
      return <TimelineSection section={section} index={index} />;
    case "splitContent":
      return <SplitContent section={section} index={index} />;
    case "cards":
      return <CardsSection section={section} index={index} />;
    case "process":
      return <ProcessSection section={section} index={index} />;
    case "faq":
      return <FAQSection section={section} index={index} />;
    case "quote":
      return <QuoteSection section={section} index={index} />;
    default:
      return null;
  }
}

function FeatureGrid({ section }) {
  const items = section?.items || [];
  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-24 text-ink md:py-32">
      {/* Subtle Warm Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        {section.heading && (
          <div className="mb-16 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-deep">
              // Core Capabilities
            </p>

            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-6xl">
              {section.heading}
            </h2>

            {section.description && (
              <p className="mt-4 text-base font-medium leading-relaxed text-ink/75">
                {section.description}
              </p>
            )}
          </div>
        )}

        {/* Bento Asymmetric Light Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const number =
              item.number || String(index + 1).padStart(2, "0");

            const isLarge = index % 3 === 0;
            const isLastOdd =
              items.length % 2 !== 0 && index === items.length - 1;

            return (
              <motion.article
                key={item._key || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-ink/15 bg-[#F7F2E8]/90 p-8 backdrop-blur-xl transition-all duration-500 hover:border-gold/60 hover:bg-white hover:shadow-[0_25px_60px_rgba(201,162,39,0.12)] md:p-12 ${
                  isLastOdd ? "md:col-span-2" : ""
                } ${isLarge ? "md:min-h-[360px]" : "md:min-h-[300px]"}`}
              >
                {/* Top Gold Accent Line on Hover */}
                <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold-deep transition-all duration-500 group-hover:w-full" />

                <div className="flex h-full flex-col justify-between">
                  {item?.image?.assetUrl && (
                    <img
                      src={item.image.assetUrl}
                      alt={item.title || "Capability"}
                      className="mb-8 h-44 w-full rounded-2xl border border-ink/10 object-cover"
                    />
                  )}

                  {/* Top Row: Number and Action Icon */}
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono text-sm font-extrabold tracking-[0.25em] text-gold-deep">
                      {number}
                    </span>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-xs text-ink/60 transition-all duration-300 group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-white">
                      ↗
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="mt-12">
                    <h3
                      className={`font-display font-extrabold tracking-tight text-ink transition-colors group-hover:text-gold-deep ${
                        isLarge
                          ? "text-3xl md:text-4xl"
                          : "text-2xl md:text-3xl"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-ink/80">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Footer Meta */}
                  <div className="mt-12 flex items-center justify-between border-t border-ink/10 pt-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/50">
                      Capability Module
                    </span>

                    <span className="h-px w-10 bg-gold-deep/40 transition-all duration-300 group-hover:w-20" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TIMELINE SECTION
   ========================================================= */

function TimelineSection({ section }) {
  const steps = section.steps || [];

  if (!steps.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#111111] px-6 py-24 text-[#F7F2E8] md:py-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#C9A227]/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#C9A227]/[0.025] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          heading={section.heading}
          description={section.description}
          dark
        />

        <div className="relative mt-20 md:mt-24">
          {/* Timeline Line */}
          <div className="pointer-events-none absolute bottom-0 left-[23px] top-0 w-px bg-gradient-to-b from-transparent via-[#C9A227]/35 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute bottom-0 left-[23px] top-0 w-px origin-top bg-gradient-to-b from-[#C9A227] via-[#C9A227]/50 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-14 md:space-y-20">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const number =
                step.number || String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={step._key || index}
                  initial={{
                    opacity: 0,
                    y: 35,
                    x: isLeft ? -20 : 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: Math.min(index * 0.08, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid grid-cols-[48px_1fr] gap-5 md:grid-cols-2 md:gap-20"
                >
                  {/* Mobile Number */}
                  <div className="absolute left-0 top-0 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#111111] font-display text-sm text-[#C9A227] shadow-[0_0_0_6px_rgba(201,162,39,0.05)] md:hidden">
                    {number}
                  </div>

                  {/* Desktop Left Card */}
                  {isLeft ? (
                    <div className="hidden md:flex md:justify-end">
                      <TimelineCard
                        step={step}
                        number={number}
                        index={index}
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  {/* Center Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + index * 0.06,
                    }}
                    className="absolute left-1/2 top-8 z-30 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#111111] bg-[#C9A227] shadow-[0_0_0_5px_rgba(201,162,39,0.12)] md:block"
                  />

                  {/* Connector */}
                  <div
                    className={`pointer-events-none absolute top-8 hidden h-px w-20 bg-gradient-to-r from-[#C9A227]/5 to-[#C9A227]/35 md:block ${
                      isLeft
                        ? "right-1/2 mr-2"
                        : "left-1/2 ml-2"
                    }`}
                  />

                  {/* Mobile Card */}
                  <div className="col-start-2 min-w-0 pl-0 md:col-auto md:hidden">
                    <TimelineCard
                      step={step}
                      number={number}
                      index={index}
                    />
                  </div>

                  {/* Desktop Right Card */}
                  {!isLeft ? (
                    <div className="hidden md:block">
                      <TimelineCard
                        step={step}
                        number={number}
                        index={index}
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TIMELINE CARD
   NO IMAGE — TEXT / NUMBER ONLY
   ========================================================= */

function TimelineCard({ step, number, index }) {
  const labels = ["Start", "Build", "Connect", "Scale"];

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="group relative w-full max-w-[470px] rounded-[1.75rem] border border-white/[0.09] bg-white/[0.035] p-7 transition-all duration-500 hover:border-[#C9A227]/30 hover:bg-white/[0.055] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-8"
    >
      {/* Top Gold Accent */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#C9A227] transition-all duration-700 group-hover:w-full" />

      {/* Decorative Glow */}
      <span className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#C9A227]/0 blur-3xl transition-all duration-700 group-hover:bg-[#C9A227]/[0.06]" />

      <div className="relative">
        {/* Number + Phase */}
        <div className="flex items-center justify-between">
          <span className="font-display text-5xl leading-none text-white/[0.08] transition-colors duration-500 group-hover:text-[#C9A227]/25">
            {number}
          </span>

          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A227]/60">
            Phase {number}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-8 font-display text-2xl leading-tight tracking-tight text-[#F7F2E8] transition-colors duration-500 group-hover:text-[#C9A227] md:text-3xl">
          {step.title}
        </h3>

        {/* Description */}
        {step.description && (
          <p className="mt-4 max-w-md text-sm leading-7 text-white/45 transition-colors duration-500 group-hover:text-white/60">
            {step.description}
          </p>
        )}

        {/* Bottom Label */}
        <div className="mt-7 flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A227]/35 transition-all duration-500 group-hover:w-14 group-hover:bg-[#C9A227]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 transition-colors duration-500 group-hover:text-[#C9A227]/70">
            {labels[Math.min(index, labels.length - 1)]}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function SplitContent({ section }) {
  const imageUrl =
    section.image?.assetUrl ||
    section.image?.asset?.url ||
    null;

  return (
    <section className="px-6 py-24 md:py-32">
      <div
        className={`mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 ${
          section.side === "left"
            ? "lg:[&>*:first-child]:order-2"
            : ""
        }`}
      >
        <div>
          {section.eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
              {section.eyebrow}
            </p>
          )}

          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            {section.heading}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#111111]/60">
            {section.description}
          </p>
        </div>

        <div className="min-h-[350px] overflow-hidden rounded-3xl bg-[#111111]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={section.image?.alt || section.heading || ""}
              className="h-full min-h-[350px] w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[350px] items-center justify-center">
              <Sparkles className="h-12 w-12 text-[#C9A227]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CardsSection({ section }) {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading={section.heading}
          description={section.description}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {section.cards?.map((card, index) => (
            <motion.article
              key={card._key || index}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-3xl border border-[#111111]/10 bg-white p-8 transition-shadow hover:shadow-xl"
            >
              {card?.image?.assetUrl && (
                <img
                  src={card.image.assetUrl}
                  alt={card.title || "Solution"}
                  className="mb-6 h-44 w-full rounded-2xl object-cover"
                />
              )}

              {card.tag && (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7625]">
                  {card.tag}
                </p>
              )}

              <h3 className="mt-4 font-display text-2xl">
                {card.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#111111]/60">
                {card.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ section }) {
  const steps = section?.steps || [];

  if (!steps.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#121110] px-6 py-24 text-[#F5F2EC] md:py-32">
      {/* Subtle Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading & Description */}
        {(section.heading || section.description) && (
          <div className="mb-16 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
              // Step by Step
            </p>

            {section.heading && (
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                {section.heading}
              </h2>
            )}

            {section.description && (
              <p className="mt-4 text-base font-medium leading-relaxed text-white/70">
                {section.description}
              </p>
            )}
          </div>
        )}

        {/* Process Steps Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step._key || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
            >
              {/* Number Badge */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A227] font-display font-bold text-[#121110] shadow-[0_0_20px_rgba(201,162,39,0.3)]">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-extrabold tracking-tight text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm font-medium leading-6 text-white/70">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ section }) {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          heading={section.heading || "Frequently Asked Questions"}
          description={section.description}
        />

        <div className="mt-12 divide-y divide-[#111111]/10">
          {section.items?.map((item, index) => (
            <FAQItem
              key={item._key || index}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="font-display text-xl">
          {item.question}
        </span>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#C9A227] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden"
        >
          <p className="max-w-3xl pt-4 text-sm leading-7 text-[#111111]/60">
            {item.answer}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function QuoteSection({ section }) {
  if (!section || !section.text) return null;

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-28 md:py-36">
      {/* Subtle Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="relative rounded-[3rem] border border-[#C9A227]/30 bg-white/70 p-10 text-center shadow-[0_20px_50px_rgba(201,162,39,0.08)] backdrop-blur-xl md:p-16">
          {/* Top Gold Accent Line */}
          <div className="mx-auto mb-8 h-1 w-12 rounded-full bg-[#C9A227]" />

          {/* Quote Text */}
          <blockquote className="font-display text-2xl leading-[1.3] tracking-tight text-[#111111] md:text-4xl">
            &ldquo;{section.text}&rdquo;
          </blockquote>

          {/* Author & Role */}
          {section.author && (
            <div className="mt-10 inline-flex flex-col items-center border-t border-[#111111]/10 pt-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#111111]">
                {section.author}
              </p>

              {section.role && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#C9A227]">
                  {section.role}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  heading,
  description,
  dark = false,
}) {
  return (
    <div className="max-w-3xl">
      {heading && (
        <h2
          className={`font-display text-4xl leading-tight md:text-5xl ${
            dark ? "text-[#F7F2E8]" : "text-[#111111]"
          }`}
        >
          {heading}
        </h2>
      )}

      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 ${
            dark ? "text-white/55" : "text-[#111111]/60"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function RelatedSolutionsCTA({
  services = [],
  industries = [],
  caseStudies = [],
}) {
  const groups = [
    {
      title: "Related Services",
      eyebrow: "Capabilities",
      items: services,
      href: (item) =>
        `/services/${item.slug?.current || item.slug}`,
      description: (item) =>
        item.shortDescription || item.description,
      meta: (item) => item.pillar,
    },
    {
      title: "Related Industries",
      eyebrow: "Where we work",
      items: industries,
      href: (item) =>
        `/industries/${item.slug?.current || item.slug}`,
      description: (item) =>
        item.shortDescription || item.description,
      meta: (item) =>
        item.industryCategory || item.category,
    },
    {
      title: "Case Studies",
      eyebrow: "Selected work",
      items: caseStudies,
      href: (item) =>
        `/case-studies/${item.slug?.current || item.slug}`,
      description: (item) =>
        item.shortDescription || item.description,
      meta: (item) => item.client || item.industry,
    },
  ].filter((group) => group.items?.length);

  if (!groups.length) return null;

  return (
    <section className="border-t border-[#111111]/10 px-6 py-24">
      <div className="mx-auto max-w-7xl space-y-20">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
              {group.eyebrow}
            </p>

            <h2 className="mt-4 font-display text-4xl">
              {group.title}
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {group.items.slice(0, 3).map((item, index) => (
                <Link
                  key={item._id || item._key || index}
                  href={group.href(item)}
                  className="group rounded-3xl border border-[#111111]/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[#C9A227]/40"
                >
                  {group.meta(item) && (
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7625]">
                      {group.meta(item)}
                    </p>
                  )}

                  <h3 className="mt-3 font-display text-2xl group-hover:text-[#9A7625]">
                    {item.name || item.title}
                  </h3>

                  {group.description(item) && (
                    <p className="mt-3 text-sm leading-6 text-[#111111]/55">
                      {group.description(item)}
                    </p>
                  )}

                  <span className="mt-6 inline-flex text-sm font-semibold text-[#9A7625]">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}