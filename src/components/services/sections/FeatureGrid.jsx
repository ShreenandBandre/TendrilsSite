"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { urlFor } from "@/lib/sanity/image";
import ActionLink from "@/components/content/ActionLink";

export default function FeatureGrid({ section }) {
  const items = section?.items || [];

  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#EDE2D0] px-6 py-20 md:px-8 md:py-28">

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="
          absolute
          -left-40
          top-1/4
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-[#C9A227]/10
          blur-[130px]
        " />

        <div className="
          absolute
          -right-40
          bottom-1/4
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-[#9A7625]/10
          blur-[130px]
        " />

        {/* Subtle editorial grid */}
        <div className="
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)]
          [background-size:70px_70px]
        " />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADING
        ===================================================== */}
        <div className="mb-14">
          <SectionHeading
            heading={section.heading}
            description={section.description}
          />
        </div>

        {/* =====================================================
            GRID (Original 3-Column Bento Layout)
        ===================================================== */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {items.map((item, index) => {
            const number =
              item.number ||
              String(index + 1).padStart(2, "0");

            /*
             * First and fourth cards are visually larger (Original Bento Span)
             */
            const isFeatured = index === 0 || index === 3;

            /*
             * Robust Sanity image resolution
             */
            let imageUrl = null;
            const targetImage = item.image || item.heroImage;

            if (targetImage) {
              if (typeof targetImage === "string") {
                imageUrl = targetImage;
              } else if (targetImage.assetUrl) {
                imageUrl = targetImage.assetUrl;
              } else if (targetImage.asset?.url) {
                imageUrl = targetImage.asset.url;
              } else {
                try {
                  imageUrl = urlFor(targetImage)
                    .width(1400)
                    .height(900)
                    .fit("crop")
                    .auto("format")
                    .url();
                } catch (error) {
                  console.error(
                    `FeatureGrid image error for "${item.title}":`,
                    error
                  );
                }
              }
            } else if (item.imageUrl) {
              imageUrl = item.imageUrl;
            }

            return (
              <motion.article
                key={item._key || index}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/60
                  bg-white/[0.48]
                  backdrop-blur-md
                  shadow-[0_20px_50px_rgba(40,32,20,0.04)]
                  transition-all
                  duration-500
                  hover:border-[#C9A227]/60
                  hover:bg-white/[0.72]
                  hover:shadow-[0_30px_70px_rgba(40,32,20,0.09)]
                  ${isFeatured ? "lg:col-span-2" : "lg:col-span-1"}
                `}
              >

                {/* =================================================
                    IMAGE
                ================================================= */}
                {imageUrl && (
                  <div
                    className={`
                      relative
                      overflow-hidden
                      ${
                        isFeatured
                          ? "h-[240px] md:h-[300px]"
                          : "h-[200px] md:h-[220px]"
                      }
                    `}
                  >
                    <img
                      src={imageUrl}
                      alt={
                        item.title ||
                        "Service capability"
                      }
                      loading={index < 2 ? "eager" : "lazy"}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:scale-[1.045]
                      "
                    />

                    {/* Image gradient */}
                    <div className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#111111]/35
                      via-[#111111]/5
                      to-transparent
                    " />

                    {/* Image hover glow */}
                    <div className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-white/10
                      via-transparent
                      to-[#C9A227]/10
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    " />

                    {/* Gold image accent */}
                    <div className="
                      absolute
                      bottom-0
                      left-0
                      h-[3px]
                      w-0
                      bg-[#C9A227]
                      transition-all
                      duration-700
                      group-hover:w-full
                    " />
                  </div>
                )}

                {/* =================================================
                    CONTENT
                ================================================= */}
                <div
                  className={`
                    relative
                    flex
                    flex-col
                    justify-between
                    p-7
                    md:p-8
                    ${
                      imageUrl
                        ? "min-h-[270px]"
                        : "min-h-[330px]"
                    }
                  `}
                >

                  {/* TOP */}
                  <div className="
                    flex
                    items-start
                    justify-between
                  ">
                    <span className="
                      font-display
                      text-4xl
                      leading-none
                      text-[#111111]/15
                      transition-colors
                      duration-500
                      group-hover:text-[#C9A227]
                    ">
                      {number}
                    </span>

                    <span className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#111111]/10
                      bg-white/60
                      text-sm
                      text-[#111111]/40
                      transition-all
                      duration-500
                      group-hover:border-[#C9A227]/40
                      group-hover:bg-[#C9A227]
                      group-hover:text-[#111111]
                    ">
                      <span className="
                        transition-transform
                        duration-500
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      ">
                        ↗
                      </span>
                    </span>
                  </div>

                  {/* TEXT */}
                  <div className="mt-9">
                    <h3 className="
                      max-w-2xl
                      font-display
                      text-2xl
                      leading-[1.05]
                      tracking-tight
                      text-[#111111]
                      transition-colors
                      duration-500
                      group-hover:text-[#9A7625]
                      md:text-[1.7rem]
                    ">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-6
                        text-[#111111]/60
                        transition-colors
                        duration-500
                        group-hover:text-[#111111]/80
                      ">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* BOTTOM */}
                  <ActionLink cta={item.cta} className="mt-5 !px-4 !py-2" />

                  <div className="
                    mt-8
                    flex
                    items-center
                    gap-3
                    border-t
                    border-[#111111]/5
                    pt-4
                  ">
                    <span className="
                      h-px
                      w-6
                      bg-[#C9A227]/40
                      transition-all
                      duration-500
                      group-hover:w-12
                      group-hover:bg-[#C9A227]
                    " />

                    <span className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-[#111111]/30
                      transition-colors
                      duration-500
                      group-hover:text-[#9A7625]
                    ">
                      Capability Module
                    </span>
                  </div>

                </div>

              </motion.article>
            );
          })}

        </div>

        <ActionLink cta={section.cta} className="mt-10" />

      </div>

    </section>
  );
}