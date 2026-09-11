import Link from "next/link";

export default function RelatedServices({
  services = [],
}) {
  if (!services?.length) return null;

  return (
    <section className="border-t border-[#111111]/10 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
          Continue the journey
        </p>

        <h2 className="mt-4 font-display text-4xl">
          Related Services
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="group rounded-3xl border border-[#111111]/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[#C9A227]/40"
            >
              {service?.heroImage?.assetUrl && <img src={service.heroImage.assetUrl} alt={service.name || "Service"} className="mb-6 h-40 w-full rounded-2xl object-cover" />}
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7625]">
                {service.pillar}
              </p>

              <h3 className="mt-3 font-display text-2xl group-hover:text-[#9A7625]">
                {service.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#111111]/55">
                {service.shortDescription}
              </p>

              <span className="mt-6 inline-flex text-sm font-semibold text-[#9A7625]">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}