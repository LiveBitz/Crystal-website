import BestsellingProducts from "@/components/BestsellingProducts";
import ComboProducts from "@/components/ComboProducts";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import NewArrivals from "@/components/NewArrivals";
import RecentArticles from "@/components/RecentArticles";
import ShopByPurpose from "@/components/ShopByPurpose";
import Testimonials from "@/components/Testimonials";
import TopBar from "@/components/TopBar";
import WhyChooseUs from "@/components/WhyChooseUs";
import { auth } from "@/lib/neonAuth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: session } = await auth.getSession();
  const isLoggedIn = !!session?.user;

  return (
    <>
      <TopBar />
      <Header isLoggedIn={isLoggedIn} />
      <main className="min-h-screen bg-background">
        <Hero />
        <WhyChooseUs />
        <BestsellingProducts />
        <NewArrivals />
        <ShopByPurpose />
        <ComboProducts />
        <HowItWorks />
        <Testimonials />
        <RecentArticles />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
