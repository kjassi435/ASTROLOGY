import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getServices, getCourses, getBooks, getProducts, getPosts, getTestimonials, getEnquiries } from "@/lib/cms";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const [services, courses, books, products, posts, testimonials, enquiries] = await Promise.all([
    getServices(),
    getCourses(),
    getBooks(),
    getProducts(),
    getPosts(),
    getTestimonials(),
    getEnquiries(),
  ]);
  return NextResponse.json({
    stats: {
      services: services.length,
      courses: courses.length,
      books: books.length,
      products: products.length,
      posts: posts.length,
      testimonials: testimonials.length,
      enquiries: enquiries.length,
    },
  });
}
