export type SiteField = { key: string; label: string; textarea?: boolean };
export type SitePage = { slug: string; title: string; icon: string; fields: SiteField[] };

export const SITE_PAGES: SitePage[] = [
  {
    slug: "global",
    title: "Global Settings",
    icon: "⚙️",
    fields: [
      { key: "siteName", label: "Site Name" },
      { key: "siteTagline", label: "Site Tagline" },
      { key: "logoUrl", label: "Logo URL" },
      { key: "phoneMain", label: "Main Phone Number" },
      { key: "phoneSecondary", label: "Secondary Phone" },
      { key: "whatsappCommunity", label: "WhatsApp Community Link" },
      { key: "email", label: "Email Address" },
      { key: "address", label: "Address" },
      { key: "instagram", label: "Instagram URL" },
      { key: "youtube", label: "YouTube URL" },
      { key: "facebook", label: "Facebook URL" },
    ],
  },
  {
    slug: "home",
    title: "Home Page",
    icon: "🏠",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
      { key: "aboutText", label: "About Strip Text", textarea: true },
      { key: "ctaText", label: "CTA Heading" },
    ],
  },
  {
    slug: "about",
    title: "About Page",
    icon: "👤",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
      { key: "bio", label: "Bio / About Text", textarea: true },
    ],
  },
  {
    slug: "services",
    title: "Services Page",
    icon: "✨",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
      { key: "whyTitle", label: "Why Choose Us Title" },
      { key: "whyText", label: "Why Choose Us Text", textarea: true },
    ],
  },
  {
    slug: "courses",
    title: "Courses Page",
    icon: "🎓",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "books",
    title: "Books Page",
    icon: "📚",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "vastu-products",
    title: "Vastu Products Page",
    icon: "📦",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "blog",
    title: "Blog Page",
    icon: "📰",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
    ],
  },
  {
    slug: "contact",
    title: "Contact Page",
    icon: "📞",
    fields: [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroSubtitle", label: "Hero Subtitle", textarea: true },
      { key: "ctaText", label: "CTA Heading" },
    ],
  },
  {
    slug: "footer",
    title: "Footer",
    icon: "📎",
    fields: [
      { key: "copyright", label: "Copyright Text" },
      { key: "tagline", label: "Footer Tagline" },
    ],
  },
];
