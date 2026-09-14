import type { ReactNode } from "react";
import Image from "next/image";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

function accentLastWords(title: ReactNode): ReactNode {
  if (typeof title !== "string") return title;
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return <span className="text-accent">{title}</span>;
  const last = words.pop()!;
  const rest = words.join(" ");
  return <>{rest} <span className="text-accent">{last}</span></>;
}

export function PageHero({ title, subtitle, items, children, image, bgImage }: { title: ReactNode; subtitle?: string; items: Array<{ label: string; href?: string }>; children?: ReactNode; image?: string; bgImage?: string }) {
  const renderedTitle = accentLastWords(title);

  return (
    <section className="relative overflow-hidden pt-16 pb-14 bg-foreground">
      {/* Background image (replaces the default gradient) */}
      {bgImage ? (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImage}
              alt=""
              fill
              priority
              sizes="100vw"
              unoptimized={bgImage.startsWith("http")}
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/25"></div>
        </>
      ) : (
        <>
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-primary/10 opacity-40"></div>
            <div className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full border border-primary/15 opacity-50" style={{ borderStyle: "dashed" }}></div>
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full border border-primary/10 opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5 opacity-20"></div>
            <div className="absolute top-8 right-12 text-primary/20 text-7xl">✦</div>
            <div className="absolute bottom-8 left-16 text-primary/15 text-5xl">✧</div>
            <div className="absolute top-1/3 right-1/4 text-primary/10 text-4xl">☆</div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10"></div>
          </div>
        </>
      )}

      <JsonLd data={breadcrumbSchema(items.map((it) => ({ name: it.label, item: it.href })))} />

      <div className="max-w-[1280px] mx-auto px-6 relative z-[2]">
        <div className={image ? "grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-center" : ""}>
          <div>
            <div className="mb-5">
              <Breadcrumbs items={items} />
            </div>

            <h1 className="page-hero-title text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.1] text-white mb-4 tracking-tight">
              {renderedTitle}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-[#00fff0] rounded-full"></div>
              <span className="text-primary/60 text-lg">✦</span>
              <div className="w-8 h-1 bg-gradient-to-r from-[#00fff0] to-primary/30 rounded-full"></div>
            </div>

            {subtitle ? (
              <p className="max-w-3xl text-white/70 text-lg leading-relaxed mb-6">{subtitle}</p>
            ) : null}

            {children}
          </div>

          {image ? (
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[var(--radius-xl)] border-2 border-primary/20 border-dashed"></div>
                <div className="absolute -inset-1 rounded-[var(--radius-lg)] bg-gradient-to-br from-primary/20 to-[#00fff0]/20 blur-sm"></div>
                <Image
                  src={image}
                  alt={typeof title === "string" ? title : "Service"}
                  width={360}
                  height={240}
                  unoptimized={image.startsWith("http")}
                  className="relative w-[360px] h-[240px] object-cover rounded-[var(--radius-lg)] shadow-[0_20px_60px_rgba(0,131,254,0.3)] border border-white/10"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}