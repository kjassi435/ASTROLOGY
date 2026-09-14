import Link from "next/link";
import { IconChevronLeft } from "./Icons";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="text-white/60 hover:text-primary transition">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <IconChevronLeft size={12} className="rotate-180 text-primary/50" />
            {item.href ? (
              <Link href={item.href} className="text-white/60 hover:text-primary transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}