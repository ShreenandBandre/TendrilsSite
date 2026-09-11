import { PortableText } from "next-sanity";

export default function ProseContent({ value }) {
  if (!value?.length) return null;
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink/70 prose-a:text-gold-deep prose-strong:text-ink">
      <PortableText value={value} />
    </div>
  );
}
