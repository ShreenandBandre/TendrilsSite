import { groq } from "next-sanity";

/* =========================================================
   UNIVERSAL IMAGE PROJECTION
========================================================= */

const imageProjection = `{
  ...,
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

    "imageUrl": coalesce(
      logo.asset->url,
      logo.assetUrl
    ),

    logo ${imageProjection}
  }
`;

/*
 * MAIN HOMEPAGE QUERY
 *
 * Important:
 * - Homepage content comes directly from Sanity.
 * - We do NOT replace homepage content with hardcoded values.
 * - Industries and Solutions are fetched separately below.
 * - Universal sections are preserved.
 */

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
     * Keep homepage section configuration.
     *
     * Actual Industry documents are fetched separately
     * by industriesListQuery.
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
     * Keep homepage section configuration.
     *
     * Actual Solution documents are fetched separately
     * by solutionsListQuery.
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
     * Universal CMS sections.
     *
     * These are intentionally kept because different
     * section types use different fields.
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
     * Site settings are fetched inside the homepage query
     * so we don't need another homepage request.
     *
     * Keep the complete selected image object rather than
     * constructing a new projection from coalesce().
     */

    "siteSettings": *[
      _type == "siteSettings"
    ][0]{
      headerLogoDark ${imageProjection},
      headerLogoLight ${imageProjection},
      headerLogoAlt,

      "headerLogoUrl": coalesce(
        headerLogoDark.asset->url,
        headerLogoLight.asset->url
      )
    }
  }
`;

/* =========================================================
   SERVICES LIST
========================================================= */

export const servicesListQuery = groq`
  *[
    _type == "service" &&
    defined(slug.current)
  ]
  | order(
      coalesce(order, 9999) asc,
      name asc
    )
  {
    _id,

    name,

    "slug": slug.current,

    pillar,

    shortDescription,

    description,

    featured,

    order,

    "parentId": parent._ref,

    "heroImageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    )
  }
`;

/* =========================================================
   SERVICE BY SLUG
========================================================= */

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

    "imageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    ),

    image ${imageProjection},

    hero{
      eyebrow,
      headline,
      highlight,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        heroImage.asset->url,
        asset->url
      ),

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

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

      image ${imageProjection}
    },

    sections[]{
      ...,

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

      image ${imageProjection},

      items[]{
        ...,

        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),

        image ${imageProjection}
      },

      cards[]{
        ...,

        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),

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
    ]
    | order(
        coalesce(order, 9999) asc,
        name asc
      )
    {
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

/* =========================================================
   SERVICE HIERARCHY
========================================================= */

export const serviceHierarchyQuery = groq`
  *[
    _type == "service" &&
    defined(slug.current)
  ]
  | order(
      coalesce(order, 9999) asc,
      name asc
    )
  {
    _id,
    name,
    "slug": slug.current,
    "parentId": parent._ref,
    order
  }
`;

/* =========================================================
   SERVICES NAVIGATION
========================================================= */

export const servicesNavigationQuery = groq`
  *[
    _type == "service" &&
    defined(slug.current) &&
    !defined(parent._ref)
  ]
  | order(
      coalesce(order, 9999) asc,
      name asc
    )
  {
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
    ]
    | order(
        coalesce(order, 9999) asc,
        name asc
      )
    {
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
      ]
      | order(
          coalesce(order, 9999) asc,
          name asc
        )
      {
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
   SOLUTIONS NAVIGATION
========================================================= */

export const solutionsNavigationQuery = groq`
  *[
    _type == "solution" &&
    defined(slug.current) &&
    !defined(parent._ref)
  ]
  | order(
      coalesce(order, 9999) asc,
      title asc
    )
  {
    _id,
    title,
    "slug": slug.current,
    "parentId": parent._ref,
    category,
    shortDescription,
    featured,

    "children": *[
      _type == "solution" &&
      parent._ref == ^._id &&
      defined(slug.current)
    ]
    | order(
        coalesce(order, 9999) asc,
        title asc
      )
    {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      featured,

      "children": *[
        _type == "solution" &&
        parent._ref == ^._id &&
        defined(slug.current)
      ]
      | order(
          coalesce(order, 9999) asc,
          title asc
        )
      {
        _id,
        title,
        "slug": slug.current,
        shortDescription
      }
    },

    "heroImageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    )
  }
`;

/* =========================================================
   SOLUTIONS LIST
========================================================= */

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

    "imageUrl": coalesce(
      homeImage.asset->url,
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url,
      mainImage.asset->url
    )
  }
`;

/* =========================================================
   SOLUTIONS SIMPLE QUERY
========================================================= */

export const solutionsQuery = groq`
  *[
    _type == "solution" &&
    defined(slug.current)
  ]
  | order(
      coalesce(order, 9999) asc,
      title asc
    )
  {
    "slug": slug.current
  }
`;

/* =========================================================
   SOLUTION BY SLUG
========================================================= */

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

    "imageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url,
      mainImage.asset->url,
      thumbnail.asset->url
    ),

    image ${imageProjection},
    heroImage ${imageProjection},
    mainImage ${imageProjection},

    "children": *[
      _type == "solution" &&
      parent._ref == ^._id &&
      defined(slug.current)
    ]
    | order(
        coalesce(order, 9999) asc,
        title asc
      )
    {
      _id,
      title,
      "slug": slug.current,
      category,
      shortDescription
    },

    hero{
      eyebrow,
      headline,
      highlight,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        heroImage.asset->url,
        asset->url
      ),

      image ${imageProjection},
      heroImage ${imageProjection},

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

    integrations,

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

      _type == "splitContent" => {
        ...,

        "imageUrl": coalesce(
          image.asset->url,
          asset->url
        ),

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

      "heroImageUrl": coalesce(
        hero.image.asset->url,
        heroImage.asset->url,
        image.asset->url
      )
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
   INDUSTRIES NAVIGATION
========================================================= */

export const industriesNavigationQuery = groq`
  *[
    _type == "industry" &&
    defined(slug.current) &&
    !defined(parent._ref)
  ]
  | order(
      coalesce(order, 9999) asc,
      title asc
    )
  {
    _id,
    title,
    "slug": slug.current,
    "parentId": parent._ref,
    category,
    shortDescription,
    featured,

    "children": *[
      _type == "industry" &&
      parent._ref == ^._id &&
      defined(slug.current)
    ]
    | order(
        coalesce(order, 9999) asc,
        title asc
      )
    {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      featured,

      "children": *[
        _type == "industry" &&
        parent._ref == ^._id &&
        defined(slug.current)
      ]
      | order(
          coalesce(order, 9999) asc,
          title asc
        )
      {
        _id,
        title,
        "slug": slug.current,
        shortDescription
      }
    },

    "heroImageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    )
  }
`;

/* =========================================================
   INDUSTRIES LIST
========================================================= */

export const industriesListQuery = groq`
  *[
    _type == "industry" &&
    defined(slug.current)
  ]
  | order(
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

    "imageUrl": coalesce(
      homeImage.asset->url,
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    )
  }
`;

/* =========================================================
   INDUSTRY BY SLUG
========================================================= */

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

    "children": *[
      _type == "industry" &&
      parent._ref == ^._id &&
      defined(slug.current)
    ]
    | order(
        coalesce(order, 9999) asc,
        title asc
      )
    {
      _id,
      title,
      "slug": slug.current,
      category,
      shortDescription
    },

    hero{
      eyebrow,
      headline,
      highlight,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        heroImage.asset->url
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

    "heroImageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    ),

    painPoints,

    characteristics[]{
      title,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

      image ${imageProjection}
    },

    journey[]{
      number,
      title,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

      image ${imageProjection}
    },

    ecosystem[]{
      name,
      category,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

      image ${imageProjection}
    },

    capabilities[]{
      title,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        asset->url
      ),

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

      "heroImageUrl": coalesce(
        hero.image.asset->url,
        heroImage.asset->url
      )
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

      "heroImageUrl": coalesce(
        hero.image.asset->url,
        heroImage.asset->url
      )
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

/* =========================================================
   CASE STUDIES
========================================================= */

export const caseStudiesQuery = groq`
  *[
    _type == "caseStudy" &&
    defined(slug.current)
  ]
  | order(
      coalesce(order, 9999) asc,
      title asc
    )
  {
    "slug": slug.current
  }
`;

export const caseStudyHierarchyQuery = groq`
  *[
    _type == "caseStudy" &&
    defined(slug.current)
  ]
  | order(
      coalesce(order, 9999) asc,
      title asc
    )
  {
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
  ]
  | order(
      coalesce(order, 9999) asc,
      _createdAt desc
    )
  {
    _id,
    title,
    "slug": slug.current,
    "parentId": parent._ref,
    client,
    shortDescription,
    challenge,

    "children": *[
      _type == "caseStudy" &&
      parent._ref == ^._id &&
      defined(slug.current)
    ]
    | order(
        coalesce(order, 9999) asc,
        title asc
      )
    {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      client
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

    "heroImageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    )
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

    heroImage ${imageProjection},

    "imageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url
    ),

    "children": *[
      _type == "caseStudy" &&
      parent._ref == ^._id &&
      defined(slug.current)
    ]
    | order(
        coalesce(order, 9999) asc,
        title asc
      )
    {
      _id,
      title,
      "slug": slug.current,
      client,
      shortDescription
    },

    hero{
      eyebrow,
      headline,
      highlight,
      description,

      "imageUrl": coalesce(
        image.asset->url,
        heroImage.asset->url
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

    "heroImageUrl": coalesce(
      hero.image.asset->url,
      heroImage.asset->url,
      image.asset->url
    ),

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

      "heroImageUrl": coalesce(
        hero.image.asset->url,
        heroImage.asset->url,
        image.asset->url
      ),

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
   SITE SETTINGS
========================================================= */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{

    headerLogoDark ${imageProjection},

    headerLogoLight ${imageProjection},

    "headerLogo": coalesce(
      headerLogoDark,
      headerLogoLight
    ),

    "headerLogoUrl": coalesce(
      headerLogoDark.asset->url,
      headerLogoLight.asset->url
    ),

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

      "partners": *[
        _type == "homepage"
      ][0].partnersMarquee.partners[]{
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