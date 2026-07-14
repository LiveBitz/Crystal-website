import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Delivery timelines, packaging, and shipping details for Crystalenii orders.",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-sage-50 pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Shipping Policy
            </h1>
            <p className="mt-4 text-sm text-foreground/70 sm:text-base">
              Everything you need to know about how we deliver your crystals.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
            <div className="max-w-3xl mx-auto text-sage-900/80 leading-relaxed space-y-6">
              <h3 className="font-serif text-2xl font-bold text-primary mt-8">Processing Time</h3>
              <p>
                All orders are carefully hand-packed with positive intentions. Please allow <strong>1-3 business days</strong> for order processing before your package is shipped. During peak seasons, sales, or product drops, processing times may be slightly extended.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">Shipping Rates & Delivery Estimates</h3>
              <p>
                Shipping charges for your order will be calculated and displayed at checkout.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Standard Shipping:</strong> Typically takes 3-5 business days after processing.</li>
                <li><strong>Express Shipping:</strong> Typically takes 1-2 business days after processing.</li>
              </ul>
              <p className="italic text-sm">
                Note: Delivery delays can occasionally occur due to extreme weather or unforeseen carrier issues.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">Shipment Confirmation & Order Tracking</h3>
              <p>
                You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">Damaged in Transit</h3>
              <p>
                While we pack every crystal with extreme care using bubble wrap and protective layers, they are fragile by nature. If you receive a damaged package, please contact us at <strong>support@crystalenii.com</strong> within 48 hours of delivery with clear photos of the damaged item and the packaging, and we will assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
