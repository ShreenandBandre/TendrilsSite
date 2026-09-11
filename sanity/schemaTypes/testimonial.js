import { defineField, defineType } from "sanity";
export default defineType({ name:"testimonial", title:"Testimonial / Quote", type:"document", fields:[
 defineField({name:"quote",type:"text",rows:4,validation:r=>r.required()}), defineField({name:"name",type:"string"}), defineField({name:"title",type:"string"}), defineField({name:"company",type:"string"}), defineField({name:"image",title:"Person Photo",type:"image",options:{hotspot:true}}), defineField({name:"videoUrl",type:"url"}), defineField({name:"featured",type:"boolean",initialValue:true}),
]});
