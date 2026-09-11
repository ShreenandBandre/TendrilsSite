export const structure = (S) =>
  S.list()
    .title("Tendrils Content")
    .items([
      /* =========================================================
         HOMEPAGE
      ========================================================= */

      S.listItem()
        .title("Homepage")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage")
        ),

      /* =========================================================
         ABOUT US
      ========================================================= */

      S.listItem()
        .title("About Us")
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("About Us")
        ),

      S.divider(),

      /* =========================================================
         CONTENT
      ========================================================= */

      S.documentTypeListItem("service")
        .title("Services"),

      S.documentTypeListItem("industry")
        .title("Industries"),

      S.documentTypeListItem("solution")
        .title("Solutions"),

      S.documentTypeListItem("caseStudy")
        .title("Case Studies"),

      S.documentTypeListItem("testimonial")
        .title("Testimonials / Quotes"),

      S.documentTypeListItem("page")
        .title("Standalone Pages"),

      S.documentTypeListItem("siteSettings")
        .title("Site Settings"),
    ]);