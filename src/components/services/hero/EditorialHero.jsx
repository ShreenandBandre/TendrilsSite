"use client";

import HeroBackground from "./heroBackground";
import HeroButtons from "./HeroButtons";
import HeroVisual from "./HeroVisual";

export default function EditorialHero({ service }) {
  const hero = service?.hero || {};

  const headline =
    hero.headline ||
    service?.name ||
    "Build a commerce experience that moves your business forward.";

  const description =
    hero.description ||
    service?.description ||
    service?.shortDescription ||
    "";

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        border-b
        border-[#111111]/10
        px-6
        pb-20
        pt-24
        md:pb-28
        md:pt-28
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <HeroBackground />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-12
          lg:grid-cols-[0.95fr_0.85fr]
          lg:gap-16
        "
      >
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div className="max-w-2xl">
          {/* Eyebrow */}

          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.32em]
              text-[#9A7625]
            "
          >
            {hero.eyebrow || service?.pillar || "Shopify Commerce"}
          </p>

          {/* Headline */}

          <h1
            className="
              mt-5
              max-w-[680px]
              font-display
              text-[3.4rem]
              leading-[0.98]
              tracking-[-0.035em]
              text-[#111111]
              sm:text-[4rem]
              md:text-[4.6rem]
              lg:text-[4.9rem]
            "
          >
            {headline}

            {hero.highlight && (
              <>
                {" "}
                <span className="text-[#C9A227]">
                  {hero.highlight}
                </span>
              </>
            )}
          </h1>

          {/* Description */}

          {/* {description && (
            <p
              className="
                mt-7
                max-w-[610px]
                text-[15px]
                leading-7
                text-[#111111]/60
                md:text-base
              "
            >
              {description}
            </p>
          )} */}

          {/* CTA */}

          <HeroButtons hero={hero} />
        </div>

        {/* ===================================================
            RIGHT VISUAL
        ==================================================== */}

        <div className="lg:justify-self-end w-full">
          <HeroVisual service={service} />
        </div>
      </div>
    </section>
  );
}