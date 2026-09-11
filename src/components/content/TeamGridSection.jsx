import ActionLink from "./ActionLink";

export default function TeamGridSection({ section }) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white px-6 py-28 md:py-40">
      
      {/* 🌟 Deep Dark Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[1200px] rounded-full bg-gradient-to-r from-purple-900/20 via-blue-900/15 to-emerald-900/20 blur-[160px] pointer-events-none" />

      {/* 🧊 Pastel-Tinted Floating Squary Grid Outlines on Dark BG */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 grid grid-cols-3 md:grid-cols-4 gap-6 pointer-events-none opacity-30 py-20 z-0">
        <div className="h-56 rounded-[2rem] border border-blue-400/30 bg-blue-500/[0.04] backdrop-blur-3xl translate-y-6 shadow-2xl" />
        <div className="h-72 rounded-[2rem] border border-pink-400/30 bg-pink-500/[0.04] backdrop-blur-3xl -translate-y-12 shadow-2xl" />
        <div className="h-64 rounded-[2rem] border border-emerald-400/30 bg-emerald-500/[0.04] backdrop-blur-3xl translate-y-10 shadow-2xl" />
        <div className="h-80 rounded-[2rem] border border-purple-400/30 bg-purple-500/[0.04] backdrop-blur-3xl -translate-y-6 shadow-2xl" />
        <div className="h-60 rounded-[2rem] border border-pink-400/30 bg-pink-500/[0.04] backdrop-blur-3xl translate-y-4 shadow-2xl" />
        <div className="h-64 rounded-[2rem] border border-blue-400/30 bg-blue-500/[0.04] backdrop-blur-3xl -translate-y-16 shadow-2xl" />
        <div className="h-72 rounded-[2rem] border border-emerald-400/30 bg-emerald-500/[0.04] backdrop-blur-3xl translate-y-12 shadow-2xl" />
        <div className="h-60 rounded-[2rem] border border-purple-400/30 bg-purple-500/[0.04] backdrop-blur-3xl -translate-y-8 shadow-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          {section.eyebrow && (
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C9A227]/40 bg-[#141414] px-5 py-2 shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#C9A227] animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
                {section.eyebrow}
              </p>
            </div>
          )}

          <h2 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1]">
            {section.heading}
          </h2>

          {section.description && (
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed font-light">
              {section.description}
            </p>
          )}
        </div>

        {/* Members Grid */}
        <div className="mt-24 grid gap-x-8 gap-y-24 sm:grid-cols-2 lg:grid-cols-4">
          {(section.members || []).map((m, i) => (
            <article 
              key={m._key || i}
              className="group relative flex flex-col items-center text-center pt-20"
            >
              {/* Floating Circular Image Container */}
              <div className="absolute top-0 z-20 h-36 w-36 sm:h-40 sm:w-40 flex-shrink-0 transition-transform duration-500 group-hover:-translate-y-2">
                
                {/* Outer Golden Ring Frame */}
                <div className="absolute inset-0 rounded-full border-2 border-[#C9A227]/50 bg-[#161616] p-1.5 shadow-2xl shadow-black/80 group-hover:border-[#C9A227] transition-all duration-300" />
                
                {/* Image Wrapper */}
                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1C1C1C]">
                  {m.image?.assetUrl ? (
                    <img
                      src={m.image.assetUrl}
                      alt={m.name || "Team member"}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-400 font-display text-xs">
                      No Photo
                    </div>
                  )}
                </div>
              </div>

              {/* Dark Glass Content Card */}
              <div className="w-full rounded-[32px] border border-white/10 bg-[#141414]/90 pt-24 pb-8 px-7 shadow-2xl shadow-black/60 backdrop-blur-md transition-all duration-500 group-hover:border-[#C9A227]/50 group-hover:bg-[#181818] group-hover:shadow-[#C9A227]/10 flex flex-col flex-grow">
                
                <h3 className="font-display text-2xl font-normal text-white transition-colors duration-300 group-hover:text-[#C9A227]">
                  {m.name}
                </h3>
                
                <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                  {m.role}
                </p>

                {m.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-white/60 font-light line-clamp-3 flex-grow">
                    {m.bio}
                  </p>
                )}

                {m.linkedin && (
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C9A227] transition-all duration-300 hover:gap-3"
                    >
                      <span>Connect</span>
                      <span className="text-base leading-none">→</span>
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}