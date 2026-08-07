import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Arvin Astro",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="How we collect, use and protect your information." items={[{ label: "Privacy Policy" }]} />
      <section className="bg-bg section pt-10 pb-24">
        <div className="max-w-3xl mx-auto px-6 prose-foreground space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="text-xl mb-2">1. Information We Collect</h2>
            <p className="opacity-80">
              When you contact us or book a service, we collect the information you provide — such as your name, phone number, email address, and
              details related to your consultation (birth details, name, etc.). We do not collect payment details on this website; payments are
              processed by third-party payment gateways.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">2. How We Use Your Information</h2>
            <p className="opacity-80">
              We use your information solely to provide our services — to schedule and deliver consultations, enrol you in courses, respond to your
              queries, and send updates about our services if you have opted in. We never sell or rent your personal information to anyone.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">3. Confidentiality of Consultations</h2>
            <p className="opacity-80">
              All consultation details shared with us — including birth details and personal concerns — are treated as strictly confidential and are
              used only for the purpose of the consultation.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">4. Data Security</h2>
            <p className="opacity-80">
              We take reasonable measures to protect your data from unauthorised access, alteration or disclosure. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">5. Third-Party Links</h2>
            <p className="opacity-80">
              Our website contains links to third-party services (payment gateways, learning platforms, social media). We are not responsible for the
              privacy practices of these external sites.
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">6. Contact Us</h2>
            <p className="opacity-80">
              For any privacy-related questions, write to us at <strong>info@arvinastro.in</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
