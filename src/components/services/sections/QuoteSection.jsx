"use client";
import { motion } from "framer-motion";

export default function QuoteSection({ section }) {
  if (!section?.text) return null;
  const imageUrl = section.image?.assetUrl || section.image?.asset?.url;
  return <section className="relative overflow-hidden bg-[#EDE2D0] px-6 py-24 md:py-32">
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25"><div className="h-[450px] w-[450px] rounded-full bg-[#C9A227]/15 blur-[130px]" /></div>
    <div className="relative mx-auto max-w-4xl">
      <motion.div initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.7}} className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/[.5] p-10 shadow-[0_25px_60px_rgba(40,32,20,.06)] backdrop-blur-md md:p-16">
        <span className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
        <div className="relative z-10 text-center">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[.35em] text-[#9A7625]">{section.eyebrow || "Perspective"}</p>
          <blockquote className="font-display text-2xl leading-[1.35] tracking-tight text-[#111] md:text-4xl">“{section.text}”</blockquote>
          {imageUrl && <img src={imageUrl} alt={section.imageAlt || section.author || "Quote author"} className="mx-auto mt-8 h-16 w-16 rounded-full object-cover ring-2 ring-[#C9A227]/30" />}
          {(section.author || section.role || section.company) && <div className="mt-5 flex flex-col items-center gap-1"><p className="font-display text-base">{section.author}</p>{(section.role||section.company)&&<p className="text-xs font-semibold uppercase tracking-[.2em] text-[#9A7625]">{[section.role,section.company].filter(Boolean).join(" · ")}</p>}</div>}
        </div>
      </motion.div>
    </div>
  </section>;
}
