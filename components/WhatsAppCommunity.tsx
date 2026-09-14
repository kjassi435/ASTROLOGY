import { CONTACT } from "@/lib/site";
import { SectionHeader } from "./Cards";
import { IconWhatsApp } from "./Icons";

export function WhatsAppCommunity({ kicker, title, desc }: { kicker?: string; title?: string; desc?: string }) {
  return (
    <section className="bg-bg section" id="whatsapp-community">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          center
          subtitle={kicker}
          title={title}
          desc={desc}
        />
        <div className="max-w-2xl mx-auto bg-card rounded-[var(--radius-xl)] border-2 border-primary-hover/20 p-8 sm:p-12 text-center shadow-[var(--shadow-lg)]">
          <span className="text-primary-hover mb-4 flex justify-center">
            <IconWhatsApp size={56} />
          </span>
          <h3 className="text-2xl mb-2">
            Join our <span className="text-accent">Arvin Astro Community</span>
          </h3>
          <p className="opacity-80 mb-6">to stay connected and get:</p>
          <ul className="space-y-3 text-left max-w-md mx-auto mb-8">
            <li className="flex items-start gap-2.5">
              <span className="shrink-0">🔮</span>
              <span><strong>Free Insights:</strong> Astrology, Numerology &amp; Vastu knowledge</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="shrink-0">📢</span>
              <span><strong>Course Updates:</strong> Early access to Free &amp; Paid sessions</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="shrink-0">🎓</span>
              <span><strong>Expert Learning:</strong> Learn the secrets of Occult Sciences</span>
            </li>
          </ul>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={CONTACT.whatsappCommunity} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <IconWhatsApp size={16} /> Join WhatsApp Community
            </a>
            <a href={CONTACT.whatsappDirect} target="_blank" rel="noreferrer" className="btn btn-outline">
              <IconWhatsApp size={16} /> Chat with Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
