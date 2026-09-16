"use client";

import Image from "next/image";
import React from "react";

/**
 * Vendors / Ecosystem grid — used on Homepage and About page.
 * Pure JavaScript JSX version with interactive spotlight effect.
 */
export default function VendorsSection({ data }) {
  const items = data?.items?.filter(Boolean) || [];
  if (!items.length) return null;

  const eyebrow = data?.eyebrow || "Our Ecosystem";
  const title = data?.title || "Vendors we integrate with";
  const subtitle = data?.subtitle;

  // Spotlight mouse move handler for cards (Plain JavaScript)
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="relative overflow-hidden bg-[#F7F2E8] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl flex flex-col items-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-[#B08A2E] font-bold mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl leading-tight text-[#111111] md:text-5xl font-extrabold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base leading-7 text-[#111111]/70">
              {subtitle}
            </p>
          )}
        </div>

        {/* 4 Partners Bento / Spotlight Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {items.map((vendor) => {
            const cardContent = (
              <div 
                onMouseMove={handleMouseMove}
                className="group relative flex h-36 w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl overflow-hidden border border-black/[0.08]"
              >
                {/* Spotlight Hover Glow Overlay */}
                <div 
                  className="absolute pointer-events-none -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(212, 175, 55, 0.25), transparent 40%)`
                  }}
                />

                {vendor.imageUrl ? (
                  <div className="relative h-12 w-full max-w-[120px] z-10">
                    <Image
                      src={vendor.imageUrl}
                      alt={vendor.name || "Vendor logo"}
                      fill
                      className="object-contain grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                      sizes="160px"
                    />
                  </div>
                ) : (
                  <span className="font-display text-base font-semibold text-[#111111] z-10">
                    {vendor.name}
                  </span>
                )}
              </div>
            );

            return vendor.url ? (
              <a
                key={vendor._id}
                href={vendor.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={vendor.name}
                className="block w-full"
              >
                {cardContent}
              </a>
            ) : (
              <div key={vendor._id} className="w-full">{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}