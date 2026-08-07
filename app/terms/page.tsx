import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service | Arvin Astro",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" subtitle="Please read these terms carefully before using our services." items={[{ label: "Terms of Service" }]} />
      <section className="bg-bg section pt-10 pb-24">
        <div className="max-w-3xl mx-auto px-6 space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="text-xl mb-2">1. Nature of Services</h2>
            <p className="opacity-80">
              Our Astrology, Numerology, Name Numerology and Vastu services and courses are for educational and guidance purposes. They are not a
              substitute for professional medical, legal or financial advice. Decisions in such matters remain entirely your own responsibility.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">2. Bookings &amp; Payments</h2>
            <p className="opacity-80">
              Consultations and courses are booked through our website, WhatsApp, or partner platforms. Fees, once paid, are non-refundable except
              where we are unable to deliver the booked service. A reschedule request is accommodated once per booking with prior notice.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">3. Course Access</h2>
            <p className="opacity-80">
              Access to paid courses is for your personal learning only. Sharing accounts, or redistributing course content, is prohibited and may
              result in termination of access without refund.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">4. Intellectual Property</h2>
            <p className="opacity-80">
              All content on this website — including course material, articles and graphics — is the property of Arvin Astro and may not be
              reproduced without written permission.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">5. Limitation of Liability</h2>
            <p className="opacity-80">
              To the fullest extent permitted by law, our total liability for any claim arising from our services is limited to the amount you paid
              for that specific service.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">6. Contact</h2>
            <p className="opacity-80">
              Questions about these terms? Write to us at <strong>info@arvinastro.in</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
