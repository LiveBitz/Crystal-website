import { prisma } from "@/lib/db";
import SalesChart from "./components/SalesChart";

export default async function AdminDashboardPage() {
  const [hero, products, categories, combos, testimonials, articles, faqs, orders] = await Promise.all([
    prisma.heroSlide.count(),
    prisma.product.count(),
    prisma.category.count(),
    prisma.comboBanner.count(),
    prisma.testimonial.count(),
    prisma.article.count(),
    prisma.faqItem.count(),
    prisma.order.findMany({ select: { id: true, totalAmount: true, createdAt: true }, orderBy: { createdAt: "asc" } })
  ]);

  const stats = [
    { label: "Hero Banners", value: hero, href: "/crystal171admin/hero" },
    { label: "Products", value: products, href: "/crystal171admin/products" },
    { label: "Shop By Purpose", value: categories, href: "/crystal171admin/categories" },
    { label: "Combo Banners", value: combos, href: "/crystal171admin/combos" },
    { label: "Testimonials", value: testimonials, href: "/crystal171admin/testimonials" },
    { label: "Articles", value: articles, href: "/crystal171admin/articles" },
    { label: "FAQ", value: faqs, href: "/crystal171admin/faq" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Overview of everything shown on the live site.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map(({ label, value, href }) => (
          <a
            key={href}
            href={href}
            className="rounded-xl border border-sage-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="font-serif text-3xl font-bold text-primary">{value}</p>
            <p className="mt-1 text-sm font-medium text-foreground/70">{label}</p>
          </a>
        ))}
      </div>

      <div className="mt-8">
        <SalesChart orders={orders} />
      </div>
    </div>
  );
}
