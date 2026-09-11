"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   PILLARS
========================================================= */

const PILLARS = [
  {
    key: "build",
    name: "Build",
    subtitle: "Foundation",
  },
  {
    key: "automate",
    name: "Automate",
    subtitle: "Workflows",
  },
  {
    key: "scale",
    name: "Scale",
    subtitle: "Infrastructure",
  },
  {
    key: "grow",
    name: "Grow",
    subtitle: "Acquisition",
  },
  {
    key: "support",
    name: "Support",
    subtitle: "Optimization",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function cleanName(name = "") {
  return String(name)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSlug(item) {
  if (!item) return "";

  if (typeof item.slug === "string") {
    return item.slug;
  }

  if (
    item.slug &&
    typeof item.slug === "object"
  ) {
    return item.slug.current || "";
  }

  return "";
}

function getServiceHref(
  service,
  parentPath = ""
) {
  const slug = getSlug(service);

  if (!slug) {
    return parentPath || "/services";
  }

  return parentPath
    ? `${parentPath}/${slug}`
    : `/services/${slug}`;
}

/* =========================================================
   SERVICES MEGA MENU
========================================================= */

export default function ServicesMegaMenu({
  services = [],
  onNavigate,
}) {
  /*
   * IMPORTANT:
   *
   * We DO NOT filter by featured.
   *
   * Every service is grouped by its pillar.
   */

  const groupedServices = useMemo(() => {
    const grouped = {
      build: [],
      automate: [],
      scale: [],
      grow: [],
      support: [],
    };

    services.forEach((service) => {
      const pillar = String(
        service?.pillar || ""
      )
        .trim()
        .toLowerCase();

      if (grouped[pillar]) {
        grouped[pillar].push(service);
      }
    });

    /*
     * Respect Sanity navigation order.
     */

    Object.keys(grouped).forEach((key) => {
      grouped[key].sort(
        (a, b) =>
          (a.order ?? 9999) -
          (b.order ?? 9999)
      );
    });

    return grouped;
  }, [services]);

  /* =========================================================
     ACTIVE PILLAR
  ========================================================= */

  const firstAvailablePillar =
    PILLARS.find(
      (pillar) =>
        groupedServices[pillar.key]?.length
    )?.key || "build";

  const [activePillar, setActivePillar] =
    useState(firstAvailablePillar);

  /* =========================================================
     SERVICES UNDER ACTIVE PILLAR
  ========================================================= */

  const pillarServices =
    groupedServices[activePillar] || [];

  /* =========================================================
     ACTIVE SERVICE
  ========================================================= */

  const [activeServiceId, setActiveServiceId] =
    useState(null);

  const activeService =
    pillarServices.find(
      (service) =>
        service._id === activeServiceId
    ) || pillarServices[0] || null;

  /* =========================================================
     ACTIVE SERVICE CHILDREN
  ========================================================= */

  const childServices =
    activeService?.children || [];

  const activeServicePath = activeService
    ? getServiceHref(activeService)
    : "/services";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      transition={{
        duration: 0.22,
        ease: "easeOut",
      }}
      className="
        w-full  
      "
    >
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-[#111111]/10
          bg-[#F7F2E8]
          shadow-[0_25px_80px_rgba(0,0,0,0.18)]
          backdrop-blur-2xl
        "
      >
        <div
          className="
            grid
            grid-cols-[255px_315px_minmax(0,1fr)]
            min-h-[440px]
          "
        >

          {/* =====================================================
              COLUMN 1
              SERVICE PILLARS
          ===================================================== */}

          <div
            className="
              m-5
              flex
              flex-col
              rounded-[22px]
              bg-[#111111]
              p-6
              text-[#F7F2E8]
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#C9A227]
                "
              >
                Service Pillars
              </p>
            </div>

            <div className="mt-6 space-y-1">
              {PILLARS.map(
                (pillar, index) => {
                  const count =
                    groupedServices[
                      pillar.key
                    ]?.length || 0;

                  const isActive =
                    activePillar ===
                    pillar.key;

                  return (
                    <button
                      key={pillar.key}
                      type="button"
                      onMouseEnter={() => {
                        setActivePillar(
                          pillar.key
                        );

                        /*
                         * Reset selected service
                         * whenever pillar changes.
                         */
                        setActiveServiceId(null);
                      }}
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-[16px]
                        px-5
                        py-4
                        text-left
                        transition-all
                        duration-200
                        ${
                          isActive
                            ? "bg-[#C9A24F] text-[#111111]"
                            : "text-[#F7F2E8] hover:bg-white/10"
                        }
                      `}
                    >
                      <div>
                        <p
                          className="
                            text-[15px]
                            font-semibold
                            capitalize
                          "
                        >
                          {pillar.name}
                        </p>

                        <p
                          className={`
                            mt-0.5
                            text-[9px]
                            uppercase
                            tracking-[0.12em]
                            ${
                              isActive
                                ? "text-[#111111]/60"
                                : "text-white/40"
                            }
                          `}
                        >
                          {pillar.subtitle}
                        </p>
                      </div>

                      <span
                        className={`
                          font-mono
                          text-[10px]
                          ${
                            isActive
                              ? "text-[#111111]"
                              : "text-white/45"
                          }
                        `}
                      >
                        {String(
                          count
                        ).padStart(2, "0")}
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            <Link
              href="/services"
              onClick={onNavigate}
              className="
                mt-auto
                flex
                items-center
                gap-2
                border-t
                border-white/10
                pt-5
                text-xs
                font-semibold
                text-[#C9A227]
                transition-colors
                hover:text-white
              "
            >
              View all services
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* =====================================================
              COLUMN 2
              SERVICES UNDER SELECTED PILLAR
          ===================================================== */}

          <div
            className="
              border-r
              border-[#111111]/10
              px-6
              py-8
            "
          >
            <div className="mb-5">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.24em]
                  text-[#9A7625]
                "
              >
                {PILLARS.find(
                  (x) =>
                    x.key ===
                    activePillar
                )?.name}
              </p>

              <p
                className="
                  mt-1
                  text-[11px]
                  text-[#111111]/40
                "
              >
                Services
              </p>
            </div>

            {pillarServices.length ===
            0 ? (
              <div className="py-8">
                <p className="text-sm text-[#111111]/35">
                  No services available.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {pillarServices.map(
                  (service) => {
                    const slug =
                      getSlug(service);

                    if (!slug) return null;

                    const isActive =
                      activeService?._id ===
                      service._id;

                    const hasChildren =
                      Array.isArray(
                        service.children
                      ) &&
                      service.children
                        .length > 0;

                    return (
                      <Link
                        key={
                          service._id ||
                          slug
                        }
                        href={getServiceHref(
                          service
                        )}
                        onMouseEnter={() =>
                          setActiveServiceId(
                            service._id
                          )
                        }
                        onClick={
                          onNavigate
                        }
                        className={`
                          group
                          flex
                          items-center
                          justify-between
                          rounded-[16px]
                          px-4
                          py-3
                          transition-all
                          duration-200
                          ${
                            isActive
                              ? "bg-white shadow-[0_5px_20px_rgba(0,0,0,0.06)]"
                              : "hover:bg-white/60"
                          }
                        `}
                      >
                        <div className="min-w-0">
                          <p
                            className={`
                              truncate
                              text-[13px]
                              font-semibold
                              ${
                                isActive
                                  ? "text-[#111111]"
                                  : "text-[#111111]/65"
                              }
                            `}
                          >
                            {cleanName(
                              service.title ||
                                service.name
                            )}
                          </p>

                          {service.shortDescription && (
                            <p
                              className="
                                mt-1
                                line-clamp-1
                                text-[10px]
                                text-[#111111]/35
                              "
                            >
                              {
                                service.shortDescription
                              }
                            </p>
                          )}
                        </div>

                        {hasChildren ? (
                          <ChevronRight
                            className={`
                              ml-3
                              h-4
                              w-4
                              shrink-0
                              ${
                                isActive
                                  ? "text-[#C9A227]"
                                  : "text-[#111111]/25"
                              }
                            `}
                          />
                        ) : (
                          <ArrowUpRight
                            className="
                              ml-3
                              h-3.5
                              w-3.5
                              shrink-0
                              text-[#C9A227]
                              opacity-0
                              transition
                              group-hover:opacity-100
                            "
                          />
                        )}
                      </Link>
                    );
                  }
                )}
              </div>
            )}
          </div>

          {/* =====================================================
              COLUMN 3
              CHILD SERVICES
          ===================================================== */}

          <div
            className="
              min-w-0
              px-7
              py-8
            "
          >
            {!activeService ? (
              <div className="flex h-full items-center">
                <p className="text-sm text-[#111111]/35">
                  Select a service.
                </p>
              </div>
            ) : (
              <>
                {/* SERVICE HEADING */}

                <div
                  className="
                    border-b
                    border-[#111111]/10
                    pb-5
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.24em]
                      text-[#9A7625]
                    "
                  >
                    {PILLARS.find(
                      (x) =>
                        x.key ===
                        activePillar
                    )?.name}
                  </p>

                  <h3
                    className="
                      mt-2
                      font-display
                      text-[28px]
                      leading-tight
                      text-[#111111]
                    "
                  >
                    {cleanName(
                      activeService.title ||
                        activeService.name
                    )}
                  </h3>

                  {activeService.shortDescription && (
                    <p
                      className="
                        mt-2
                        max-w-xl
                        text-[12px]
                        leading-5
                        text-[#111111]/45
                      "
                    >
                      {
                        activeService.shortDescription
                      }
                    </p>
                  )}
                </div>

                {/* CHILDREN */}

                {childServices.length >
                0 ? (
                  <div className="pt-5">
                    <p
                      className="
                        mb-3
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#111111]/35
                      "
                    >
                      Explore
                    </p>

                    <div className="space-y-1">
                      {childServices.map(
                        (child) => {
                          const childSlug =
                            getSlug(child);

                          if (!childSlug)
                            return null;

                          const childHref =
                            getServiceHref(
                              child,
                              activeServicePath
                            );

                          const hasGrandchildren =
                            Array.isArray(
                              child.children
                            ) &&
                            child.children
                              .length > 0;

                          return (
                            <Link
                              key={
                                child._id ||
                                childSlug
                              }
                              href={
                                childHref
                              }
                              onClick={
                                onNavigate
                              }
                              className="
                                group
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                px-4
                                py-3
                                transition-all
                                hover:bg-white
                              "
                            >
                              <div>
                                <p
                                  className="
                                    text-[13px]
                                    font-medium
                                    text-[#111111]/70
                                    group-hover:text-[#111111]
                                  "
                                >
                                  {cleanName(
                                    child.title ||
                                      child.name
                                  )}
                                </p>

                                {child.shortDescription && (
                                  <p
                                    className="
                                      mt-1
                                      line-clamp-1
                                      text-[10px]
                                      text-[#111111]/35
                                    "
                                  >
                                    {
                                      child.shortDescription
                                    }
                                  </p>
                                )}

                                {hasGrandchildren && (
                                  <p
                                    className="
                                      mt-1.5
                                      text-[9px]
                                      font-semibold
                                      uppercase
                                      tracking-[0.12em]
                                      text-[#C9A227]
                                    "
                                  >
                                    {
                                      child
                                        .children
                                        .length
                                    }{" "}
                                    sub-services
                                  </p>
                                )}
                              </div>

                              <ArrowUpRight
                                className="
                                  h-3.5
                                  w-3.5
                                  shrink-0
                                  text-[#C9A227]
                                  opacity-0
                                  transition
                                  group-hover:opacity-100
                                "
                              />
                            </Link>
                          );
                        }
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="pt-7">
                    <p
                      className="
                        text-[12px]
                        leading-5
                        text-[#111111]/40
                      "
                    >
                      This service doesn't have
                      any child services yet.
                    </p>

                    <Link
                      href={activeServicePath}
                      onClick={onNavigate}
                      className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-[#9A7625]
                        hover:text-[#111111]
                      "
                    >
                      View service
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* =====================================================
            BOTTOM STRIP
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-[#111111]/10
            bg-white/30
            px-6
            py-3
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-[#111111]/35
            "
          >
            Commerce Architecture • Growth •
            Operations
          </p>

          <Link
            href="/services"
            onClick={onNavigate}
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#9A7625]
              hover:text-[#111111]
            "
          >
            Explore all →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}