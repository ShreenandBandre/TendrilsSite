import { defineType, defineField } from "sanity";
export default defineType({
  name:"resource", title:"Resource", type:"document",
  fields:[
    defineField({name:"title",type:"string",validation:r=>r.required()}),
    defineField({name:"slug",type:"slug",options:{source:"title"},validation:r=>r.required()}),
    defineField({name:"type",title:"Resource Type",type:"string",options:{list:["Guide","Article","Report","Case Study","Video","Download"]}}),
    defineField({name:"excerpt",type:"text",rows:3}),
    defineField({name:"coverImage",type:"image",options:{hotspot:true}}),
    defineField({name:"publishedAt",type:"datetime"}),
    defineField({name:"author",type:"string"}),
    defineField({name:"body",type:"array",of:[{type:"block"},{type:"image",options:{hotspot:true}}]}),
    defineField({name:"externalUrl",title:"External URL",type:"url"}),
    defineField({name:"cta",type:"object",fields:[defineField({name:"label",type:"string"}),defineField({name:"href",type:"string"})]}),
    defineField({name:"seo",type:"seo"}),
  ]
});
