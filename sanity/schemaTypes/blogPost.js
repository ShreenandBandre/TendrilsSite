import { defineField, defineType } from "sanity";

export default defineType({
name: "blogPost",
title: "Blog Post",
type: "document",
fields: [
defineField({ name: "title", type: "string", validation: (r) => r.required() }),
defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
defineField({ name: "pillar", type: "string", options: { list: ["Build", "Automate", "Scale", "Grow", "Support"] } }),
defineField({ name: "author", type: "string" }),
defineField({ name: "publishedAt", type: "datetime" }),
defineField({ name: "excerpt", type: "text", rows: 2 }),
defineField({ name: "coverImage", type: "image" }),
defineField({ name: "body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
defineField({ name: "seo", type: "seo" }),
],
});
