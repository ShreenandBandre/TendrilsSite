export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="relative overflow-hidden bg-[#F7F2E8] px-6 pt-40 pb-32 md:pt-48 md:profil-40 text-slate-900">
      
      {/* 🌟 Warm-up & Radiant Glows (Champagne & Soft Gold Ambiance) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] rounded-full bg-gradient-to-b from-[#EEDDC4]/60 via-[#F5EAD9]/40 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-[#E5C585]/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-[#F3E2C4]/40 blur-[100px] pointer-events-none" />

      {/* 🧊 Squary Grid Background Effect (Exact Screenshot Vibe) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A22718_1px,transparent_1px),linear-gradient(to_bottom,#C9A22718_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Background Squary Floating Card Outlines (Like the image boxes) */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 pointer-events-none opacity-60">
        <div className="h-52 rounded-[2.5rem] border border-[#C9A227]/25 bg-white/20 backdrop-blur-2xl translate-y-16 shadow-sm" />
        <div className="h-72 rounded-[2.5rem] border border-[#C9A227]/25 bg-white/30 backdrop-blur-2xl -translate-y-4 shadow-sm" />
        <div className="h-60 rounded-[2.5rem] border border-[#C9A227]/25 bg-white/20 backdrop-blur-2xl translate-y-10 shadow-sm" />
        <div className="h-64 rounded-[2.5rem] border border-[#C9A227]/25 bg-white/30 backdrop-blur-2xl -translate-y-8 shadow-sm" />
      </div>

      {/* Header Content */}
      <div className="relative mx-auto max-w-4xl text-center z-10">
        
        {/* Eyebrow Badge */}
        {eyebrow && (
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C9A227]/30 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#9A7625] animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7625]">
              {eyebrow}
            </p>
          </div>
        )}

        {/* Title */}
        <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-[1.08]">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            {description}
          </p>
        )}

      </div>
    </header>
  );
}