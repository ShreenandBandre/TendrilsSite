# Tendrils Website

Next.js + Sanity website for Tendrils.

## Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- Framer Motion
- Sanity CMS
- HubSpot contact integration

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the Sanity project/dataset values.
3. Add `HUBSPOT_PRIVATE_APP_TOKEN` when the contact form should create HubSpot contacts.
4. Install dependencies:

```bash
npm install
```

5. Run the website:

```bash
npm run dev
```

6. Run Sanity Studio separately if needed:

```bash
npm run studio
```

## Main routes

- `/`
- `/services`
- `/services/[slug]`
- `/industries`
- `/industries/[slug]`
- `/solutions`
- `/solutions/[slug]`
- `/case-studies`
- `/case-studies/[slug]`
- `/resources/blog`
- `/resources/blog/[slug]`
- `/contact`
- `/privacy`
- `/terms`

## CMS

The homepage, services, industries, solutions, case studies, testimonials, blog posts, navigation, footer, and SEO settings are designed around Sanity documents.
