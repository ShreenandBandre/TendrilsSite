import ActionLink from "./ActionLink";

export default function CTABannerSection({ section }) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-28 text-white md:py-36">
      
      {/* 🌟 Luxury Ambient Glows & Mesh Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[900px] rounded-full bg-[#C9A227]/12 blur-[140px] pointer-events-none" />
      
      {/* Subtle Border Glow Lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />

      <div className="relative mx-auto max-w-5xl text-center">
        
        {/* Eyebrow Badge */}
        {section.eyebrow && (
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C9A227]/30 bg-[#161616] px-5 py-2 shadow-lg backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#C9A227] animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
              {section.eyebrow}
            </p>
          </div>
        )}

        {/* Heading */}
        <h2 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1]">
          {section.heading}
        </h2>

        {/* Description */}
        {section.description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed font-light">
            {section.description}
          </p>
        )}

        {/* Action Link / Button Area */}
        {section.cta && (
          <div className="mt-12 flex justify-center items-center">
            <div className="group relative inline-block p-px rounded-full bg-gradient-to-r from-[#C9A227]/50 via-white/20 to-[#C9A227]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#C9A227]/20">
              <ActionLink 
                cta={section.cta} 
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 bg-gradient-to-r from-[#C9A227] to-[#E2C355] transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}