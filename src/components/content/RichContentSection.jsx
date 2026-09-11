import ProseContent from "./ProseContent";
import ActionLink from "./ActionLink";

export default function RichContentSection({ section }) {
  return (
    <section className="bg-[#F7F2E8] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        
        {section.eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[.3em] text-[#9A7625]">
            {section.eyebrow}
          </p>
        )}
        
        {section.heading && (
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-slate-900">
            {section.heading}
          </h2>
        )}

        <div className="mt-8 text-slate-700 leading-relaxed font-light">
          <ProseContent value={section.body} />
        </div>

        {section.cta && (
          <div className="mt-8">
            <ActionLink cta={section.cta} />
          </div>
        )}

      </div>
    </section>
  );
}