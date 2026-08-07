"use client";

import * as React from "react";
import { Share2, X } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGoogle,
  FaMobileScreen,
} from "react-icons/fa6";

type Platform = "facebook" | "instagram" | "youtube" | "googleplay" | "mobileapp";

interface SocialLink {
  platform: Platform;
  href: string;
}

interface PlatformStyle {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  hoverGradient: string;
}

const PLATFORM_STYLES: Record<Platform, PlatformStyle> = {
  facebook: {
    label: "Facebook",
    icon: FaFacebook,
    gradient: "from-blue-700 to-blue-500",
    hoverGradient: "from-blue-600 to-blue-400",
  },
  instagram: {
    label: "Instagram",
    icon: FaInstagram,
    gradient: "from-pink-600 via-purple-600 to-orange-500",
    hoverGradient: "from-pink-500 via-purple-500 to-orange-400",
  },
  youtube: {
    label: "YouTube",
    icon: FaYoutube,
    gradient: "from-red-700 to-red-500",
    hoverGradient: "from-red-600 to-red-400",
  },
  googleplay: {
    label: "Google Play",
    icon: FaGoogle,
    gradient: "from-emerald-700 to-emerald-500",
    hoverGradient: "from-emerald-600 to-emerald-400",
  },
  mobileapp: {
    label: "Mobile App",
    icon: FaMobileScreen,
    gradient: "from-blue-600 to-cyan-500",
    hoverGradient: "from-blue-500 to-cyan-400",
  },
};

const SOCIAL_LINKS: SocialLink[] = [
  { platform: "facebook", href: "https://www.facebook.com/arvinastro112/" },
  { platform: "instagram", href: "https://www.instagram.com/arvin_astro/" },
  { platform: "youtube", href: "https://www.youtube.com/@arvinastro" },
  { platform: "googleplay", href: "https://play.google.com/store/apps/details?id=co.iron.ruvvu&pcampaignid=web_share" },
  { platform: "mobileapp", href: "https://play.google.com/store/apps/details?id=co.iron.ruvvu&pcampaignid=web_share" },
];

export function SocialLinks() {
  const [hoveredPlatform, setHoveredPlatform] = React.useState<Platform | null>(null);
  const [mobileDockOpen, setMobileDockOpen] = React.useState(false);

  return (
    <>
      {/* Desktop - Left side sliding panels */}
      <div className="hidden lg:flex flex-col fixed top-[35%] left-0 z-40">
        <ul className="space-y-3">
          {SOCIAL_LINKS.map(({ platform, href }) => {
            const style = PLATFORM_STYLES[platform];
            if (!style) return null;
            const Icon = style.icon;

            return (
              <li
                key={platform}
                onMouseEnter={() => setHoveredPlatform(platform)}
                onMouseLeave={() => setHoveredPlatform(null)}
                className="group"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-44 h-14 px-4 ml-[-120px]
                             group-hover:ml-[-10px] transition-all duration-500 ease-out
                             rounded-r-xl relative overflow-hidden border border-border
                             bg-[hsl(var(--card))] shadow-md hover:shadow-lg"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      hoveredPlatform === platform
                        ? style.hoverGradient
                        : style.gradient
                    } opacity-90 transition-all duration-500`}
                  />
                  <span className="relative z-10 text-white font-semibold tracking-wide text-sm group-hover:tracking-widest transition-all duration-300">
                    {style.label}
                  </span>
                  <Icon
                    size={22}
                    className="relative z-10 text-white drop-shadow-sm group-hover:scale-125 transition-transform duration-500"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile - Floating dock */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        {mobileDockOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileDockOpen(false)}
          />
        )}

        <div className="relative">
          <div
            className={`absolute bottom-20 right-0 flex flex-col-reverse gap-3 transition-all duration-500 ${
              mobileDockOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            {SOCIAL_LINKS.map(({ platform, href }, index) => {
              const style = PLATFORM_STYLES[platform];
              if (!style) return null;
              const Icon = style.icon;
              return (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative ml-auto"
                  style={{
                    transitionDelay: mobileDockOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${style.gradient}
                               flex items-center justify-center shadow-lg hover:scale-110
                               transition-transform duration-300 border border-border`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-16
                                  bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-md
                                  opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {style.label}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                </a>
              );
            })}
          </div>

          <button
            onClick={() => setMobileDockOpen(!mobileDockOpen)}
            className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl active:scale-95
                       transition-all duration-300 border border-border overflow-hidden bg-gray-900"
            aria-label="Toggle social links"
          >
            <div className="relative z-10">
              {mobileDockOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Share2 size={24} className="text-white" />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default SocialLinks;
