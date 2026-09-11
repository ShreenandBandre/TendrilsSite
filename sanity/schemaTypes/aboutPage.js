import { defineType, defineField } from "sanity";
import { contentSectionTypes } from "./objects/contentSections";

export default defineType({
  name: "aboutPage", title: "About Us", type: "document",
  fields: [
    defineField({ name:"title", type:"string", initialValue:"About Tendrils" }),
    defineField({ name:"slug", type:"slug", options:{ source:"title" }, initialValue:{current:"about"} }),
    defineField({ name:"hero", title:"Hero", type:"object", fields:[defineField({name:"eyebrow",type:"string"}),defineField({name:"headline",type:"string"}),defineField({name:"highlight",type:"string"}),defineField({name:"description",type:"text",rows:4}),defineField({name:"image",type:"image",options:{hotspot:true}}),defineField({name:"primaryCta",type:"object",fields:[defineField({name:"label",type:"string"}),defineField({name:"href",type:"string"})]})] }),
    defineField({ name:"sections", title:"About Page Sections", type:"array", of:contentSectionTypes.map(x=>({type:x.name})) }),
    defineField({ name:"seo", type:"seo" }),
  ],
});
