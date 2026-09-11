import { defineField, defineType } from "sanity";
import { contentSectionTypes } from "./objects/contentSections";
export default defineType({
  name: "solution", title: "Solutions", type: "document",
  groups: [{name:"content",title:"Content",default:true},{name:"relationships",title:"Relationships"},{name:"publishing",title:"Publishing"},{name:"seo",title:"SEO"}],
  fields: [
    defineField({name:"title",title:"Solution Name",type:"string",group:"content",validation:r=>r.required()}),
    defineField({name:"slug",title:"URL Slug",type:"slug",group:"content",options:{source:"title",maxLength:96},validation:r=>r.required()}),
    defineField({name:"parent",title:"Parent Solution",type:"reference",group:"relationships",to:[{type:"solution"}],description:"Optional. Use this for nested solution pages."}),
    defineField({name:"category",title:"Solution Category",type:"string",group:"content"}),
    defineField({name:"shortDescription",title:"Short Description",type:"text",rows:3,group:"content"}),
    defineField({name:"summary",title:"Summary",type:"text",rows:4,group:"content"}),
    defineField({name:"homeImage",title:"Homepage Card Image",type:"image",group:"content",options:{hotspot:true},description:"Dedicated image used when this solution is featured on the homepage. Falls back to the Hero Image if left empty."}),
    defineField({name:"pageStyle",title:"Page Style",type:"string",group:"content",options:{layout:"radio",list:[{title:"Editorial",value:"editorial"},{title:"Systems / Architecture",value:"systems"},{title:"Innovation",value:"innovation"},{title:"Growth / Outcomes",value:"growth"}]},initialValue:"editorial"}),
    defineField({name:"hero",title:"Hero",type:"object",group:"content",fields:[defineField({name:"eyebrow",type:"string"}),defineField({name:"headline",type:"string"}),defineField({name:"highlight",title:"Highlighted Text",type:"string"}),defineField({name:"description",type:"text",rows:4}),defineField({name:"image",type:"image",options:{hotspot:true}}),defineField({name:"primaryCta",type:"cta"}),defineField({name:"secondaryCta",type:"cta"})]}),
    defineField({name:"stats",title:"Key Outcomes / Stats",type:"array",group:"content",of:[{type:"object",fields:[defineField({name:"value",type:"string"}),defineField({name:"label",type:"string"}),defineField({name:"image",title:"Image",type:"image",options:{hotspot:true}})]}]}),
    defineField({name:"integrations",title:"Platforms & Integrations",type:"array",group:"content",of:[{type:"string"}]}),
    defineField({
      name:"sections",
      title:"Page Sections",
      type:"array",
      group:"content",
      description:"Build the page in any order. Cards, feature grids, timelines, process steps and CTAs can link directly to another CMS page.",
      of: contentSectionTypes.map((sectionType) => ({ type: sectionType.name })),
    }),
    defineField({name:"platformVariants",title:"Platform / Implementation Variants",type:"array",group:"content",of:[{type:"object",fields:[defineField({name:"platform",type:"string"}),defineField({name:"slug",type:"slug",options:{source:"platform"}}),defineField({name:"description",type:"text",rows:3}),defineField({name:"features",type:"array",of:[{type:"string"}]}),defineField({name:"body",type:"array",of:[{type:"block"}]})]}]}),
    defineField({name:"body",title:"Additional Rich Content",type:"array",group:"content",of:[{type:"block"},{type:"image",options:{hotspot:true}}]}),
    defineField({name:"relatedServices",title:"Related Services",type:"array",group:"relationships",of:[{type:"reference",to:[{type:"service"}]}]}),
    defineField({name:"industries",title:"Relevant Industries",type:"array",group:"relationships",of:[{type:"reference",to:[{type:"industry"}]}]}),
    defineField({name:"relatedCaseStudies",title:"Related Case Studies",type:"array",group:"relationships",of:[{type:"reference",to:[{type:"caseStudy"}]}]}),
    defineField({name:"featured",title:"Featured",type:"boolean",group:"publishing",initialValue:true}),
    defineField({name:"order",title:"Navigation / Display Order",type:"number",group:"publishing"}),
    defineField({name:"seo",type:"seo",group:"seo"})
  ],
  preview:{select:{title:"title",subtitle:"category",media:"hero.image"},prepare:({title,subtitle,media})=>({title,subtitle:subtitle||"Solution",media})}
});
