"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  Menu,
  ChevronDown,
  Search,
  X,
  ArrowUpRight,
} from "lucide-react";

import ServicesMegaMenu from "./ServiceMegaMenu";
import IndustryMegaMenu from "./IndustryMegaMenu";
import SolutionMegaMenu from "./SolutionMegaMenu";
import SearchOverlay from "./SearchOverlay";

import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { useSiteStore } from "@/store/useSiteStore";

/* =========================================================
   SERVICE PILLARS
========================================================= */

const PILLAR_ORDER = [
  "build",
  "automate",
  "scale",
  "grow",
  "support",
];

/* =========================================================
   HELPERS
========================================================= */

function normalizePillar(pillar = "") {
  return String(pillar)
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, "");
}

/* =========================================================
   MAIN NAVBAR
========================================================= */

export default function FloatingNavbar({ settings: initialSettings = null }) {
  const [settings, setSettings] = useState(initialSettings);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =========================================================
     SHARED SITE STORE
  ========================================================= */

  const services = useSiteStore((s) => s.services);
  const industries = useSiteStore((s) => s.industries);
  const solutions = useSiteStore((s) => s.solutions);
  const caseStudies = useSiteStore((s) => s.caseStudies);

  const servicesLoaded = useSiteStore((s) => s.servicesLoaded);
  const industriesLoaded = useSiteStore((s) => s.industriesLoaded);
  const solutionsLoaded = useSiteStore((s) => s.solutionsLoaded);
  const caseStudiesLoaded = useSiteStore((s) => s.caseStudiesLoaded);

  const setServices = useSiteStore((s) => s.setServices);
  const setIndustries = useSiteStore((s) => s.setIndustries);
  const setSolutions = useSiteStore((s) => s.setSolutions);
  const setCaseStudies = useSiteStore((s) => s.setCaseStudies);

  /* =========================================================
     SCROLL
  ========================================================= */

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  /* =========================================================
     BODY LOCK
  ========================================================= */

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  /* =========================================================
     LOAD SITE SETTINGS
  ========================================================= */

  useEffect(() => {
    if (initialSettings) return;

    let mounted = true;

    async function loadSettings() {
      try {
        const data = await client.fetch(siteSettingsQuery);

        if (mounted) {
          setSettings(data || null);
        }
      } catch (error) {
        console.error("Could not load site settings:", error);
      }
    }

    loadSettings();

    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     LOAD NAV DATA
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    if (!servicesLoaded) {
      fetch("/api/services/navigation", {
        cache: "no-store",
      })
        .then((r) => r.json())
        .then((data) => {
          if (!cancelled) {
            setServices(
              Array.isArray(data?.services)
                ? data.services
                : []
            );
          }
        })
        .catch(() => {
          if (!cancelled) {
            setServices([]);
          }
        });
    }

    if (!industriesLoaded) {
      fetch("/api/industries/navigation", {
        cache: "no-store",
      })
        .then((r) => r.json())
        .then((data) => {
          if (!cancelled) {
            setIndustries(
              Array.isArray(data?.industries)
                ? data.industries
                : []
            );
          }
        })
        .catch(() => {
          if (!cancelled) {
            setIndustries([]);
          }
        });
    }

    if (!solutionsLoaded) {
      fetch("/api/solutions/navigation", {
        cache: "no-store",
      })
        .then((r) => r.json())
        .then((data) => {
          if (!cancelled) {
            setSolutions(
              Array.isArray(data?.solutions)
                ? data.solutions
                : []
            );
          }
        })
        .catch(() => {
          if (!cancelled) {
            setSolutions([]);
          }
        });
    }

    if (!caseStudiesLoaded) {
      fetch("/api/case-studies/navigation", {
        cache: "no-store",
      })
        .then((r) => r.json())
        .then((data) => {
          if (!cancelled) {
            setCaseStudies(
              Array.isArray(data?.caseStudies)
                ? data.caseStudies
                : []
            );
          }
        })
        .catch(() => {
          if (!cancelled) {
            setCaseStudies([]);
          }
        });
    }

    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     NAVIGATION HELPERS
  ========================================================= */

  const openMenu = (menu) => {
    setActiveMenu(menu);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const handleNavigate = () => {
    setActiveMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const handleSearchToggle = () => {
    setActiveMenu(null);
    setMobileOpen(false);
    setSearchOpen((v) => !v);
  };

  /* =========================================================
     LOGO
  ========================================================= */

  const logoUrl = settings?.headerLogo?.assetUrl;
  const logoAlt = settings?.headerLogoAlt || "Tendrils.io";

  /* =========================================================
     GROUP SERVICES
  ========================================================= */

  const groupedServices = PILLAR_ORDER.reduce(
    (accumulator, pillar) => {
      accumulator[pillar] = services.filter(
        (service) =>
          !service?.parentId &&
          normalizePillar(service?.pillar) ===
            normalizePillar(pillar)
      );

      return accumulator;
    },
    {}
  );

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          FLOATING NAVBAR

          MOBILE:
          - top-2 instead of top-4
          - px-2 instead of px-4
          - smaller vertical padding
          - smaller logo
          - smaller action buttons

          DESKTOP:
          - original sizing preserved
      ===================================================== */}

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="fixed top-2 md:top-4 inset-x-0 z-[100] flex justify-center px-2 md:px-4"
      >
        <div
          className={`
            relative flex items-center justify-between
            rounded-full
            border border-[#D4AF37]/20
            px-4 md:px-8
            transition-all duration-500
            backdrop-blur-xl
            w-full max-w-[1490px]

            ${
              scrolled
                ? "py-2 md:py-3 bg-[#F7F2E8]/95 shadow-[0_8px_30px_rgba(201,162,39,0.25)]"
                : "py-2.5 md:py-4 bg-[#F7F2E8]/80"
            }
          `}
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            onClick={handleNavigate}
            className="flex shrink-0 items-center outline-none"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={logoAlt}
                className="
                  h-9
                  w-auto
                  max-w-[115px]
                  object-contain
                  md:h-14
                  md:max-w-[150px]
                "
              />
            ) : (
              <span className="font-display text-xl md:text-2xl tracking-wide text-black font-semibold">
                Tendrils.io
              </span>
            )}
          </Link>

          {/* =================================================
              DESKTOP NAV LINKS
          ================================================= */}

          <nav className="hidden items-center gap-8 lg:flex h-full">

            {/* SERVICES */}

            <div
              className="relative flex h-full items-center"
              onMouseEnter={() => openMenu("services")}
            >
              <Link
                href="/services"
                onClick={handleNavigate}
                className="
                  group flex items-center gap-1.5
                  text-[15px]
                  font-semibold
                  text-black
                  tracking-wide
                  hover:text-[#9A7625]
                  transition-colors
                "
              >
                Services

                <ChevronDown
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setActiveMenu(
                      activeMenu === "services"
                        ? null
                        : "services"
                    );
                  }}
                  className={`
                    h-4 w-4
                    transition-transform duration-300
                    ${
                      activeMenu === "services"
                        ? "rotate-180 text-[#9A7625]"
                        : ""
                    }
                  `}
                  strokeWidth={1.8}
                />
              </Link>
            </div>

            {/* INDUSTRIES */}

            <div
              className="relative flex h-full items-center"
              onMouseEnter={() => openMenu("industries")}
            >
              <Link
                href="/industries"
                onClick={handleNavigate}
                className="
                  group flex items-center gap-1.5
                  text-[15px]
                  font-semibold
                  text-black
                  tracking-wide
                  hover:text-[#9A7625]
                  transition-colors
                "
              >
                Industries

                <ChevronDown
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setActiveMenu(
                      activeMenu === "industries"
                        ? null
                        : "industries"
                    );
                  }}
                  className={`
                    h-4 w-4
                    transition-transform duration-300
                    ${
                      activeMenu === "industries"
                        ? "rotate-180 text-[#9A7625]"
                        : ""
                    }
                  `}
                  strokeWidth={1.8}
                />
              </Link>
            </div>

            {/* SOLUTIONS */}

            <div
              className="relative flex h-full items-center"
              onMouseEnter={() => openMenu("solutions")}
            >
              <Link
                href="/solutions"
                onClick={handleNavigate}
                className="
                  group flex items-center gap-1.5
                  text-[15px]
                  font-semibold
                  text-black
                  tracking-wide
                  hover:text-[#9A7625]
                  transition-colors
                "
              >
                Solutions

                <ChevronDown
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setActiveMenu(
                      activeMenu === "solutions"
                        ? null
                        : "solutions"
                    );
                  }}
                  className={`
                    h-4 w-4
                    transition-transform duration-300
                    ${
                      activeMenu === "solutions"
                        ? "rotate-180 text-[#9A7625]"
                        : ""
                    }
                  `}
                  strokeWidth={1.8}
                />
              </Link>
            </div>

            {/* CASE STUDIES */}

            <div
              className="relative flex h-full items-center"
              onMouseEnter={() => openMenu("caseStudies")}
            >
              <Link
                href="/case-studies"
                onClick={handleNavigate}
                className="
                  group flex items-center gap-1.5
                  text-[15px]
                  font-semibold
                  text-black
                  tracking-wide
                  hover:text-[#9A7625]
                  transition-colors
                "
              >
                Case Studies

                {caseStudies.length > 0 && (
                  <ChevronDown
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      setActiveMenu(
                        activeMenu === "caseStudies"
                          ? null
                          : "caseStudies"
                      );
                    }}
                    className={`
                      h-4 w-4
                      transition-transform duration-300
                      ${
                        activeMenu === "caseStudies"
                          ? "rotate-180 text-[#9A7625]"
                          : ""
                      }
                    `}
                    strokeWidth={1.8}
                  />
                )}
              </Link>
            </div>

            {/* ABOUT */}

            <Link
              href="/about"
              onClick={handleNavigate}
              className="
                text-[15px]
                font-semibold
                text-black
                tracking-wide
                hover:text-[#9A7625]
                transition-colors
              "
            >
              About Us
            </Link>
          </nav>

          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="flex items-center gap-2 md:gap-3 shrink-0">

            {/* SEARCH */}

            <button
              type="button"
              onClick={handleSearchToggle}
              aria-label={
                searchOpen ? "Close search" : "Search"
              }
              className="
                flex
                h-9 w-9
                md:h-11 md:w-11
                items-center
                justify-center
                rounded-full
                border border-black/10
                text-black
                transition
                hover:border-black
                hover:bg-black
                hover:text-white
              "
            >
              {searchOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>

            {/* DESKTOP CTA */}

            <Link
              href="/contact"
              onClick={handleNavigate}
              className="
                hidden
                rounded-full
                bg-[#C5A05A]
                px-7 py-3
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:bg-black
                hover:text-[#F7F2E8]
                hover:shadow-lg
                xl:inline-block
              "
            >
              Book a Consultation
            </Link>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              className="
                lg:hidden
                flex
                h-9 w-9
                md:h-10 md:w-10
                items-center
                justify-center
                rounded-full
                border border-black/10
                text-black
              "
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* =====================================================
          DESKTOP MEGA MENU — SERVICES
      ===================================================== */}

      <AnimatePresence>
        {activeMenu === "services" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            transition={{
              duration: 0.18,
            }}
            onMouseEnter={() =>
              openMenu("services")
            }
            onMouseLeave={closeMenu}
            style={{
              top: scrolled ? 96 : 122,
              left:
                "calc(50% - min(657.5px, calc(50vw - 24px)))",
            }}
            className="
              fixed
              z-[110]
              w-[calc(100vw-48px)]
              max-w-[1315px]
            "
          >
            <ServicesMegaMenu
              services={services}
              groupedServices={groupedServices}
              loaded={servicesLoaded}
              onNavigate={closeMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          DESKTOP MEGA MENU — INDUSTRIES
      ===================================================== */}

      <AnimatePresence>
        {activeMenu === "industries" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            transition={{
              duration: 0.18,
            }}
            onMouseEnter={() =>
              openMenu("industries")
            }
            onMouseLeave={closeMenu}
            style={{
              top: scrolled ? 96 : 122,
              left:
                "calc(50% - min(657.5px, calc(50vw - 24px)))",
            }}
            className="
              fixed
              z-[110]
              w-[calc(100vw-48px)]
              max-w-[1315px]
            "
          >
            <IndustryMegaMenu
              industries={industries}
              loaded={industriesLoaded}
              onClose={closeMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          DESKTOP MEGA MENU — SOLUTIONS
      ===================================================== */}

      <AnimatePresence>
        {activeMenu === "solutions" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            transition={{
              duration: 0.18,
            }}
            onMouseEnter={() =>
              openMenu("solutions")
            }
            onMouseLeave={closeMenu}
            style={{
              top: scrolled ? 96 : 122,
              left:
                "calc(50% - min(657.5px, calc(50vw - 24px)))",
            }}
            className="
              fixed
              z-[110]
              w-[calc(100vw-48px)]
              max-w-[1315px]
            "
          >
            <SolutionMegaMenu
              solutions={solutions}
              loaded={solutionsLoaded}
              onClose={closeMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          DESKTOP MEGA MENU — CASE STUDIES
      ===================================================== */}

      <AnimatePresence>
        {activeMenu === "caseStudies" &&
          caseStudies.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 8,
              }}
              transition={{
                duration: 0.18,
              }}
              onMouseEnter={() =>
                openMenu("caseStudies")
              }
              onMouseLeave={closeMenu}
              style={{
                top: scrolled ? 96 : 122,
                left:
                  "calc(50% - min(525px, calc(50vw - 24px)))",
              }}
              className="
                fixed
                z-[110]
                w-[calc(100vw-48px)]
                max-w-[1050px]
              "
            >
              <CaseStudyMegaMenu
                caseStudies={caseStudies}
                onClose={closeMenu}
              />
            </motion.div>
          )}
      </AnimatePresence>

      {/* =====================================================
          MOBILE FULL MENU
      ===================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="
              fixed
              inset-x-2
              top-[58px]
              z-[95]
              overflow-y-auto
              rounded-[28px]
              border border-black/10
              bg-[#F7F2E8]
              p-6
              shadow-[0_25px_80px_rgba(0,0,0,0.18)]
              lg:hidden
            "
          >
            <div className="space-y-2">

              <MobileNavItem
                label="Services"
                href="/services"
                onClick={handleNavigate}
              />

              <MobileNavItem
                label="Industries"
                href="/industries"
                onClick={handleNavigate}
              />

              <MobileNavItem
                label="Solutions"
                href="/solutions"
                onClick={handleNavigate}
              />

              <MobileNavItem
                label="Case Studies"
                href="/case-studies"
                onClick={handleNavigate}
              />

              <MobileNavItem
                label="About Us"
                href="/about"
                onClick={handleNavigate}
              />

              <Link
                href="/contact"
                onClick={handleNavigate}
                className="
                  mt-4
                  flex
                  h-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C5A05A]
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          SEARCH OVERLAY
      ===================================================== */}

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

/* =========================================================
   CASE STUDIES MEGA MENU
========================================================= */

function CaseStudyMegaMenu({
  caseStudies = [],
  onClose,
}) {
  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[28px]
        border border-[#C5A05A]/20
        bg-[#F7F2E8]/95
        backdrop-blur-2xl
        shadow-[0_24px_70px_rgba(0,0,0,0.18)]
      "
    >
      <div
        className="
          grid
          grid-cols-[280px_minmax(0,1fr)]
          gap-6
          p-6
        "
      >
        {/* LEFT */}

        <div
          className="
            flex
            min-h-[320px]
            flex-col
            rounded-[22px]
            bg-black
            p-7
            text-[#F7F2E8]
            justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#C5A05A]
              "
            >
              Tendrils Case Studies
            </p>

            <h3
              className="
                mt-5
                font-display
                text-[26px]
                leading-[1.05]
                tracking-tight
              "
            >
              Proof that
              <br />
              the system works.
            </h3>

            <p
              className="
                mt-5
                text-[12px]
                leading-5
                text-white/55
              "
            >
              Explore the commerce systems,
              transformations, and outcomes we
              have engineered.
            </p>
          </div>

          <Link
            href="/case-studies"
            onClick={onClose}
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[#C5A05A]
              hover:text-white
            "
          >
            Explore all case studies

            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* RIGHT */}

        <div
          className="
            grid
            min-h-[320px]
            grid-cols-1
            gap-3
            p-2
            sm:grid-cols-2
          "
        >
          {caseStudies.map((study) => (
            <div
              key={study._id}
              className="
                rounded-2xl
                border border-black/5
                bg-white/60
                p-4
                hover:border-[#C5A05A]/30
                hover:bg-white
              "
            >
              <Link
                href={`/case-studies/${study.slug}`}
                onClick={onClose}
                className="
                  group
                  flex
                  items-center
                  justify-between
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      text-[13px]
                      font-semibold
                      text-black/90
                      group-hover:text-black
                    "
                  >
                    {study.title}
                  </p>

                  {study.client && (
                    <p
                      className="
                        mt-1
                        text-[10px]
                        uppercase
                        tracking-[0.14em]
                        text-black/40
                      "
                    >
                      {study.client}
                    </p>
                  )}
                </div>

                <ArrowUpRight
                  className="
                    h-4 w-4
                    text-[#9A7625]
                    opacity-0
                    group-hover:opacity-100
                  "
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE NAV ITEM
========================================================= */

function MobileNavItem({
  label,
  href,
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        flex
        items-center
        justify-between
        rounded-2xl
        border border-transparent
        px-4
        py-4
        text-[15px]
        font-semibold
        text-black
        transition
        hover:border-[#C5A05A]/30
        hover:bg-white
      "
    >
      <span>{label}</span>

      <ArrowUpRight
        className="
          h-4 w-4
          text-[#9A7625]
          opacity-60
          transition
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
          group-hover:opacity-100
        "
      />
    </Link>
  );
}