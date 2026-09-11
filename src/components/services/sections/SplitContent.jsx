import { Sparkles } from "lucide-react";
import ActionLink from "@/components/content/ActionLink";

export default function SplitContent({
  section,
  stackIndex = 0,
  stackLength = 1,
}) {
  const imageUrl =
    section.image?.assetUrl ||
    section.image?.asset?.url ||
    null;

  const isStacked = stackLength > 1;

  /*
   * Each card gets a slightly different top position.
   * This creates the visible layered stack.
   */
  const topOffset = 24 + stackIndex * 10;

  return (
    <section
      className={`
        relative px-4 md:px-6
        ${isStacked ? "min-h-[105vh]" : "py-24 md:py-32"}
      `}
    >
      <div
        className={`
          mx-auto max-w-7xl
          ${isStacked ? "sticky" : ""}
        `}
        style={
          isStacked
            ? {
                top: `${topOffset}px`,
                zIndex: 20 + stackIndex,
                marginBottom:
                  stackIndex < stackLength - 1
                    ? "-85vh"
                    : "0",
              }
            : undefined
        }
      >
        <div
          className={`
            grid
            min-h-[72vh]
            items-center
            gap-8
            overflow-hidden
            rounded-[2rem]
            border
            border-[#C9A227]/20
            bg-[#F8F5EE]
            p-6
            shadow-[0_25px_80px_rgba(17,17,17,0.14)]
            md:min-h-[76vh]
            md:p-10
            lg:grid-cols-2
            lg:gap-16
            lg:p-14
            ${
              section.side === "left"
                ? "lg:[&>*:first-child]:order-2"
                : ""
            }
          `}
        >
          {/* TEXT */}
          <div className="relative z-10">
            {section.eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
                {section.eyebrow}
              </p>
            )}

            {section.heading && (
              <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                {section.heading}
              </h2>
            )}

            {section.description && (
              <p className="mt-6 max-w-xl text-base leading-7 text-[#111111]/60 md:text-lg">
                {section.description}
              </p>
            )}

            {section.cta && (
              <ActionLink
                cta={section.cta}
                className="mt-8"
              />
            )}
          </div>

          {/* IMAGE */}
          <div className="relative h-[340px] overflow-hidden rounded-[1.5rem] bg-[#111111] md:h-[440px] lg:h-[500px]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={section.heading || ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Sparkles className="h-12 w-12 text-[#C9A227]" />
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}