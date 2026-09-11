import Link from "next/link";

function pageHref(page) {
  if (!page?.slug || !page?._type) return null;

  const base = {
    service: "/services",
    industry: "/industries",
    solution: "/solutions",
    caseStudy: "/case-studies",
  }[page._type];

  if (!base) return null;

  const parents = [];
  let current = page.parent;
  while (current?.slug && parents.length < 10) {
    parents.unshift(current.slug);
    current = current.parent;
  }

  return `${base}/${[...parents, page.slug].join("/")}`;
}

export default function ActionLink({ cta, className = "" }) {
  if (!cta?.label) return null;

  const href = pageHref(cta.page) || cta.href;
  if (!href) return null;

  const external = /^https?:\/\//i.test(href);
  const cls = `inline-flex items-center rounded-full bg-[#C9A227] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#F7F2E8] ${className}`;

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {cta.label} <span className="ml-2">↗</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {cta.label} <span className="ml-2">→</span>
    </Link>
  );
}
