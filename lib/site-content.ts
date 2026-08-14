export type SiteField = { key: string; label: string; textarea?: boolean };
export type SitePage = { slug: string; title: string; fields: SiteField[] };

export const SITE_PAGES: SitePage[] = [
  {
    slug: "home",
    title: "Home Page",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
      { key: "aboutText", label: "About Strip Text", textarea: true },
      { key: "ctaText", label: "CTA Heading" },
    ],
  },
  {
    slug: "services",
    title: "Services Page",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "courses",
    title: "Courses Page",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "books",
    title: "Books Page",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "vastu-products",
    title: "Vastu Products Page",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "blog",
    title: "Blog Page",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "contact",
    title: "Contact Page",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
];
