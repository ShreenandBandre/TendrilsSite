"use client";

import EditorialHero from "./EditorialHero";
import SystemsHero from "./SystemsHero";
import InnovationHero from "./InnovationHero";
import GrowthHero from "./GrowthHero";
import JourneyHero from "./JourneyHero";

export default function ServiceHero({
  service,
  style = "editorial",
}) {
  if (!service) {
    return null;
  }

  switch (style) {
    case "systems":
      return <SystemsHero service={service} />;

    case "innovation":
      return <InnovationHero service={service} />;

    case "growth":
      return <GrowthHero service={service} />;

    case "journey":
      return <JourneyHero service={service} />;

    case "editorial":
    default:
      return <EditorialHero service={service} />;
  }
}