"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APPS, CONTACT, NAV } from "@/lib/site";
import { IconChevronDown, IconClose, IconMenu, IconPhone } from "./Icons";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

function parseNav(json?: string): NavItem[] | null {
  if (!json) return null;
  try {
    const arr = JSON.parse(json);
    if (
      Array.isArray(arr) &&
      arr.every((i) => i && typeof i.label === "string" && typeof i.href === "string")
    )
      return arr as NavItem[];
  } catch {
    /* ignore */
  }
  return null;
}

function toRaw(phone?: string) {
  return (phone ?? "").replace(/[^\d+]/g, "");
}

const BRAND_NAME = "Arvindrun Vnjay";
const BRAND_TAGLINE = "Sahi Disha, Sahi Gyan";

function LogoText({ logo }: { logo: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt="Arvin Astro" style={{ width: 52.5, height: 52.5, objectFit: "contain" }} className="transition-transform group-hover:scale-105" />
      <div className="flex flex-col leading-none">
        <span className="whitespace-nowrap text-foreground font-extrabold text-lg sm:text-xl tracking-tight group-hover:text-primary transition-colors">
          {BRAND_NAME}
        </span>
        <span className="whitespace-nowrap text-foreground/80 text-[0.6rem] sm:text-[0.7rem] font-medium mt-1 tracking-wide">
          {BRAND_TAGLINE}
        </span>
      </div>
    </Link>
  );
}

export function Header({ global }: { global?: Record<string, string> }) {
  const g = global ?? {};
  const logo = g.logoUrl || "/images/logo.png";
  const phone = g.phoneMain ?? CONTACT.phoneMain;
  const phoneRaw = toRaw(g.phoneMain ?? CONTACT.phoneMain);
  const appsIos = g.appsIos ?? APPS.ios;
  const appsAndroid = g.appsAndroid ?? APPS.android;
  const nav = parseNav(g.navJson) ?? NAV;

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState<string | null>(null);
  const [mobileDrop, setMobileDrop] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropOpen(null);
    setMobileDrop(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Top bar — phone (left) + iOS / Android app links (right) */}
      <div className="border-b border-foreground/15" style={{ backgroundColor: "#f0f9ff" }}>
        <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3 py-2 text-[0.8rem] sm:text-sm text-foreground">
          <a href={`tel:${phoneRaw}`} className="flex items-center gap-2 font-medium opacity-90 hover:text-primary transition">
            <IconPhone size={14} className="text-primary" />
            {phone}
          </a>
          <div className="flex items-center gap-4 sm:gap-5">
            <a href={appsIos} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              iOS App
            </a>
            <a href={appsAndroid} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              Android App
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-[1000] border-b transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        } border-foreground/15`}
        style={{ backgroundColor: "#f0f9ff" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 h-[72px]">
          <LogoText logo={logo} />

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-4 xl:gap-6">
              {nav.map((item) => (
                <li key={item.label} className="relative whitespace-nowrap" onMouseEnter={() => setDropOpen(item.label)} onMouseLeave={() => setDropOpen(null)}>
                  <Link
                    href={item.href}
                    className={`relative py-2 whitespace-nowrap text-[0.9rem] font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
                      isActive(item.href) ? "text-primary opacity-100 after:w-full" : "opacity-80 after:w-0 hover:opacity-100 hover:after:w-full"
                    } flex items-center gap-1`}
                  >
                    {item.label}
                    {item.children ? <IconChevronDown size={14} className="mt-0.5" /> : null}
                  </Link>
                  {item.children && (
                    <ul
                      className={`absolute left-0 top-full w-56 bg-card rounded-xl shadow-lg border border-muted py-3 transition-all duration-200 ${
                        dropOpen === item.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
                      }`}
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block px-5 py-2.5 text-sm text-foreground hover:bg-bg hover:text-primary transition">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href={`tel:${phoneRaw}`} aria-label="Call us" className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition">
              <IconPhone size={16} />
            </Link>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Book Now
            </Link>
          </div>

          <button className="lg:hidden flex flex-col gap-[5px] w-[30px] cursor-pointer" onClick={() => setOpen(!open)} aria-label="Menu">
            <IconMenu size={26} className="text-foreground" />
          </button>
        </div>
      </header>

      {/* Mobile menu — slide-in drawer */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-[1500] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={`lg:hidden fixed inset-y-0 right-0 w-[88%] max-w-sm z-[2000] transition-transform duration-300 ease-out overflow-y-auto ${open ? "translate-x-0 shadow-2xl" : "translate-x-full"}`}
        style={{ backgroundColor: "#f0f9ff" }}
        aria-hidden={!open}
      >
        <div className="sticky top-0 flex items-center justify-between px-5 h-[72px] border-b border-foreground/15" style={{ backgroundColor: "#f0f9ff" }}>
          <LogoText logo={logo} />
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center active:scale-95 transition">
            <IconClose size={22} className="text-foreground" />
          </button>
        </div>

        <nav className="px-4 py-5">
          <ul className="space-y-1.5">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    onClick={() => setMobileDrop(mobileDrop === item.label ? null : item.label)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold text-[1.05rem] transition ${
                      isActive(item.href) || (item.children ?? []).some((c) => isActive(c.href))
                        ? "bg-foreground text-white"
                        : "text-foreground bg-foreground/5 hover:bg-foreground/10"
                    }`}
                  >
                    {item.label}
                    <IconChevronDown size={16} className={`transition-transform duration-300 ${mobileDrop === item.label ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileDrop === item.label ? "max-h-96 mt-1" : "max-h-0"}`}>
                    <ul className="space-y-1 pl-3">
                      <li>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block px-4 py-2.5 rounded-lg text-[0.95rem] font-medium text-foreground hover:bg-foreground/10 transition"
                        >
                          All {item.label}
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={`block px-4 py-2.5 rounded-lg text-[0.95rem] transition ${
                              isActive(child.href) ? "bg-foreground/10 font-semibold" : "text-foreground/90 hover:bg-foreground/10"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-xl font-semibold text-[1.05rem] transition ${
                      isActive(item.href) ? "bg-foreground text-white" : "text-foreground bg-foreground/5 hover:bg-foreground/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="mt-7 space-y-3">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary btn-full">
              Book Now
            </Link>
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-foreground text-white font-semibold px-5 py-3.5 active:scale-[0.98] transition"
            >
              <IconPhone size={16} /> {phone}
            </a>
            <div className="flex items-center justify-center gap-6 pt-1 text-sm font-semibold text-foreground">
              <a href={appsIos} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                iOS App
              </a>
              <span className="w-px h-4 bg-foreground/30" />
              <a href={appsAndroid} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Android App
              </a>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
