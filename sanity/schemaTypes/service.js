import { defineType, defineField } from "sanity";
import { contentSectionTypes } from "./objects/contentSections";

export default defineType({
  name: "service", title: "Service", type: "document",
  fields: [
    defineField({ name: "name", title: "Service Name", type: "string", validation: Rule => Rule.required() }),
    defineField({ name: "slug", title: "URL Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({
      name: "parent",
      title: "Parent Service",
      type: "reference",
      to: [{ type: "service" }],
      description: "Optional. Use this when this service is a deeper page, for example SEO > Technical SEO.",
    }),
    defineField({ name: "pillar", title: "Service Pillar", type: "string", options: { list: [{ title:"Build",value:"build" },{ title:"Automate",value:"automate" },{ title:"Scale",value:"scale" },{ title:"Grow",value:"grow" },{ title:"Support",value:"support" }] }, validation: Rule => Rule.required() }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Main Description", type: "text", rows: 6 }),
    defineField({ name: "order", title: "Navigation Order", type: "number" }),
    defineField({ name: "featured", title: "Featured Service", type: "boolean", initialValue: false }),
    defineField({ name: "pageStyle", title: "Page Style", type: "string", options: { list: [{ title:"Editorial",value:"editorial" },{ title:"Systems / Architecture",value:"systems" },{ title:"AI / Innovation",value:"innovation" },{ title:"Growth / Metrics",value:"growth" },{ title:"Journey / Support",value:"journey" }], layout:"radio" }, initialValue:"editorial" }),
    defineField({ name: "hero", title: "Hero", type: "object", fields: [
      defineField({ name:"eyebrow", type:"string" }), defineField({ name:"headline", type:"string" }), defineField({ name:"highlight", type:"string" }), defineField({ name:"description", type:"text", rows:4 }),
      defineField({ name:"image", title:"Hero Image", type:"image", options:{ hotspot:true } }),
      defineField({ name:"primaryCta", title:"Primary CTA", type:"object", fields:[defineField({name:"label",type:"string"}),defineField({name:"href",type:"string"})] }),
      defineField({ name:"secondaryCta", title:"Secondary CTA", type:"object", fields:[defineField({name:"label",type:"string"}),defineField({name:"href",type:"string"})] }),
    ] }),
    defineField({ name:"stats", title:"Stats", type:"array", of:[{type:"statItem"}] }),
    defineField({ name:"sections", title:"Page Sections", type:"array", of: contentSectionTypes.map(x => ({ type:x.name })) }),
    defineField({ name:"relatedServices", title:"Related Services", type:"array", of:[{type:"reference",to:[{type:"service"}]}] }),
    defineField({ name:"industries", title:"Relevant Industries", type:"array", of:[{type:"reference",to:[{type:"industry"}]}] }),
    defineField({ name:"seo", title:"SEO", type:"seo" }),
  ],
});
