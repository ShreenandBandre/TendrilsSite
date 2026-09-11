"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

function isExternal(href = "") {
  return /^https?:\/\//i.test(href);
}

function SafeLink({ href, children, className, ...props }) {
  if (!href) return null;

  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}

const fallbackColumns = [
  {
    title: "Services",
    links: [
      { label: "Build", href: "/services" },
      { label: "Automate", href: "/services" },
      { label: "Scale", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Solutions", href: "/solutions" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer({ settings }) {
  const sanityColumns = (settings?.footerColumns || [])
    .map((column) => ({
      ...column,
      links: (column.links || []).filter(
        (link) =>
          String(link?.label || "").toLowerCase() !== "resources" &&
          link?.href
      ),
    }))
    .filter(
      (column) =>
        column?.title &&
        Array.isArray(column.links) &&
        column.links.length > 0
    );

  const columns =
    sanityColumns.length > 0 ? sanityColumns : fallbackColumns;

  const socials = (settings?.socialLinks || []).filter(
    (item) => item?.url && item?.platform
  );

  const cta = settings?.footerCta?.href
    ? settings.footerCta
    : null;

  const email =
    settings?.contactEmail ||
    settings?.email ||
    "contact@tendrils.io";

  const phone =
    settings?.contactPhone ||
    settings?.phone ||
    "+1 214 302 9093";

  const description =
    settings?.footerDescription ||
    "We design, build, automate, and scale digital commerce systems for ambitious brands.";

const footerLogo =
  settings?.footerLogo?.assetUrl ||
  settings?.footerLogo?.asset?.url ||
  null;

  return (
    <footer className="relative isolate overflow-hidden bg-[#0B0B0C] text-[#F7F2E8]">

      {/* =====================================================
          SUBTLE BOTTOM SHADOW
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-1/2
          h-[360px]
          w-[90%]
          -translate-x-1/2
          rounded-full
          bg-black/80
          blur-[110px]
        "
      />

      {/* =====================================================
          MAIN FOOTER
          ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 pb-0 pt-20 md:pt-28">

        <div className="grid items-start gap-16 lg:grid-cols-12">

          {/* =====================================================
              LEFT SIDE
              ===================================================== */}

          <div className="lg:col-span-5">

            <div className="max-w-xl">

              <div className="mb-6 flex items-center gap-4">
                <div className="h-[2px] w-12 bg-[#C9A227]" />

                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
                  // Let&apos;s Collaborate
                </span>
              </div>

              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#F7F2E8] md:text-5xl lg:text-6xl">
                Have a project
                <br />
                <span className="text-[#C9A227]">
                  in mind?
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-[#F7F2E8]/55">
                Tell us where your commerce operation is today,
                where it needs to go, and what is holding it back.
              </p>

            </div>

            {/* CONTACT LINKS */}

            <div className="mt-9 flex flex-col items-start gap-3">

              {/* EMAIL */}

              <a
                href={`mailto:${email}`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3.5
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-[#F7F2E8]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#C9A227]/50
                  hover:bg-[#C9A227]
                  hover:text-[#0B0B0C]
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#C9A227]/10
                    text-[#C9A227]
                    transition-colors
                    group-hover:bg-black/10
                    group-hover:text-[#0B0B0C]
                  "
                >
                  <Mail size={17} />
                </span>

                <span>{email}</span>

                <ArrowUpRight
                  size={14}
                  className="
                    ml-2
                    opacity-50
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </a>

              {/* PHONE */}

              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3.5
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-[#F7F2E8]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#C9A227]/50
                  hover:bg-[#C9A227]
                  hover:text-[#0B0B0C]
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#C9A227]/10
                    text-[#C9A227]
                    transition-colors
                    group-hover:bg-black/10
                    group-hover:text-[#0B0B0C]
                  "
                >
                  <Phone size={17} />
                </span>

                <span>{phone}</span>

                <ArrowUpRight
                  size={14}
                  className="
                    ml-2
                    opacity-50
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </a>

            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
              ===================================================== */}

          <div className="lg:col-span-7">

            <div className="grid gap-12 sm:grid-cols-2">

              {/* BRAND */}

              <div>

                {footerLogo ? (
                  <img
                    src={footerLogo}
                    alt="Tendrils"
                    className="h-10 w-auto max-w-[190px] object-contain"
                  />
                ) : (
                  <p className="font-display text-4xl font-semibold tracking-tight">
                    Tendril
                    <span className="text-[#C9A227]">
                      s
                    </span>
                  </p>
                )}

                <p className="mt-5 max-w-sm text-sm leading-7 text-[#F7F2E8]/50">
                  {description}
                </p>

                {/* CTA */}

                {cta && (
                  <SafeLink
                    href={cta.href}
                    className="
                      mt-7
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#C9A227]
                      px-6
                      py-3
                      text-sm
                      font-semibold
                      text-[#0B0B0C]
                      shadow-[0_10px_35px_rgba(201,162,39,0.18)]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#F7F2E8]
                    "
                  >
                    <span>
                      {cta.label || "Start a project"}
                    </span>

                    <ArrowUpRight size={16} />
                  </SafeLink>
                )}

                {/* SOCIAL LINKS */}

                {socials.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-2">

                    {socials.map((social) => (
                      <SafeLink
                        key={`${social.platform}-${social.url}`}
                        href={social.url}
                        className="
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.025]
                          px-3.5
                          py-1.5
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-[#F7F2E8]/45
                          transition
                          hover:border-[#C9A227]/50
                          hover:text-[#C9A227]
                        "
                      >
                        {social.platform}
                      </SafeLink>
                    ))}

                  </div>
                )}

              </div>

              {/* NAVIGATION */}

              {columns.length > 0 && (
                <div className="grid gap-10 sm:grid-cols-2">

                  {columns.map((column) => (
                    <div key={column.title}>

                      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A227]">
                        {column.title}
                      </p>

                      <ul className="space-y-3.5">

                        {column.links.map((link) => (
                          <li
                            key={`${link.label}-${link.href}`}
                          >
                            <SafeLink
                              href={link.href}
                              className="
                                group
                                inline-flex
                                items-center
                                gap-1.5
                                text-sm
                                text-[#F7F2E8]/50
                                transition
                                duration-300
                                hover:text-[#F7F2E8]
                              "
                            >
                              <span>
                                {link.label}
                              </span>

                              <ArrowUpRight
                                size={11}
                                className="
                                  opacity-0
                                  transition-all
                                  duration-300
                                  group-hover:-translate-y-0.5
                                  group-hover:translate-x-0.5
                                  group-hover:opacity-70
                                "
                              />
                            </SafeLink>
                          </li>
                        ))}

                      </ul>

                    </div>
                  ))}

                </div>
              )}

            </div>
          </div>

        </div>

        {/* =====================================================
    MASSIVE TENDRILS WORDMARK
    FULLY VISIBLE
    ===================================================== */}

<div className="relative mt-24 md:mt-28">

  <div className="relative flex items-center justify-center py-2">

    <h3
      className="
        pointer-events-none
        select-none
        whitespace-nowrap
        font-display
        text-[16vw]
        font-black
        uppercase
        leading-[0.85]
        tracking-[-0.075em]
        text-white/[0.045]
        md:text-[15vw]
        lg:text-[13.5vw]
      "
    >
      TENDRILS
    </h3>

  </div>

</div>

        {/* =====================================================
            COPYRIGHT
            NO TOP BORDER
            ===================================================== */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-4
            py-7
            text-[11px]
            text-[#F7F2E8]/30
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <p>
            © {new Date().getFullYear()} Tendrils. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">

            <Link
              href="/privacy"
              className="transition hover:text-[#F7F2E8]/70"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#F7F2E8]/70"
            >
              Terms of Service
            </Link>

            {socials.slice(0, 3).map((social) => (
              <SafeLink
                key={`bottom-${social.platform}`}
                href={social.url}
                className="transition hover:text-[#F7F2E8]/70"
              >
                {social.platform}
              </SafeLink>
            ))}

          </div>

        </div>

      </div>
    </footer>
  );
}