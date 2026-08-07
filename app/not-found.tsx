import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero
        title={<>Page Not <span className="text-accent">Found</span></>}
        subtitle="The page you are looking for has moved or doesn't exist. Let's get you back on track."
        items={[{ label: "404" }]}
      />
      <section className="bg-bg section pt-10 pb-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-[6rem] font-bold leading-none text-primary-hover">404</div>
          <div className="space-y-4 mb-10">
            <Link href="/" className="btn btn-primary btn-lg">
              Go to Homepage
            </Link>
          </div>
          <p className="text-sm opacity-70">
            Popular pages: <Link href="/services" className="text-primary-hover underline">Services</Link> ·{" "}
            <Link href="/courses" className="text-primary-hover underline">Courses</Link> ·{" "}
            <Link href="/blog" className="text-primary-hover underline">Blog</Link> ·{" "}
            <Link href="/contact" className="text-primary-hover underline">Contact</Link>
          </p>
        </div>
      </section>
    </>
  );
}
