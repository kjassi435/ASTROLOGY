"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND, CONTACT, COPYRIGHT, FOOTER_LINKS, FOOTER_SERVICES, LEGAL } from "@/lib/site";
import { IconMail, IconPhone, IconPin, IconWhatsApp, IconArrowUp } from "./Icons";

export function Footer() {
  return (
    <footer className="bg-foreground text-bg pt-20">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Arvin Astro" style={{ width: 48, height: 48, objectFit: "contain" }} />
          </div>
          <p className="text-[1.1rem] opacity-80 mb-6">{BRAND.tagline}</p>
        </div>

        <div>
          <h4 className="text-bg text-xl mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="opacity-75 hover:text-primary hover:pl-1.5 transition-all">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-bg text-xl mb-5">Services</h4>
          <ul className="space-y-3">
            {FOOTER_SERVICES.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="opacity-75 hover:text-primary hover:pl-1.5 transition-all">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-bg text-xl mb-5">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <IconPhone size={16} className="text-primary mt-0.5 shrink-0" />
              <span>
                <a href={CONTACT.whatsappCommunity} className="hover:text-primary transition">
                  {CONTACT.phoneMain}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <IconMail size={16} className="text-primary mt-0.5 shrink-0" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-primary transition break-all">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <IconPin size={16} className="text-primary mt-0.5 shrink-0" />
              <span>{CONTACT.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary/15">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-sm opacity-70">
          <span>{COPYRIGHT}</span>
          <div className="flex gap-6">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-primary transition">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWidgets() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href={CONTACT.whatsappCommunity} aria-label="Chat on WhatsApp" className="float-whatsapp" title="Chat on WhatsApp">
        <IconWhatsApp size={30} />
      </a>
      <button className={`scroll-top ${visible ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
        <IconArrowUp size={20} />
      </button>
    </>
  );
}
