import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",

  fields: [
    /* =====================================================
       BASIC INFORMATION
    ===================================================== */

    defineField({
      name: "title",
      title: "Case Study Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "parent",
      title: "Parent Case Study",
      type: "reference",
      to: [{ type: "caseStudy" }],
      description: "Optional. Use this for deeper case-study pages.",
    }),

    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "industry",
      title: "Industry",
      type: "reference",
      to: [{ type: "industry" }],
    }),

    defineField({
      name: "servicesUsed",
      title: "Services Used",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),

    /* =====================================================
       HERO
    ===================================================== */

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "highlight",
          title: "Highlighted Text",
          type: "string",
          description: "Optional phrase styled in Tendrils gold.",
        }),
        defineField({
          name: "description",
          title: "Hero Description",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "cta",
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "cta",
        }),
      ],
    }),

    /* =====================================================
       LEGACY MEDIA
    ===================================================== */

    defineField({
      name: "heroImage",
      title: "Legacy Hero Image",
      type: "image",
      hidden: true,
      description: "Kept for existing case studies. Use Hero > Hero Image for new content.",
    }),

    /* =====================================================
       CASE STUDY STORY
    ===================================================== */

    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 6,
      description: "What business or operational problem needed to be solved?",
    }),

    defineField({
      name: "approach",
      title: "Approach",
      type: "text",
      rows: 6,
      description: "How Tendrils approached the problem.",
    }),

    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 6,
      description: "What was designed, built, integrated, or changed.",
    }),

    defineField({
      name: "execution",
      title: "Execution",
      type: "text",
      rows: 6,
      description: "Key implementation details, rollout, or collaboration model.",
    }),

    defineField({
      name: "stack",
      title: "Technology / Stack",
      type: "array",
      of: [{ type: "string" }],
    }),

    /* =====================================================
       RESULTS
    ===================================================== */

    defineField({
      name: "results",
      title: "Results & Outcomes",
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
              name: "metric",
              title: "Metric / Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "metric",
            },
          },
        },
      ],
    }),

    /* =====================================================
       CLIENT QUOTE
    ===================================================== */

    defineField({
      name: "quote",
      title: "Client Quote",
      type: "text",
      rows: 4,
      description: "Keep this as the client's own words where possible.",
    }),

    defineField({
      name: "quoteAuthor",
      title: "Quote Author",
      type: "string",
    }),

    defineField({
      name: "quoteRole",
      title: "Quote Author Role / Company",
      type: "string",
    }),

    /* =====================================================
       RICH CONTENT & MEDIA
    ===================================================== */

    defineField({
      name: "body",
      title: "Additional Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),

    defineField({
      name: "gallery",
      title: "Case Study Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),

    /* =====================================================
       RELATED CASE STUDIES
    ===================================================== */

    defineField({
      name: "relatedCaseStudies",
      title: "Related Case Studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),

    /* =====================================================
       PUBLISHING
    ===================================================== */

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),

    /* =====================================================
       SEO
    ===================================================== */

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      client: "client",
      industry: "industry.title",
      media: "hero.image",
    },
    prepare({ title, client, industry, media }) {
      return {
        title,
        subtitle: [client, industry].filter(Boolean).join(" · ") || "Case Study",
        media,
      };
    },
  },
});
