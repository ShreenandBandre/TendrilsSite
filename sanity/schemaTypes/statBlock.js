import { defineType, defineField } from "sanity";

export default defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value (e.g. 250+, 3)", type: "string" }),
    defineField({ name: "label", title: "Label (e.g. Global Consultants)", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
});