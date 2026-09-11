import SectionHeading from "./SectionHeading";
import FAQItem from "./FAQItem";

export default function FAQSection({ section }) {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          heading={
            section.heading ||
            "Frequently Asked Questions"
          }
        />

        <div className="mt-12 divide-y divide-[#111111]/10">
          {section.items?.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}