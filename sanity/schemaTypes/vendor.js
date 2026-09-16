import { defineField, defineType } from "sanity";

/**
 * VENDOR
 * A tech/platform partner logo shown in the Vendors grid on the
 * Homepage and About page (e.g. Shopify Plus, Klaviyo, NetSuite).
 */
export default defineType({
  name: "vendor",
  title: "Vendor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "e.g. Commerce Platform, ERP, Marketing, Fulfillment",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Link (optional)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "logo" },
  },
});
