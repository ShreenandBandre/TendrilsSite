import FeatureGrid from "./FeatureGrid";
import TimelineSection from "./TimelineSection";
import SplitContent from "./SplitContent";
import CardsSection from "./CardsSection";
import ProcessSection from "./ProcessSection";
import FAQSection from "./FAQSection";
import QuoteSection from "./QuoteSection";

export default function SectionRenderer({
  section,
  index,
  pageStyle,
}) {
  switch (section._type) {
    case "featureGrid":
      return <FeatureGrid section={section} index={index} />;

    case "timeline":
      return <TimelineSection section={section} index={index} />;

    case "splitContent":
      return <SplitContent section={section} index={index} />;

    case "cards":
      return <CardsSection section={section} index={index} />;

    case "process":
      return <ProcessSection section={section} index={index} />;

    case "faq":
      return <FAQSection section={section} index={index} />;

    case "quote":
      return <QuoteSection section={section} index={index} />;

    default:
      return null;
  }
}