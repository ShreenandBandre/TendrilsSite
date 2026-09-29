import { groq } from "next-sanity";

/* =========================================================
   UNIVERSAL IMAGE PROJECTIONS
========================================================= */

const imageProjection = `{
  asset,
  alt,
  hotspot,
  crop,
  "assetUrl": coalesce(asset->url, url)
}`;

const pageReferenceProjection = `{
  _id,
  _type,
  "slug": slug.current,
  "parent": parent->{
    "slug": slug.current,
    "parent": parent->{
      "slug": slug.current,
      "parent": parent->{
        "slug": slug.current
      }
    }
  }
}`;

/* =========================================================
   HOMEPAGE
========================================================= */

export const vendorsListQuery = groq`
  *[_type == "vendor"] | order(order asc, name asc){
    _id,
    name,
    category,
    url,
    "imageUrl": coalesce(logo.asset->url, logo.assetUrl),
    logo ${imageProjection}
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    title,

    hero{
      eyebrow,
      headline,
      highlight,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        heroImage.asset->url,
        image.assetUrl
      ),

      image ${imageProjection},

      primaryCta{
        label,
        href,
        page->${pageReferenceProjection}
      },

      secondaryCta{
        label,
        href,
        page->${pageReferenceProjection}
      }
    },

    stats[]{
      value,
      label,
      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),
      image ${imageProjection}
    },

    partnersMarquee{
      label,

      partners[]{
        name,
        url,

        "imageUrl": coalesce(
          logo.asset->url,
          image.asset->url
        ),

        logo ${imageProjection}
      }
    },

    marketingGrid[]{
      key,
      title,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

      image ${imageProjection}
    },

    vendorsSection{
      eyebrow,
      title,
      subtitle,

      items[]->{
        _id,
        name,
        category,
        url,

        "imageUrl": coalesce(
          logo.asset->url,
          logo.assetUrl
        ),

        logo ${imageProjection}
      }
    },

    "testimonials": coalesce(
      testimonials[]->{
        _id,
        quote,
        name,
        title,
        company,

        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),

        image ${imageProjection}
      },
      []
    ),

    expertise{
      title,
      subtitle,

      items[]{
        heading,
        description,

        "imageUrl": coalesce(
          image.asset->url,
          heroImage.asset->url
        ),

        image ${imageProjection},

        cta{
          label,
          href
        }
      }
    },

    /*
     * IMPORTANT:
     * We keep the section configuration here,
     * but DO NOT resolve all Industry documents here.
     *
     * The homepage fetches the actual Industry documents
     * separately using the lightweight industriesListQuery.
     */
    industriesSection{
      eyebrow,
      title,
      subtitle,

      cta{
        label,
        href
      }
    },

    /*
     * Same approach for Solutions.
     */
    solutionsSection{
      eyebrow,
      title,
      subtitle,

      cta{
        label,
        href
      }
    },

    whyChooseUs{
      title,
      subtitle,

      features[]{
        title,
        description,

        "imageUrl": coalesce(
          image.asset->url,
          heroImage.asset->url
        ),

        image ${imageProjection},

        cta{
          label,
          href
        }
      }
    },

    /*
     * Universal CMS sections are intentionally preserved.
     *
     * We are not aggressively stripping these yet because
     * different section types use different fields.
     */
    sections[]{
      ...,

      cta{
        ...,
        page->${pageReferenceProjection}
      },

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

      image ${imageProjection},

      items[]{
        ...,

        cta{
          ...,
          page->${pageReferenceProjection}
        },

        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),

        image ${imageProjection}
      },

      cards[]{
        ...,

        cta{
          ...,
          page->${pageReferenceProjection}
        },

        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),

        image ${imageProjection}
      },

      steps[]{
        ...,

        cta{
          ...,
          page->${pageReferenceProjection}
        },

        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),

        image ${imageProjection}
      },

      members[]{
        ...,

        "imageUrl": coalesce(
          image.asset->url,
          photo.asset->url
        ),

        image ${imageProjection}
      },

      partners[]{
        ...,

        "imageUrl": coalesce(
          image.asset->url,
          logo.asset->url
        ),

        image ${imageProjection}
      },

      testimonials[]->{
        _id,
        quote,
        name,
        title,
        company,

        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),

        image ${imageProjection}
      }
    },

    finalCta{
      eyebrow,
      title,
      description,

      cta{
        label,
        href,
        page->${pageReferenceProjection}
      }
    },

    /*
     * Only the two fields actually required by the homepage
     * hero are fetched from siteSettings.
     *
     * This removes a separate siteSettings Sanity request.
     */
    "siteSettings": *[
      _type == "siteSettings"
    ][0]{
      "headerLogo": coalesce(
        headerLogoDark,
        headerLogoLight
      ) ${imageProjection},

      headerLogoAlt
    }
  }
`;

/* =========================================================
   SERVICES NAVIGATION & SLUG
========================================================= */

export const servicesListQuery = groq`
  *[
    _type == "service" &&
    defined(slug.current)
  ]
  | order(coalesce(order, 9999) asc, name asc)
  {
    _id,

    name,

    "slug": slug.current,

    pillar,

    shortDescription,

    description,

    featured,

    order,

    /*
     * ServicesGrid checks parentId to determine
     * whether this is a child service.
     */
    "parentId": parent._ref,

    /*
     * Homepage only needs a usable image URL.
     */
    "heroImageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    )
  }
`;

export const serviceBySlugQuery = groq`
  *[
    _type == "service" &&
    slug.current == $slug
  ][0]{
    _id,
    name,
    "slug": slug.current,
    pillar,
    shortDescription,
    description,
    order,
    featured,
    pageStyle,

    // Root level image fallbacks
    "imageUrl": coalesce(hero.image.asset->url, heroImage.asset->url, image.asset->url),
    image ${imageProjection},

    hero{
      eyebrow,
      headline,
      highlight,
      description,
      "imageUrl": coalesce(image.asset->url, heroImage.asset->url, asset->url),
      image ${imageProjection},
      heroImage ${imageProjection},

      primaryCta{
        label,
        href,
        page->{
          _type,
          _id,
          "slug": slug.current
        }
      },

      secondaryCta{
        label,
        href,
        page->{
          _type,
          _id,
          "slug": slug.current
        }
      }
    },

    stats[]{
      ...,
      "imageUrl": coalesce(image.asset->url, asset->url),
      image ${imageProjection}
    },

    sections[]{
      ...,
      "imageUrl": coalesce(image.asset->url, asset->url),
      image ${imageProjection},

      items[]{
        ...,
        "imageUrl": coalesce(image.asset->url, asset->url),
        image ${imageProjection}
      },

      cards[]{
        ...,
        "imageUrl": coalesce(image.asset->url, asset->url),
        image ${imageProjection}
      }
    },

    "parent": parent->{
      _id,
      name,
      "slug": slug.current
    },

    "children": *[
      _type == "service" &&
      parent._ref == ^._id &&
      defined(slug.current)
    ] | order(coalesce(order, 9999) asc, name asc) {
      _id,
      name,
      "slug": slug.current,
      shortDescription
    },

    "relatedServices": relatedServices[]->{
      _id,
      name,
      "slug": slug.current,
      pillar,
      shortDescription
    },

    "industries": industries[]->{
      _id,
      title,
      "slug": slug.current
    },

    seo{
      title,
      description,
      metaTitle,
      metaDescription,
      "ogImage": ogImage ${imageProjection},
      noIndex
    }
  }
`;

export const serviceHierarchyQuery = groq`
  *[
    _type == "service" &&
    defined(slug.current)
  ] | order(coalesce(order, 9999) asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    "parentId": parent._ref,
    order
  }
`;

export const servicesNavigationQuery = groq`
  *[
    _type == "service" &&
    defined(slug.current) &&
    !defined(parent._ref)
  ] | order(coalesce(order, 9999) asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    pillar,
    shortDescription,
    order,

    "children": *[
      _type == "service" &&
      parent._ref == ^._id &&
      defined(slug.current)
    ] | order(coalesce(order, 9999) asc, name asc) {
      _id,
      name,
      "slug": slug.current,
      pillar,
      shortDescription,
      order,

      "children": *[
        _type == "service" &&
        parent._ref == ^._id &&
        defined(slug.current)
      ] | order(coalesce(order, 9999) asc, name asc) {
        _id,
        name,
        "slug": slug.current,
        pillar,
        shortDescription,
        order
      }
    }
  }
`;

/* =========================================================
   SOLUTIONS (With deep multi-fallback image projection)
========================================================= */

export const solutionsNavigationQuery = groq`
  *[
    _type == "solution" &&
    defined(slug.current) &&
    !defined(parent._ref)
  ] | order(coalesce(order, 9999) asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    "parentId": parent._ref,
    category,
    shortDescription,
    featured,
    "children": *[_type == "solution" && parent._ref == ^._id && defined(slug.current)] | order(coalesce(order,9999) asc, title asc){
      _id, title, "slug": slug.current, shortDescription, featured,
      "children": *[_type == "solution" && parent._ref == ^._id && defined(slug.current)] | order(coalesce(order,9999) asc, title asc){
        _id, title, "slug": slug.current, shortDescription
      }
    },
    "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url, image.asset->url)
  }
`;

export const solutionsListQuery = groq`
  *[
    _type == "solution" &&
    defined(slug.current)
  ]
  | order(
      featured desc,
      coalesce(order, 9999) asc,
      title asc
    )
  {
    _id,

    title,

    "slug": slug.current,

    category,

    shortDescription,

    summary,

    featured,

    /*
     * SolutionsSection only needs a displayable image.
     */
    "imageUrl": coalesce(
      homeImage.asset->url,
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url,
      mainImage.asset->url
    )
  }
`;

export const solutionsQuery = groq`
  *[
    _type == "solution" &&
    defined(slug.current)
  ] | order(coalesce(order,9999) asc, title asc) {
    "slug": slug.current
  }
`;

export const solutionBySlugQuery = groq`
  *[
    _type == "solution" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    name,
    "slug": slug.current,
    category,
    shortDescription,
    description,
    summary,
    pageStyle,

    // Universal Direct Fallback URLs
    "imageUrl": coalesce(
      hero.image.asset->url,
      hero.imageUrl,
      heroImage.asset->url,
      image.asset->url,
      mainImage.asset->url,
      thumbnail.asset->url
    ),
    image ${imageProjection},
    heroImage ${imageProjection},
    mainImage ${imageProjection},

    "children": *[_type == "solution" && parent._ref == ^._id && defined(slug.current)] | order(coalesce(order,9999) asc, title asc){
      _id, title, "slug": slug.current, category, shortDescription
    },

    hero{
      eyebrow,
      headline,
      highlight,
      description,
      "imageUrl": coalesce(
        image.asset->url,
        heroImage.asset->url,
        asset->url,
        imageUrl
      ),
      image ${imageProjection},
      heroImage ${imageProjection},

      primaryCta{label, href, page->${pageReferenceProjection}},
      secondaryCta{label, href, page->${pageReferenceProjection}}
    },

    stats[]{
      value,
      label,
      "imageUrl": coalesce(image.asset->url, asset->url),
      image ${imageProjection}
    },

    integrations,

    sections[]{
      ...,
      cta{..., page->${pageReferenceProjection}},
      "imageUrl": coalesce(image.asset->url, asset->url),
      image ${imageProjection},

      items[]{
        ...,
        cta{..., page->${pageReferenceProjection}},
        "imageUrl": coalesce(image.asset->url, asset->url),
        image ${imageProjection}
      },

      cards[]{
        ...,
        cta{..., page->${pageReferenceProjection}},
        "imageUrl": coalesce(image.asset->url, asset->url),
        image ${imageProjection}
      },

      steps[]{
        ...,
        cta{..., page->${pageReferenceProjection}},
        "imageUrl": coalesce(image.asset->url, asset->url),
        image ${imageProjection}
      },

      _type == "splitContent" => {
        ...,
        "imageUrl": coalesce(image.asset->url, asset->url),
        image ${imageProjection}
      }
    },

    platformVariants[]{
      platform,
      "slug": slug.current,
      description,
      features,
      body
    },

    body[]{
      ...,
      _type == "image" => ${imageProjection}
    },

    "relatedServices": relatedServices[]->{
      _id,
      name,
      "slug": slug.current,
      pillar,
      shortDescription,
      "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url, image.asset->url)
    },

    "industries": industries[]->{
      _id,
      title,
      "slug": slug.current,
      category,
      shortDescription
    },

    "relatedCaseStudies": relatedCaseStudies[]->{
      _id,
      title,
      "slug": slug.current,
      client,
      shortDescription
    },

    featured,
    order,

    seo{
      title,
      description,
      metaTitle,
      metaDescription,
      "ogImage": ogImage ${imageProjection},
      noIndex
    }
  }
`;

/* =========================================================
   INDUSTRIES & CASE STUDIES
========================================================= */

export const industriesNavigationQuery = groq`
  *[
    _type == "industry" &&
    defined(slug.current) &&
    !defined(parent._ref)
  ] | order(coalesce(order, 9999) asc, title asc){
    _id,
    title,
    "slug": slug.current,
    "parentId": parent._ref,
    category,
    shortDescription,
    featured,
    "children": *[_type == "industry" && parent._ref == ^._id && defined(slug.current)] | order(coalesce(order,9999) asc, title asc){
      _id, title, "slug": slug.current, shortDescription, featured,
      "children": *[_type == "industry" && parent._ref == ^._id && defined(slug.current)] | order(coalesce(order,9999) asc, title asc){
        _id, title, "slug": slug.current, shortDescription
      }
    },
    "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url, image.asset->url),
    "heroImage": coalesce(hero.image, image) ${imageProjection}
  }
`;

export const industriesListQuery = groq`
  *[
    _type == "industry" &&
    defined(slug.current)
  ]
  | order(coalesce(order, 9999) asc, title asc)
  {
    _id,

    title,

    "slug": slug.current,

    category,

    shortDescription,

    summary,

    /*
     * IndustriesSection needs a usable image.
     * Keep the actual image object small.
     */
    "imageUrl": coalesce(
      homeImage.asset->url,
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    )
  }
`;

export const industryBySlugQuery = groq`
  *[
    _type == "industry" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    shortDescription,
    featured,
    order,

    "children": *[_type == "industry" && parent._ref == ^._id && defined(slug.current)] | order(coalesce(order,9999) asc, title asc){
      _id, title, "slug": slug.current, category, shortDescription
    },

    hero{
      eyebrow,
      headline,
      highlight,
      description,
      "imageUrl": coalesce(image.asset->url, heroImage.asset->url),
      image ${imageProjection},
      primaryCta{label, href, page->${pageReferenceProjection}},
      secondaryCta{label, href, page->${pageReferenceProjection}}
    },

    "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url, image.asset->url),

    painPoints,
    characteristics[]{
      title,
      description,
      "imageUrl": coalesce(image.asset->url, asset->url),
      image ${imageProjection}
    },

    journey[]{
      number,
      title,
      description,
      "imageUrl": coalesce(image.asset->url, asset->url),
      image ${imageProjection}
    },

    ecosystem[]{
      name,
      category,
      description,
      "imageUrl": coalesce(image.asset->url, asset->url),
      image ${imageProjection}
    },

    capabilities[]{
      title,
      description,
      "imageUrl": coalesce(image.asset->url, asset->url),
      image ${imageProjection}
    },

    stats[]{
      value,
      label
    },

    body[]{
      ...,
      _type == "image" => ${imageProjection}
    },

    relatedServices[]->{
      _id,
      name,
      "slug": slug.current,
      pillar,
      shortDescription,
      "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url)
    },

    relatedCaseStudies[]->{
      _id,
      title,
      "slug": slug.current,
      client,
      challenge,
      results[]{
        value,
        metric
      },
      "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url)
    },

    faqs[]{
      question,
      answer
    },

    seo{
      title,
      description,
      metaTitle,
      metaDescription,
      "ogImage": ogImage ${imageProjection},
      noIndex
    }
  }
`;

export const caseStudiesQuery = groq`
  *[
    _type == "caseStudy" &&
    defined(slug.current)
  ] | order(coalesce(order, 9999) asc, title asc) {
    "slug": slug.current
  }
`;

export const caseStudyHierarchyQuery = groq`
  *[
    _type == "caseStudy" &&
    defined(slug.current)
  ] | order(coalesce(order, 9999) asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    "parentId": parent._ref
  }
`;

export const caseStudiesListQuery = groq`
  *[
    _type == "caseStudy" &&
    defined(slug.current)
  ] | order(coalesce(order, 9999) asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    "parentId": parent._ref,
    client,
    shortDescription,
    challenge,
    "children": *[_type == "caseStudy" && parent._ref == ^._id && defined(slug.current)] | order(coalesce(order,9999) asc, title asc){
      _id, title, "slug": slug.current, shortDescription, client
    },
    results[]{
      value,
      metric
    },
    featured,
    "industry": industry->{
      title,
      "slug": slug.current
    },
    "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url, image.asset->url)
  }
`;

export const caseStudyBySlugQuery = groq`
  *[
    _type == "caseStudy" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    "slug": slug.current,
    client,
    shortDescription,

    // Legacy top-level hero image — projected so the renderer's fallback
    // (for case studies whose image lives here instead of hero.image)
    // actually resolves to a real asset URL instead of always being null.
    heroImage ${imageProjection},
    "imageUrl": coalesce(hero.image.asset->url, heroImage.asset->url),

    "children": *[_type == "caseStudy" && parent._ref == ^._id && defined(slug.current)] | order(coalesce(order,9999) asc, title asc){
      _id, title, "slug": slug.current, client, shortDescription
    },

    hero{
      eyebrow,
      headline,
      highlight,
      description,
      "imageUrl": coalesce(image.asset->url, heroImage.asset->url),
      image ${imageProjection},
      primaryCta{label, href, page->${pageReferenceProjection}},
      secondaryCta{label, href, page->${pageReferenceProjection}}
    },

    "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url, image.asset->url),

    "industry": industry->{
      _id,
      title,
      "slug": slug.current
    },

    "servicesUsed": servicesUsed[]->{
      _id,
      name,
      "slug": slug.current,
      pillar,
      shortDescription
    },

    challenge,
    approach,
    solution,
    execution,
    stack,

    results[]{
      value,
      metric
    },

    quote,
    quoteAuthor,
    quoteRole,

    body[]{
      ...,
      _type == "image" => ${imageProjection}
    },

    "gallery": gallery[] ${imageProjection},

    "relatedCaseStudies": relatedCaseStudies[]->{
      _id,
      title,
      "slug": slug.current,
      client,
      shortDescription,
      results[]{
        value,
        metric
      },
      "heroImageUrl": coalesce(hero.image.asset->url, heroImage.asset->url, image.asset->url),
      "industry": industry->{
        title,
        "slug": slug.current
      }
    },

    seo{
      title,
      description,
      metaTitle,
      metaDescription,
      "ogImage": ogImage ${imageProjection},
      noIndex
    }
  }
`;

/* =========================================================
   SITE SETTINGS (navbar logo, footer, nav links, social)
========================================================= */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    "headerLogo": coalesce(headerLogoDark, headerLogoLight) ${imageProjection},
    "headerLogoUrl": coalesce(headerLogoDark.asset->url, headerLogoLight.asset->url),
    headerLogoDark ${imageProjection},
    headerLogoLight ${imageProjection},
    headerLogoAlt,

    navLinks[]{
      label,
      href,
      type
    },

    footerLogo ${imageProjection},
    "footerLogoUrl": footerLogo.asset->url,
    footerDescription,
    contactEmail,
    contactPhone,

    footerColumns[]{
      title,
      links[]{
        label,
        href
      }
    },

    footerCta{
      label,
      href
    },

    socialLinks[]{
      platform,
      url
    },

    defaultSeo{
      ...,
      "ogImage": ogImage ${imageProjection}
    }
  }
`;

/* =========================================================
   ABOUT PAGE
========================================================= */

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    title,
    slug,

    hero{
      eyebrow,
      headline,
      highlight,
      description,
      "imageUrl": image.asset->url,
      image ${imageProjection},

      primaryCta{
        label,
        href,
        page->${pageReferenceProjection}
      }
    },

    sections[]{
      ...,

      cta{
        ...,
        page->${pageReferenceProjection}
      },

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

      image ${imageProjection},

      items[]{
        ...,
        cta{
          ...,
          page->${pageReferenceProjection}
        },
        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),
        image ${imageProjection}
      },

      cards[]{
        ...,
        cta{
          ...,
          page->${pageReferenceProjection}
        },
        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),
        image ${imageProjection}
      },

      steps[]{
        ...,
        cta{
          ...,
          page->${pageReferenceProjection}
        },
        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),
        image ${imageProjection}
      },

      members[]{
        ...,
        "imageUrl": coalesce(
          image.asset->url,
          photo.asset->url
        ),
        image ${imageProjection}
      },

      partners[]{
        ...,
        "imageUrl": coalesce(
          image.asset->url,
          logo.asset->url
        ),
        image ${imageProjection}
      },

      testimonials[]->{
        _id,
        quote,
        name,
        title,
        company,
        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),
        image ${imageProjection}
      }
    },

    "partnerGrid": {
      "eyebrow": "Our Partners",
      "heading": "Technology that powers our work",
      "description": "We work with leading commerce, marketing, ERP, customer experience, and digital platforms.",

      "partners": *[_type == "homepage"][0].partnersMarquee.partners[]{
        name,
        url,
        "imageUrl": coalesce(
          logo.asset->url,
          image.asset->url
        )
      }
    },

    vendorsSection{
      eyebrow,
      title,
      subtitle,
      items[]->{
        _id, name, category, url,
        "imageUrl": coalesce(logo.asset->url, logo.assetUrl),
        logo ${imageProjection}
      }
    },

    seo{
      title,
      description,
      metaTitle,
      metaDescription,
      "ogImage": ogImage ${imageProjection},
      noIndex
    }
  }
`;