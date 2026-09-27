import type { Metadata } from "next";
import { BRAND, CONTACT, SOCIALS } from "./site";

export const SITE_URL = `https://${BRAND.domain}`;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function toAbsoluteImage(url?: string | null): string {
  if (!url || !url.trim()) return DEFAULT_OG_IMAGE;
  const u = url.trim();
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("//")) return `https:${u}`;
  return `${SITE_URL}${u.startsWith("/") ? u : `/${u}`}`;
}

// Shared metadata for static pages: canonical + per-page OG/Twitter so
// WhatsApp/Facebook show the right title instead of the homepage card.
export function staticMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: BRAND.brand,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.brand,
    alternateName: BRAND.name,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
    description: BRAND.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.addressShort,
      addressLocality: "Greater Noida West",
      addressRegion: "UP",
      addressCountry: "IN",
    },
    email: CONTACT.email,
    telephone: CONTACT.phoneMain,
    openingHours: "Mo-Su 09:00-17:00",
    sameAs: SOCIALS.map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneMain,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.brand,
    description: BRAND.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; item?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        ...(it.item ? { item: it.item.startsWith("http") ? it.item : `${SITE_URL}${it.item}` } : {}),
      })),
    ],
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}