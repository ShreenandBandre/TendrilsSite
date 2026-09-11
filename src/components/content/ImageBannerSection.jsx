import ActionLink from "./ActionLink";

export default function ImageBannerSection({ section }) {
  const src = section.image?.assetUrl || null;

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#0A0A0A] border border-[#C9A227]/30 shadow-2xl shadow-slate-950/20 min-h-[520px]">
        
        {/* Background Image with Rich Contrast */}
        {src && (
          <img 
            src={src} 
            alt={section.heading || "Tendrils"} 
            className="absolute inset-0 h-full w-full object-cover object-center opacity-65 transition-transform duration-1000 ease-out hover:scale-105" 
          />
        )}

        {/* Cinematic Multi-stop Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30 backdrop-blur-[2px]" />

        {/* Top Gold Accent Glow inside Banner */}
        <div className="absolute top-0 left-1/4 h-48 w-96 rounded-full bg-[#C9A227]/20 blur-[90px] pointer-events-none" />

        {/* Banner Content Container */}
        <div className="relative z-10 flex min-h-[520px] max-w-3xl flex-col justify-center px-8 py-16 md:px-16 text-white">
          
          {/* Eyebrow Pill Badge */}
          {section.eyebrow && (
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C9A227]/40 bg-black/60 px-4 py-1.5 backdrop-blur-md w-fit mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
                {section.eyebrow}
              </p>
            </div>
          )}

          {/* Heading */}
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white leading-[1.1]">
            {section.heading}
          </h2>

          {/* Description */}
          {section.description && (
            <p className="mt-6 text-lg leading-relaxed text-white/75 font-light max-w-2xl">
              {section.description}
            </p>
          )}

          {/* Action Link / CTA */}
          {section.cta && (
            <div className="mt-10">
              <ActionLink cta={section.cta} />
            </div>
          )}

        </div>

      </div>
    </section>
  );
}