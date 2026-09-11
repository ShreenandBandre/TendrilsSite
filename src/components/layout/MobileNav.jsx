"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useSiteStore } from "@/store/useSiteStore";

const FALLBACK_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function MobileNav({ settings }) {
  const mobileLogo =
    settings?.headerLogo?.assetUrl ||
    settings?.headerLogoDark?.assetUrl ||
    settings?.headerLogoLight?.assetUrl;
  const open = useUIStore((s) => s.isMobileNavOpen);
  const close = useUIStore((s) => s.closeMobileNav);
  const configuredLinks = settings?.navLinks?.length ? settings.navLinks : FALLBACK_LINKS;
  const links = (configuredLinks.some((link) => String(link?.label || "").toLowerCase() === "about us") ? configuredLinks : [...configuredLinks, { label: "About Us", href: "/about" }]).filter((link) => String(link?.label || "").toLowerCase() !== "resources");

  /* SHARED STORE STATE — populated once by FloatingNavbar, reused here
     to avoid duplicate Sanity/API fetches between desktop and mobile nav. */
  const services = useSiteStore((s) => s.services);
  const industries = useSiteStore((s) => s.industries);
  const solutions = useSiteStore((s) => s.solutions);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <motion.div initial={false} animate={{ x: open ? 0 : "100%" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-[60] bg-ivory px-8 py-8 md:hidden overflow-y-auto" aria-hidden={!open}>
      <div className="flex items-center justify-between">
        <Link href="/" onClick={close} className="flex items-center" aria-label="Tendrils home">
          {mobileLogo ? (
            <img src={mobileLogo} alt={settings?.headerLogoAlt || "Tendrils"} className="h-8 w-auto object-contain" />
          ) : (
            <span className="font-display text-2xl text-black">Tendrils</span>
          )}
        </Link>
        <button onClick={close} aria-label="Close menu"><X /></button>
      </div>
      <nav className="mt-12 flex flex-col gap-6 pb-16">
        {links.map((link) => {
          const labelLower = String(link.label).toLowerCase();

          // SERVICES ACCORDION
          if (labelLower === "services") {
            return (
              <div key={`${link.label}-${link.href}`}>
                <button onClick={() => setServicesOpen((v) => !v)} className="flex w-full items-center justify-between font-display text-4xl text-left">
                  {link.label}
                  <span className={`text-2xl transition ${servicesOpen ? "rotate-180 text-gold-deep" : ""}`}>⌄</span>
                </button>
                {servicesOpen && (
                  <div className="mt-4 space-y-3 border-l border-gold/30 pl-5">
                    {services.map((service) => {
                      const slug = typeof service?.slug === "string" ? service.slug : service?.slug?.current;
                      return (
                        <div key={service._id || slug}>
                          <Link href={`/services/${slug}`} onClick={close} className="block text-lg text-ink/65">
                            {service.name || service.title}
                          </Link>
                          {service.children?.map((child) => (
                            <Link key={child._id} href={`/services/${slug}/${child.slug}`} onClick={close} className="ml-4 mt-2 block text-sm text-ink/45">
                              ↳ {child.name}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                    <Link href="/services" onClick={close} className="block text-sm font-semibold text-gold-deep pt-1">View all services →</Link>
                  </div>
                )}
              </div>
            );
          }

          // INDUSTRIES ACCORDION
          if (labelLower === "industries") {
            return (
              <div key={`${link.label}-${link.href}`}>
                <button onClick={() => setIndustriesOpen((v) => !v)} className="flex w-full items-center justify-between font-display text-4xl text-left">
                  {link.label}
                  <span className={`text-2xl transition ${industriesOpen ? "rotate-180 text-gold-deep" : ""}`}>⌄</span>
                </button>
                {industriesOpen && (
                  <div className="mt-4 space-y-3 border-l border-gold/30 pl-5">
                    {industries.map((ind) => {
                      const slug = typeof ind?.slug === "string" ? ind.slug : ind?.slug?.current;
                      return (
                        <div key={ind._id || slug}>
                          <Link href={`/industries/${slug}`} onClick={close} className="block text-lg text-ink/65">
                            {ind.title || ind.name}
                          </Link>
                          {ind.children?.map((child) => (
                            <Link key={child._id} href={`/industries/${slug}/${child.slug}`} onClick={close} className="ml-4 mt-2 block text-sm text-ink/45">
                              ↳ {child.title}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                    <Link href="/industries" onClick={close} className="block text-sm font-semibold text-gold-deep pt-1">View all industries →</Link>
                  </div>
                )}
              </div>
            );
          }

          // SOLUTIONS ACCORDION
          if (labelLower === "solutions") {
            return (
              <div key={`${link.label}-${link.href}`}>
                <button onClick={() => setSolutionsOpen((v) => !v)} className="flex w-full items-center justify-between font-display text-4xl text-left">
                  {link.label}
                  <span className={`text-2xl transition ${solutionsOpen ? "rotate-180 text-gold-deep" : ""}`}>⌄</span>
                </button>
                {solutionsOpen && (
                  <div className="mt-4 space-y-3 border-l border-gold/30 pl-5">
                    {solutions.map((solution) => {
                      const slug = typeof solution?.slug === "string" ? solution.slug : solution?.slug?.current;
                      return (
                        <div key={solution._id || slug}>
                          <Link href={`/solutions/${slug}`} onClick={close} className="block text-lg text-ink/65">
                            {solution.title}
                          </Link>
                          {solution.children?.map((child) => (
                            <Link key={child._id} href={`/solutions/${slug}/${child.slug}`} onClick={close} className="ml-4 mt-2 block text-sm text-ink/45">
                              ↳ {child.title}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                    <Link href="/solutions" onClick={close} className="block text-sm font-semibold text-gold-deep pt-1">View all solutions →</Link>
                  </div>
                )}
              </div>
            );
          }

          // NORMAL LINKS
          return (
            <Link key={`${link.label}-${link.href}`} href={link.href} onClick={close} className="font-display text-4xl">
              {link.label}
            </Link>
          );
        })}

        <Link href="/contact" onClick={close} className="mt-4 inline-flex w-fit rounded-full bg-gold px-6 py-3 font-semibold text-ink">
          Book a Consultation
        </Link>
      </nav>
    </motion.div>
  );
}