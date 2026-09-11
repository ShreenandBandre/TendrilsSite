import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  fields: [
    // =====================================================
    // BRAND / HEADER LOGOS
    // =====================================================

    defineField({
      name: "headerLogoDark",
      title: "Header Logo — Dark",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Dark/original logo used on light backgrounds such as the scrolled navbar and homepage.",
    }),

    defineField({
      name: "headerLogoLight",
      title: "Header Logo — Light",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Light/original logo used when the navbar sits over a dark background.",
    }),

    defineField({
      name: "headerLogoAlt",
      title: "Logo Alt Text",
      type: "string",
      initialValue: "Tendrils",
    }),

    // =====================================================
    // NAVIGATION
    // =====================================================

    defineField({
      name: "navLinks",
      title: "Main Navigation",
      type: "array",
      description:
        "Control labels, URLs and mega-menu types.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "href",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "type",
              title: "Navigation Type",
              type: "string",
              options: {
                layout: "radio",
                list: [
                  {
                    title: "Standard Link",
                    value: "link",
                  },
                  {
                    title: "Services Mega Menu",
                    value: "services",
                  },
                  {
                    title: "Industries Mega Menu",
                    value: "industries",
                  },
                  {
                    title: "Solutions Mega Menu",
                    value: "solutions",
                  },
                  {
                    title: "Case Studies Mega Menu",
                    value: "caseStudies",
                  },
                  {
                    title: "About Us",
                    value: "about",
                  },
                ],
              },
              initialValue: "link",
            }),
          ],
        },
      ],
    }),

    // =====================================================
    // CONTACT
    // =====================================================

    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),

    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),

    // =====================================================
    // FOOTER
    // =====================================================

    defineField({
      name: "footerLogo",
      title: "Footer Logo / Mark",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "footerColumns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),

            defineField({
              name: "links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      type: "string",
                    }),
                    defineField({
                      name: "href",
                      type: "string",
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "footerCta",
      title: "Footer CTA",
      type: "object",
      fields: [
        defineField({
          name: "label",
          type: "string",
        }),
        defineField({
          name: "href",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
            }),
            defineField({
              name: "url",
              type: "url",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "defaultSeo",
      type: "seo",
    }),
  ],
});