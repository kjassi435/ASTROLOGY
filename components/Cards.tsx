import Link from "next/link";
import type { Course, CourseType } from "@/lib/courses";
import type { Book } from "@/lib/books";
import type { Product } from "@/lib/products";
import type { Service } from "@/lib/services";
import type { Testimonial } from "@/lib/testimonials";
import { cn, formatINR, waLink } from "@/lib/utils";
import { CONTACT } from "@/lib/site";
import { Reveal } from "./Preloader";
import { IconArrowRight, IconCheck, IconExternal, IconPlay, IconVideo, IconAward, IconUsers } from "./Icons";

export function SectionHeader({ subtitle, title, desc, center = false }: { subtitle: string; title: React.ReactNode; desc?: string; center?: boolean }) {
  return (
    <div className={cn("section-header", center && "center")}>
      <span className="section-subtitle">{subtitle}</span>
      <h2 className="section-title">{title}</h2>
      {desc ? <p className="section-desc">{desc}</p> : null}
    </div>
  );
}

export function Marquee() {
  const items = ["Astrologer", "Name Numerology Expert", "Vastu Consultant", "Teacher", "Consultant", "Mentor", "Spiritual Guide"];
  const track = [...items, ...items];
  return (
    <div className="marquee-section" aria-hidden>
      <div className="marquee-track">
        <div className="marquee-content">
          {track.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className="dot">{"\u2726"}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Link href={`/services/${service.slug}`} className={cn("service-card card-lift block", service.featured && "featured")}>
      {service.popular ? <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider">Popular</span> : null}
      {service.featured ? <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider">Featured</span> : null}
      <div className="w-16 h-16 mb-6 text-primary transition-transform duration-300 group-hover:scale-110">
        <ServiceIcon name={service.icon} size={56} />
      </div>
      <h3 className="text-[1.6rem] mb-3">{service.name}</h3>
      <p className="opacity-80 mb-6 line-clamp-3">{service.tagline}</p>
      <span className="service-link inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3">
        Learn More <IconArrowRight size={16} />
      </span>
    </Link>
  );
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  kundli: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />
      <path d="M32 4v56M4 32h56" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    </svg>
  ),
  vastu: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8L8 20v24l24 12 24-12V20L32 8z" stroke="currentColor" strokeWidth="2" />
      <path d="M8 20l24 12m0 0l24-12M32 32v24" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  name: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 48h32M16 32h32M16 16h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" />
      <circle cx="48" cy="48" r="2.5" fill="currentColor" />
    </svg>
  ),
  combos: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M32 8v10M32 46v10M8 32h10M46 32h10" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  company: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 52h48M16 52V20l16-10 16 10v32" stroke="currentColor" strokeWidth="2" />
      <path d="M28 52V38h8v14" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  analysis: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 46l14-14 10 10 16-18" stroke="currentColor" strokeWidth="2" />
      <path d="M38 24h12v12" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  baby: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="34" r="18" stroke="currentColor" strokeWidth="2" />
      <circle cx="25" cy="30" r="1.8" fill="currentColor" />
      <circle cx="39" cy="30" r="1.8" fill="currentColor" />
      <path d="M27 38c2 2.5 8 2.5 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="6" width="28" height="52" rx="6" stroke="currentColor" strokeWidth="2" />
      <path d="M26 14h12M30 50h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  logo: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="40" height="40" rx="10" stroke="currentColor" strokeWidth="2" />
      <path d="M32 18l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  meet: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="22" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M14 54c2-12 8-18 18-18s16 6 18 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

export function ServiceIcon({ name, size = 56 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      {SERVICE_ICONS[name] ?? SERVICE_ICONS.kundli}
    </svg>
  );
}

const COURSE_GRADIENTS: Record<CourseType, string> = {
  live: "linear-gradient(135deg, #0083fe, #006dd4)",
  recorded: "linear-gradient(135deg, #0f172a, #1e293b)",
  free: "linear-gradient(135deg, #00fff0, #0083fe)",
};

export function CourseCard({ course }: { course: Course }) {
  const isFree = course.type === "free";
  const ctaLabel = course.type === "live" ? "Know More" : course.type === "free" ? "Learn Now" : course.price ? "Buy Now" : "Buy Now";
  const ctaHref = isFree ? course.youtubeUrl! : `/courses/${course.type}/${course.slug}`;
  const typeLabel = course.type === "live" ? "Live" : course.type === "recorded" ? "Recorded" : "Free";
  const typeColor = course.type === "live" ? "bg-primary text-white" : course.type === "recorded" ? "bg-card text-foreground" : "bg-foreground text-bg";

  return (
    <article className="course-card group bg-card rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)] border border-muted flex flex-col h-full">
      <Link href={ctaHref} className="relative block h-56 overflow-hidden" style={{ background: COURSE_GRADIENTS[course.type] }} aria-label={course.title}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.image} alt={course.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider bg-white/85 backdrop-blur text-foreground shadow-sm">
          {course.badge ?? typeLabel}
        </span>
      </Link>
      <div className="p-7 pt-7 flex flex-col flex-1 border-t border-muted/60">
        <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
          <IconAward size={13} /> By {course.teacher}
        </div>
        <h3 className="text-[1.5rem] leading-tight mb-3 mt-1">
          <Link href={ctaHref} className="course-title hover:opacity-80 transition">
            {course.title}
          </Link>
        </h3>
        <p className="text-sm opacity-75 mb-5 line-clamp-2">{course.tagline}</p>
        {course.features && (
          <div className="flex flex-wrap gap-2 mb-5">
            {course.features.map((f) => (
              <span key={f} className="text-[0.7rem] px-2.5 py-1 rounded-full bg-bg text-foreground font-medium border border-muted">
                {f}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3 border-t border-muted pt-5 mt-auto">
          {course.type === "recorded" && course.duration ? (
            <div>
              <span className="block text-xs text-muted-foreground mb-1">{course.duration}</span>
              <span className="text-2xl font-bold text-foreground">{formatINR(course.price ?? 0)}</span>
            </div>
          ) : course.price ? (
            <div>
              <span className="text-2xl font-bold text-foreground">
                {formatINR(course.price)}
                {course.type === "live" ? <span className="text-xs font-medium opacity-60 ml-1">/class</span> : null}
              </span>
              {course.originalPrice ? <span className="ml-2 text-sm text-muted-foreground line-through">{formatINR(course.originalPrice)}</span> : null}
            </div>
          ) : (
            <span className="text-sm font-semibold text-muted-foreground">{isFree ? "Free" : "Price on request"}</span>
          )}
          <Link href={ctaHref} className={isFree ? "btn btn-whatsapp btn-sm" : "btn btn-primary btn-sm"}>
            {isFree ? <IconPlay size={14} /> : null} {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TestimonialCard({ t, index = 0 }: { t: Testimonial; index?: number }) {
  return (
    <RevealCard index={index}>
      <div className="h-full p-6 bg-white rounded-xl border border-gray-200 shadow-sm relative flex flex-col">
        {/* Google Logo */}
        <div className="flex items-center gap-2 mb-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="Google">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-medium text-gray-600">Google Review</span>
        </div>
        
        {/* Stars */}
        <div className="flex gap-0.5 mb-3" aria-label="5 star rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} className="w-5 h-5 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        {/* Review Text */}
        <p className="text-[0.9rem] text-gray-700 mb-5 flex-1 leading-relaxed">{t.text}</p>
        
        {/* Reviewer Info */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <span className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold text-sm">
            {t.initials}
          </span>
          <div>
            <div className="font-medium text-sm text-gray-900">{t.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{t.badge}</div>
          </div>
        </div>
      </div>
    </RevealCard>
  );
}

export function RevealCard({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 100} className="h-full">
      {children}
    </Reveal>
  );
}

const BOOK_COLORS = [
  { gradient: "from-[#00fff0]/50 to-[#0083fe]/30", accent: "#0083fe", glow: "#00fff0" },
  { gradient: "from-[#fbbf24]/50 to-[#f59e0b]/30", accent: "#d97706", glow: "#fbbf24" },
  { gradient: "from-[#34d399]/50 to-[#10b981]/30", accent: "#059669", glow: "#34d399" },
  { gradient: "from-[#a78bfa]/50 to-[#8b5cf6]/30", accent: "#7c3aed", glow: "#a78bfa" },
  { gradient: "from-[#f472b6]/50 to-[#ec4899]/30", accent: "#db2777", glow: "#f472b6" },
  { gradient: "from-[#fb923c]/50 to-[#f97316]/30", accent: "#ea580c", glow: "#fb923c" },
  { gradient: "from-[#38bdf8]/50 to-[#0ea5e9]/30", accent: "#0284c7", glow: "#38bdf8" },
  { gradient: "from-[#c084fc]/50 to-[#a855f7]/30", accent: "#9333ea", glow: "#c084fc" },
  { gradient: "from-[#2dd4bf]/50 to-[#14b8a6]/30", accent: "#0d9488", glow: "#2dd4bf" },
  { gradient: "from-[#fb7185]/50 to-[#f43f5e]/30", accent: "#e11d48", glow: "#fb7185" },
  { gradient: "from-[#facc15]/50 to-[#eab308]/30", accent: "#ca8a04", glow: "#facc15" },
  { gradient: "from-[#60a5fa]/50 to-[#3b82f6]/30", accent: "#2563eb", glow: "#60a5fa" },
];

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const color = BOOK_COLORS[index % BOOK_COLORS.length];

  return (
    <article className="relative rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl border border-white/40 flex flex-col group min-h-[300px]">
      {/* Light glass background */}
      <div className="absolute inset-0 bg-white/70" />

      {/* Colored gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient}`} />

      {/* Glow orb */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40"
        style={{ background: color.glow }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-3xl opacity-30"
        style={{ background: color.accent }}
      />

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col flex-1">
        {/* Header: Label + Menu */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-foreground/50 text-xs font-medium">Recommended Book</span>
          <button className="text-foreground/30 hover:text-foreground/60 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Cover image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="w-28 h-40 object-cover rounded-lg shadow-lg mx-auto mb-4 border border-foreground/10"
        />

        {/* Title + Author */}
        <div className="text-center mb-auto py-4">
          <h3 className="text-foreground font-bold text-lg leading-snug mb-2 line-clamp-2">{book.title}</h3>
          {book.note && (
            <p className="text-foreground/50 text-xs line-clamp-2">{book.note}</p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-foreground/10 my-4" />

        {/* Footer: Buy Button */}
        <div className="flex items-center justify-between">
          <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center border border-white/80">
            <span className="text-foreground/40 text-xs">✦</span>
          </div>
          <a
            href={book.buyUrl}
            target="_blank"
            rel="noreferrer noopener sponsored"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${color.accent}, ${color.glow})`,
              color: "#fff",
            }}
          >
            Buy on Amazon
            <IconExternal size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}

const PRODUCT_COLORS = [
  { gradient: "from-[#00fff0]/50 to-[#0083fe]/30", accent: "#0083fe", glow: "#00fff0" },
  { gradient: "from-[#34d399]/50 to-[#10b981]/30", accent: "#059669", glow: "#34d399" },
  { gradient: "from-[#a78bfa]/50 to-[#8b5cf6]/30", accent: "#7c3aed", glow: "#a78bfa" },
  { gradient: "from-[#fb923c]/50 to-[#f97316]/30", accent: "#ea580c", glow: "#fb923c" },
];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const color = PRODUCT_COLORS[index % PRODUCT_COLORS.length];

  return (
    <article className="relative rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl border border-white/40 flex flex-col group min-h-[300px] h-full">
      {/* Light glass background */}
      <div className="absolute inset-0 bg-white/70" />

      {/* Colored gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient}`} />

      {/* Glow orb */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40"
        style={{ background: color.glow }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-3xl opacity-30"
        style={{ background: color.accent }}
      />

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col flex-1">
        {/* Header: Label + Menu */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-foreground/50 text-xs font-medium">Vastu Product</span>
          <button className="text-foreground/30 hover:text-foreground/60 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Product image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-40 object-contain rounded-lg shadow-lg mb-4 border border-foreground/10 bg-white/40 p-2"
        />

        {/* Title + Description */}
        <div className="text-center mb-auto py-4">
          <h3 className="text-foreground font-bold text-lg leading-snug mb-2 line-clamp-2">{product.title}</h3>
          {product.note && (
            <p className="text-foreground/50 text-xs line-clamp-2">{product.note}</p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-foreground/10 my-4" />

        {/* Footer: Buy Button */}
        <div className="flex items-center justify-between">
          <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center border border-white/80">
            <span className="text-foreground/40 text-xs">✦</span>
          </div>
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noreferrer noopener sponsored"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${color.accent}, ${color.glow})`,
              color: "#fff",
            }}
          >
            Buy on Amazon
            <IconExternal size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CourseEnrollBar({ course }: { course: Course }) {
  const enrollHref =
    course.type === "free" && course.youtubeUrl
      ? course.youtubeUrl
      : course.buyUrl
        ? course.buyUrl
        : waLink(CONTACT.phoneMainRaw, `Namaste Arvindrun ji, I want to enroll in the "${course.title}" course. Please share the details.`);
  return (
    <a
      href={enrollHref}
      target={enrollHref.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={course.type === "free" ? "btn btn-whatsapp" : "btn btn-primary"}
    >
      {course.type === "free" ? (
        <>
          <IconPlay size={16} /> Learn Now {"\u2014"} Free on YouTube
        </>
      ) : course.type === "live" ? (
        course.price ? `Enroll Now — ₹${course.price}/class` : "Enroll in This Course"
      ) : course.buyUrl ? (
        <>
          Buy Now {"\u2014"} {course.price ? formatINR(course.price) : "Check Price"} <IconExternal size={14} />
        </>
      ) : (
        "Enroll Now"
      )}
    </a>
  );
}

export function TypeIcon({ type }: { type: CourseType }) {
  return type === "live" ? <IconVideo size={16} /> : type === "recorded" ? <IconUsers size={16} /> : <IconCheck size={16} />;
}
