import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageHero({ title, subtitle, items, children }: { title: ReactNode; subtitle?: string; items: Array<{ label: string; href?: string }>; children?: ReactNode }) {
  return (
    <section className="bg-card relative overflow-hidden pt-14 pb-12 border-b border-muted">
      <span className="absolute top-4 left-8 text-[6rem] text-primary opacity-15 select-none pointer-events-none">{"\u2726"}</span>
      <span className="absolute bottom-4 right-10 text-[4rem] text-primary opacity-10 select-none pointer-events-none">{"\u2726"}</span>
      <div className="max-w-[1280px] mx-auto px-6 relative z-[2]">
        <Breadcrumbs items={items} />
        <h1 className="font-medium text-[clamp(2.2rem,4vw,3.4rem)] leading-tight mt-4 mb-3">{title}</h1>
        {subtitle ? <p className="max-w-3xl opacity-80">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}
