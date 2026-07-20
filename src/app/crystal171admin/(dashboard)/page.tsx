import { countHeroSlides } from "@/lib/data/hero";
import { countProducts } from "@/lib/data/products";
import { countCategories } from "@/lib/data/categories";
import { countComboBanners } from "@/lib/data/combos";
import { countTestimonials } from "@/lib/data/testimonials";
import { countArticles } from "@/lib/data/articles";
import { countFaqItems } from "@/lib/data/faq";
import { listOrdersForChart } from "@/lib/data/orders";
import SalesChart from "./components/SalesChart";

export default async function AdminDashboardPage() {
  const [hero, products, categories, combos, testimonials, articles, faqs, orders] = await Promise.all([
    countHeroSlides(),
    countProducts(),
    countCategories(),
    countComboBanners(),
    countTestimonials(),
    countArticles(),
    countFaqItems(),
    listOrdersForChart(),
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
