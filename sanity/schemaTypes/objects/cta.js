import { defineField, defineType } from "sanity";

export default defineType({
name: "cta",
title: "CTA",
type: "object",
fields: [
defineField({ name: "label", type: "string" }),
defineField({ name: "href", type: "string", description: "Optional manual URL. CMS Page is preferred for internal links." }),
defineField({
  name: "page",
  title: "CMS Page",
  type: "reference",
  to: [
    { type: "service" },
    { type: "industry" },
    { type: "solution" },
    { type: "caseStudy" },
  ],
}),
defineField({ name: "style", type: "string", options: { list: ["primary", "secondary"] }, initialValue: "primary" }),
],
});
