"use client";
import FeatureGrid from "@/components/services/sections/FeatureGrid";
import TimelineSection from "@/components/services/sections/TimelineSection";
import SplitContent from "@/components/services/sections/SplitContent";
import CardsSection from "@/components/services/sections/CardsSection";
import ProcessSection from "@/components/services/sections/ProcessSection";
import FAQSection from "@/components/services/sections/FAQSection";
import QuoteSection from "@/components/services/sections/QuoteSection";
import RichContentSection from "./RichContentSection";
import ImageBannerSection from "./ImageBannerSection";
import CTABannerSection from "./CTABannerSection";
import TeamGridSection from "./TeamGridSection";
import PartnerGridSection from "./PartnerGridSection";
import TestimonialsGridSection from "./TestimonialsGridSection";

export default function UniversalSections({ sections = [] }) {
  return <div>{sections.map((section,index) => {
    const key = section?._key || `${section?._type}-${index}`;
    switch(section?._type) {
      case "featureGrid": return <FeatureGrid key={key} section={section} index={index}/>;
      case "timeline": return <TimelineSection key={key} section={section} index={index}/>;
      case "splitContent": return <SplitContent key={key} section={section} index={index}/>;
      case "cards": return <CardsSection key={key} section={section} index={index}/>;
      case "process": return <ProcessSection key={key} section={section} index={index}/>;
      case "faq": return <FAQSection key={key} section={section} index={index}/>;
      case "quote": return <QuoteSection key={key} section={section} index={index}/>;
      case "richContent": return <RichContentSection key={key} section={section}/>;
      case "imageBanner": return <ImageBannerSection key={key} section={section}/>;
      case "ctaBanner": return <CTABannerSection key={key} section={section}/>;
      case "teamGrid": return <TeamGridSection key={key} section={section}/>;
      case "testimonialsGrid": return <TestimonialsGridSection key={key} section={section}/>;
      case "partnerGrid": return <PartnerGridSection key={key} section={section}/>;
      default: return null;
    }
  })}</div>;
}
