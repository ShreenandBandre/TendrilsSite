import { defineField, defineType } from "sanity";
import { contentSectionTypes } from "./objects/contentSections";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
    }),

    // ─────────────────────────────────────────────
    // HERO
    // ─────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Homepage Hero",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),

        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
        }),

        defineField({
          name: "highlight",
          title: "Highlighted Text",
          description: "Optional text to visually highlight in the headline.",
          type: "string",
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
              description:
                "Use /contact for internal pages or https://... for external links.",
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
              description:
                "Use /contact for internal pages or https://... for external links.",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // WE WORK WITH — PARTNER LOGO MARQUEE (HERO)
    // ─────────────────────────────────────────────
    defineField({
      name: "partnersMarquee",
      title: "We Work With (Partner Logos)",
      description:
        "Horizontally scrolling strip of partner/client logos shown above the 'Scroll to explore' line on the hero.",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "We work with",
        }),

        defineField({
          name: "partners",
          title: "Partners",
          type: "array",
          validation: (rule) => rule.max(24),
          of: [
            {
              type: "object",
              name: "marqueePartner",
              title: "Partner",
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
                }),

                defineField({
                  name: "url",
                  title: "Link (optional)",
                  type: "url",
                }),
              ],
              preview: {
                select: { title: "name", media: "logo" },
              },
            },
          ],
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // FEATURED SERVICES
    // ─────────────────────────────────────────────
    defineField({
      name: "services",
      title: "Featured Services",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "service" }],
        },
      ],
      validation: (rule) => rule.max(6),
    }),

    // ─────────────────────────────────────────────
    // STATS
    // ─────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "Hero Stats Cards",
      type: "array",
      of: [{ type: "statItem" }],
      validation: (rule) => rule.max(6),
    }),

    // ─────────────────────────────────────────────
    // EXPERTISE / MISSION & VISION
    // ─────────────────────────────────────────────
    defineField({
      name: "expertise",
      title: "Expertise / Mission & Vision",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),

        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 2,
        }),

        defineField({
          name: "items",
          title: "Expertise Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "expertiseItem",
              title: "Expertise Item",
              fields: [
                defineField({
                  name: "heading",
                  title: "Heading",
                  type: "string",
                }),

                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 4,
                }),

                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                }),

                defineField({
                  name: "cta",
                  title: "CTA",
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
            },
          ],
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // INDUSTRIES SECTION
    // ─────────────────────────────────────────────
    defineField({
      name: "industriesSection",
      title: "Industries Section",
      description:
        "Shown right below Strategic Expertise. Showcases featured industries with their homepage images.",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Industries" }),
        defineField({ name: "title", title: "Title", type: "string", initialValue: "Built for your industry" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2 }),
        defineField({
          name: "items",
          title: "Featured Industries",
          type: "array",
          validation: (rule) => rule.max(8),
          of: [{ type: "reference", to: [{ type: "industry" }] }],
        }),
        defineField({
          name: "cta",
          title: "Section CTA",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", initialValue: "View all industries" }),
            defineField({ name: "href", title: "Link", type: "string", initialValue: "/industries" }),
          ],
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // SOLUTIONS SECTION
    // ─────────────────────────────────────────────
    defineField({
      name: "solutionsSection",
      title: "Solutions Section",
      description:
        "Shown right below the Industries section. Showcases featured solutions with their homepage images.",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Solutions" }),
        defineField({ name: "title", title: "Title", type: "string", initialValue: "Solutions that move commerce forward" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2 }),
        defineField({
          name: "items",
          title: "Featured Solutions",
          type: "array",
          validation: (rule) => rule.max(8),
          of: [{ type: "reference", to: [{ type: "solution" }] }],
        }),
        defineField({
          name: "cta",
          title: "Section CTA",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", initialValue: "View all solutions" }),
            defineField({ name: "href", title: "Link", type: "string", initialValue: "/solutions" }),
          ],
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // WHY CHOOSE US
    // ─────────────────────────────────────────────
    defineField({
      name: "whyChooseUs",
      title: "Why Choose Us",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Why Choose Tendrils?",
        }),

        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 2,
        }),

        defineField({
          name: "features",
          title: "Features",
          type: "array",
          validation: (rule) => rule.max(6),
          of: [
            {
              type: "object",
              name: "whyChooseFeature",
              title: "Why Choose Us Feature",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
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
                  options: {
                    hotspot: true,
                  },
                }),

                defineField({
                  name: "cta",
                  title: "CTA",
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
            },
          ],
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // DIGITAL MARKETING GRID
    // ─────────────────────────────────────────────
    defineField({
      name: "marketingGrid",
      title: "Digital Marketing Grid",
      description: "The 5 rotating marketing cards (SEO, SMM, PPC, Content, Email) shown on the homepage. Add an image for each so it stops falling back to the icon placeholder.",
      type: "array",
      validation: (rule) => rule.max(5),
      of: [
        {
          type: "object",
          name: "marketingGridItem",
          title: "Marketing Grid Item",
          fields: [
            defineField({
              name: "key",
              title: "Item Key",
              description: "Must match one of: seo, smm, ppc, content, email",
              type: "string",
              options: {
                list: [
                  { title: "SEO", value: "seo" },
                  { title: "SMM", value: "smm" },
                  { title: "PPC", value: "ppc" },
                  { title: "Content Marketing", value: "content" },
                  { title: "Email Marketing", value: "email" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title Override",
              description: "Optional — leave blank to use the default title.",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description Override",
              description: "Optional — leave blank to use the default description.",
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
            select: { title: "title", subtitle: "key", media: "image" },
            prepare: ({ title, subtitle, media }) => ({
              title: title || subtitle || "Marketing Grid Item",
              subtitle,
              media,
            }),
          },
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // TESTIMONIALS / QUOTES
    // ─────────────────────────────────────────────
    defineField({
      name: "testimonials",
      title: "Homepage Quotes",
      description: "Select multiple testimonials or quotes to display.",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // FLEXIBLE CONTENT SECTIONS
    // ─────────────────────────────────────────────
    defineField({
      name: "sections",
      title: "Flexible Homepage Sections",
      description:
        "Add Split Content, Quotes, Cards, Images, Team, Partners, CTAs and more in any order.",
      type: "array",
      of: contentSectionTypes.map((sectionType) => ({
        type: sectionType.name,
      })),
    }),

    // ─────────────────────────────────────────────
    // FINAL CTA
    // ─────────────────────────────────────────────
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),

        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),

        defineField({
          name: "cta",
          title: "CTA",
          type: "cta",
        }),
      ],
    }),
  ],
});