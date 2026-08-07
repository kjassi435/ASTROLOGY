"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ANNOUNCEMENT, APPS, CONTACT, NAV } from "@/lib/site";
import { IconChevronDown, IconClose, IconMail, IconMenu, IconPhone, IconPin } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropOpen(null);
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
      {ANNOUNCEMENT ? (
        <div className="bg-foreground text-bg text-center text-[0.8rem] px-4 py-2 font-medium">
          <span className="line-clamp-1">{ANNOUNCEMENT}</span>
        </div>
      ) : null}

      {/* Top bar */}
      <div className="bg-card border-b border-muted hidden md:block">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-4 py-2 text-sm text-foreground">
          <div className="flex items-center gap-6">
            <a href={CONTACT.whatsappCommunity} className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-primary transition">
              <IconPhone size={14} />
              97186 46655
            </a>
            <span className="flex items-center gap-2 opacity-80">
              <IconPin size={14} />
              {CONTACT.addressShort}
            </span>
          </div>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-primary transition">
            <IconMail size={14} />
            {CONTACT.email}
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-[1000] border-b transition-all duration-300 ${
          scrolled ? "bg-bg/98 shadow-md" : "bg-bg/95 backdrop-blur-xl"
        } border-muted`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6 h-[72px]">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Arvin Astro" style={{ width: 40, height: 40, objectFit: "contain" }} className="transition-transform group-hover:scale-105" />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => (
                <li key={item.label} className="relative" onMouseEnter={() => setDropOpen(item.label)} onMouseLeave={() => setDropOpen(null)}>
                  <Link
                    href={item.href}
                    className={`relative py-2 text-[0.95rem] font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
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
            <a href={CONTACT.whatsappCommunity} aria-label="WhatsApp" className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition">
              <IconPhone size={16} />
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Book Now
            </Link>
          </div>

          <button className="lg:hidden flex flex-col gap-[5px] w-[30px] cursor-pointer" onClick={() => setOpen(!open)} aria-label="Menu">
            <IconMenu size={26} className="text-foreground" />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-0 h-screen bg-bg z-[2000] transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-full"} overflow-y-auto`}
        >
          <div className="flex items-center gap-2.5 px-6 h-[72px] border-b border-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Arvin Astro" style={{ width: 36, height: 36, objectFit: "contain" }} />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 ml-auto">
              <IconClose size={24} className="text-foreground" />
            </button>
          </div>
          <nav className="px-6 py-6">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-lg transition ${
                      isActive(item.href) ? "bg-card text-primary" : "text-foreground hover:bg-card/60"
                    }`}
                  >
                    {item.label}
                    {item.children ? <IconChevronDown size={16} /> : null}
                  </Link>
                  {item.children && (
                    <ul className="pl-6 space-y-1 mb-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm text-foreground opacity-80 hover:opacity-100 hover:bg-card/60">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact" className="btn btn-primary btn-full">
                Book Now
              </Link>
              <div className="flex items-center justify-between rounded-xl border border-muted px-5 py-4">
                <a href={`tel:${CONTACT.phoneMainRaw}`} className="flex items-center gap-2 text-sm font-semibold">
                  <IconPhone size={16} className="text-primary" /> {CONTACT.phoneMain}
                </a>
                <a href={APPS.android} className="text-xs text-primary underline">
                  Android App
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
