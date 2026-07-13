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

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
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
