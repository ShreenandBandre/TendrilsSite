import { defineField, defineType } from "sanity";

const ctaFields = [
  defineField({ name: "label", title: "Button Label", type: "string" }),
  defineField({ name: "href", title: "Link / URL", type: "string", description: "Use /path for an internal page or https://... for an external link." }),
  defineField({
    name: "page",
    title: "Or Link to CMS Page",
    type: "reference",
    to: [
      { type: "service" },
      { type: "industry" },
      { type: "solution" },
      { type: "caseStudy" },
    ],
    description: "Optional. Prefer this for internal CMS pages so the URL follows the page hierarchy.",
  }),
];

const imageField = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
});

export const featureGrid = defineType({
  name: "featureGrid", title: "Feature Grid", type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "items", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 3 }),
      defineField({ name: "number", type: "string" }),
      imageField,
      defineField({ name: "cta", title: "Card Link", type: "object", fields: ctaFields }),
    ], preview: { select: { title: "title", media: "image" } } }] }),
    defineField({ name: "cta", title: "Section Button", type: "object", fields: ctaFields }),
  ],
});

export const splitContent = defineType({
  name: "splitContent", title: "Split Content", type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "description", type: "text", rows: 5 }),
    imageField,
    defineField({ name: "imageAlt", title: "Image Alt Text", type: "string" }),
    defineField({ name: "side", type: "string", options: { list: [{ title: "Image Right", value: "right" }, { title: "Image Left", value: "left" }] }, initialValue: "right" }),
    defineField({ name: "cta", title: "Button", type: "object", fields: ctaFields }),
  ],
});

export const cards = defineType({
  name: "cards", title: "Cards", type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "cards", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 3 }),
      defineField({ name: "tag", type: "string" }),
      imageField,
      defineField({ name: "cta", title: "Card Link", type: "object", fields: ctaFields }),
    ], preview: { select: { title: "title", media: "image" } } }] }),
  ],
});

export const timeline = defineType({
  name: "timeline", title: "Timeline", type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "steps", type: "array", of: [{ type: "object", fields: [defineField({ name: "number", type: "string" }), defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }), imageField, defineField({ name: "cta", type: "object", fields: ctaFields })] }] }),
  ],
});

export const process = defineType({
  name: "process", title: "Process", type: "object",
  fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }), defineField({ name: "steps", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }), imageField] }] }), defineField({ name: "cta", type: "object", fields: ctaFields })],
});

export const faq = defineType({
  name: "faq", title: "FAQs", type: "object",
  fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "items", type: "array", of: [{ type: "object", fields: [defineField({ name: "question", type: "string" }), defineField({ name: "answer", type: "text", rows: 5 })] }] })],
});

export const quote = defineType({
  name: "quote", title: "Quote", type: "object",
  fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "text", type: "text", rows: 5, validation: r => r.required() }), defineField({ name: "author", type: "string" }), defineField({ name: "role", type: "string" }), defineField({ name: "company", type: "string" }), imageField, defineField({ name: "imageAlt", type: "string" })],
});

export const richContent = defineType({
  name: "richContent", title: "Rich Content", type: "object",
  fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "body", title: "Content", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }), defineField({ name: "cta", type: "object", fields: ctaFields })],
});

export const imageBanner = defineType({
  name: "imageBanner", title: "Image Banner", type: "object",
  fields: [imageField, defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }), defineField({ name: "cta", type: "object", fields: ctaFields })],
});

export const ctaBanner = defineType({
  name: "ctaBanner", title: "CTA Banner", type: "object",
  fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }), defineField({ name: "cta", type: "object", fields: ctaFields })],
});

export const teamGrid = defineType({
  name: "teamGrid", title: "Team Grid", type: "object",
  fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }), defineField({ name: "members", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "role", type: "string" }), imageField, defineField({ name: "bio", type: "text", rows: 3 }), defineField({ name: "linkedin", type: "url" })], preview: { select: { title: "name", subtitle: "role", media: "image" } } }] })],
});


export const testimonialsGrid = defineType({
  name: "testimonialsGrid", title: "Testimonials / What People Say", type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "testimonials", type: "array", of: [{ type: "reference", to: [{ type: "testimonial" }] }] }),
  ],
});

export const partnerGrid = defineType({
  name: "partnerGrid", title: "Partners / Clients", type: "object",
  fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }), defineField({ name: "partners", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), imageField, defineField({ name: "url", type: "url" })], preview: { select: { title: "name", media: "image" } } }] })],
});

export const contentSectionTypes = [featureGrid, timeline, splitContent, cards, process, faq, quote, richContent, imageBanner, ctaBanner, teamGrid, testimonialsGrid, partnerGrid];
