"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ReelsScrollWrapper({ children }) {
  const containerRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Saare sections AUR footer ko target karo
    const sectionEls = container.querySelectorAll("section, footer");

    if (sectionEls.length > 0) {
      const detected = [];

      sectionEls.forEach((el, i) => {
        const isFooter = el.tagName.toLowerCase() === "footer";

        if (!el.id) el.id = `snap-sec-${i}`;

        // Natural height rakho, stretching remove kar di
        el.style.scrollSnapAlign = isFooter ? "end" : "start";
        el.style.scrollSnapStop = "normal";
        // Offset so a section's top content never lands behind the fixed floating navbar.
        el.style.scrollMarginTop = "120px";
        if (!isFooter) {
          const currentPad = parseFloat(getComputedStyle(el).paddingTop) || 0;
          if (currentPad < 120) el.style.paddingTop = "120px";
        }

        // Agar purana min-h-screen class laga ho toh nikaal do
        el.classList.remove("min-h-screen");

        if (!isFooter) {
          const eyebrow = el.querySelector("p")?.innerText?.trim();
          const heading = el.querySelector("h1, h2, h3")?.innerText?.trim();

          const rawLabel = eyebrow || heading || `0${detected.length + 1}`;
          detected.push({
            id: el.id,
            index: i,
            label:
              rawLabel.length > 22 ? `${rawLabel.slice(0, 22)}…` : rawLabel,
          });
        }
      });

      setSections(detected);

      // Section visibility observer for updating active dot
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const matchedSection = detected.find(
                (sec) => sec.id === entry.target.id
              );
              if (matchedSection) {
                setActiveIndex(matchedSection.index);
              }
            }
          });
        },
        { root: container, threshold: 0.25 }
      );

      sectionEls.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [children]);

  const scrollToSection = (targetIndex) => {
    const container = containerRef.current;
    if (!container) return;
    const allSnappables = container.querySelectorAll("section, footer");
    if (allSnappables[targetIndex]) {
      allSnappables[targetIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#FAF7F2]">
      {/* 
        Scroll-Snap Container: 
        Ab sections stretch nahi honge, natural height me snap honge.
      */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{
          scrollSnapType: "y proximity", // 'proximity' allows natural height without forceful distortion
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {/* Floating Reels Dots Indicator */}
      {sections.length > 1 && (
        <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden flex-col items-center gap-3 p-2.5 rounded-full bg-black/30 backdrop-blur-lg border border-white/20 shadow-2xl lg:flex">
          {sections.map((sec) => {
            const isActive = activeIndex === sec.index;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.index)}
                aria-label={`Go to section ${sec.label}`}
                className="group relative flex items-center justify-center p-1 focus:outline-none"
              >
                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute right-8 opacity-0 transition-all duration-200 group-hover:opacity-100 rounded-md bg-[#111111] px-2.5 py-1 text-[11px] font-semibold text-[#FAF7F2] shadow-xl uppercase whitespace-nowrap tracking-wider">
                  {sec.label}
                </span>

                {/* Vertical Pill Dot */}
                <motion.span
                  animate={{
                    height: isActive ? 24 : 8,
                    backgroundColor: isActive
                      ? "#C9A227"
                      : "rgba(255, 255, 255, 0.45)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-2 rounded-full"
                />
              </button>
            );
          })}
        </aside>
      )}
    </div>
  );
}