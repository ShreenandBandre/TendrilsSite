import { defineField, defineType } from "sanity";

export default defineType({
  name: "industry",
  title: "Industry",
  type: "document",

  fields: [
    /* =========================================================
       BASIC INFORMATION
    ========================================================= */

    defineField({
      name: "title",
      title: "Industry Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "parent",
      title: "Parent Industry",
      type: "reference",
      to: [{ type: "industry" }],
      description: "Optional. Use this to create nested industry pages.",
    }),

    defineField({
      name: "category",
      title: "Industry Category",
      type: "string",
      description:
        "Short classification used for navigation and page context.",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "order",
      title: "Navigation Order",
      type: "number",
      description:
        "Lower numbers appear first in the Industries navigation.",
      initialValue: 0,
    }),

    defineField({
      name: "featured",
      title: "Featured Industry",
      type: "boolean",
      initialValue: false,
      description:
        "Featured industries can be surfaced in the Homepage Industries section.",
    }),

    defineField({
      name: "homeImage",
      title: "Homepage Card Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Dedicated image used when this industry is featured on the homepage. Falls back to the Hero Image if left empty.",
    }),

    /* =========================================================
       HERO
    ========================================================= */

    defineField({
      name: "hero",
      title: "Industry Hero",
      type: "object",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Industry",
        }),

        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "highlight",
          title: "Highlighted Text",
          type: "string",
          description:
            "Optional phrase that can receive Tendrils gold styling.",
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),

        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),

        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
            }),
          ],
        }),

        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    /* =========================================================
       PAIN POINTS
    ========================================================= */

    defineField({
      name: "painPoints",
      title: "Common Challenges",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      description:
        "The biggest operational or commerce challenges businesses in this industry face.",
    }),

    /* =========================================================
       INDUSTRY CHARACTERISTICS
    ========================================================= */

    defineField({
      name: "characteristics",
      title: "Industry Characteristics",
      type: "array",

      of: [
        {
          type: "object",

          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),

            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    }),

    /* =========================================================
       COMMERCE JOURNEY
    ========================================================= */

    defineField({
      name: "journey",
      title: "Commerce Journey",
      type: "array",

      of: [
        {
          type: "object",

          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
            }),

            defineField({
              name: "title",
              title: "Stage",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),

            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    }),

    /* =========================================================
       COMMERCE ECOSYSTEM
    ========================================================= */

    defineField({
      name: "ecosystem",
      title: "Commerce Ecosystem",
      type: "array",

      of: [
        {
          type: "object",

          fields: [
            defineField({
              name: "name",
              title: "System / Platform",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "category",
              title: "Category",
              type: "string",
              description:
                "Example: Storefront, ERP, CRM, PIM, OMS, Analytics.",
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),

            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],

          preview: {
            select: {
              title: "name",
              subtitle: "category",
            },
          },
        },
      ],
    }),

    /* =========================================================
       CAPABILITIES
    ========================================================= */

    defineField({
      name: "capabilities",
      title: "Industry Capabilities",
      type: "array",

      of: [
        {
          type: "object",

          fields: [
            defineField({
              name: "title",
              title: "Capability",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),

            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    }),

    /* =========================================================
       STATS
    ========================================================= */

    defineField({
      name: "stats",
      title: "Industry Statistics",
      type: "array",

      of: [
        {
          type: "object",

          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],

          preview: {
            select: {
              title: "value",
              subtitle: "label",
            },
          },
        },
      ],
    }),

    /* =========================================================
       RICH BODY CONTENT
    ========================================================= */

    defineField({
      name: "body",
      title: "Main Content",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),

    /* =========================================================
       RELATED SERVICES
    ========================================================= */

    defineField({
      name: "relatedServices",
      title: "Related Services",
      type: "array",

      of: [
        {
          type: "reference",
          to: [{ type: "service" }],
        },
      ],
    }),

    /* =========================================================
       RELATED CASE STUDIES
    ========================================================= */

    defineField({
      name: "relatedCaseStudies",
      title: "Related Case Studies",
      type: "array",

      of: [
        {
          type: "reference",
          to: [{ type: "caseStudy" }],
        },
      ],
    }),

    /* =========================================================
       FAQ
    ========================================================= */

    defineField({
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",

      of: [
        {
          type: "object",

          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required(),
            }),
          ],

          preview: {
            select: {
              title: "question",
            },
          },
        },
      ],
    }),

    /* =========================================================
       SEO
    ========================================================= */

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  /* =========================================================
     DOCUMENT PREVIEW
  ========================================================= */

  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});