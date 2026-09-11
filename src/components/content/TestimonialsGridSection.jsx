export default function TestimonialsGridSection({ section }) {
  return (
    <section className="relative overflow-hidden bg-[#FAF6EE] px-6 py-20 md:py-28">
      
      {/* Soft Warm Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[1000px] rounded-full bg-[#E5C585]/15 blur-[140px] pointer-events-none" />

      {/* Warm & Subtle Squary Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: '#FAF6EE',
          backgroundImage: `
            linear-gradient(to right, rgba(184, 150, 74, 0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(184, 150, 74, 0.10) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 45%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, #000 45%, transparent 100%)'
        }}
      />

      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Header Section (Centered) */}
        <div className="mx-auto max-w-3xl text-center">
          {section.eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white/90 px-3.5 py-1 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9A7625]" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
                {section.eyebrow}
              </p>
            </div>
          )}

          <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight text-slate-900">
            {section.heading}
          </h2>

          {section.description && (
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-slate-600 leading-relaxed font-light">
              {section.description}
            </p>
          )}
        </div>

        {/* Compact Zigzag Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          {(section.testimonials || []).map((t, i) => (
            <article 
              key={t._id || i}
              className={`group relative flex flex-col justify-between rounded-3xl border border-[#E8DFD0] bg-white/85 p-6 md:p-8 shadow-md shadow-slate-900/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227]/50 hover:bg-white hover:shadow-xl hover:shadow-[#C9A227]/10 ${
                i % 2 !== 0 ? 'md:translate-y-8 lg:translate-y-10' : ''
              }`}
            >
              {/* Watermark Quote */}
              <div className="absolute top-4 right-6 font-display text-5xl text-[#C9A227]/15 pointer-events-none select-none transition-colors duration-300 group-hover:text-[#C9A227]/30">
                “
              </div>

              {/* Quote Content */}
              <div className="relative z-10">
                <div className="flex gap-1 mb-4 text-[#9A7625]">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-xs">★</span>
                  ))}
                </div>

                <p className="font-display text-lg md:text-xl leading-relaxed text-slate-800 font-normal">
                  “{t.quote}”
                </p>
              </div>

              {/* Client Info */}
              <div className="relative z-10 mt-8 flex items-center gap-3.5 pt-5 border-t border-slate-200/60">
                {t.image?.assetUrl ? (
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#C9A227]/30 shadow-sm">
                    <img 
                      src={t.image.assetUrl} 
                      alt={t.name || "Client"} 
                      className="h-full w-full object-cover object-center" 
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#F7F2E8] font-display text-xs text-[#9A7625] shadow-inner">
                    {t.name ? t.name.charAt(0) : "C"}
                  </div>
                )}

                <div>
                  <p className="font-display text-base font-medium text-slate-900">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#9A7625]">
                    {[t.title, t.company].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}