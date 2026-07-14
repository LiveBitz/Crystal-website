import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Crystalenii's policy on damaged items, returns, and refunds.",
};

export default function ReturnsRefundsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-sage-50 pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Returns & Refunds
            </h1>
            <p className="mt-4 text-sm text-foreground/70 sm:text-base">
              Please review our policies regarding purchases carefully.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
            <div className="max-w-3xl mx-auto text-sage-900/80 leading-relaxed space-y-6">
              <div className="rounded-2xl border border-[#b87a88]/30 bg-primary-light/10 p-8 mb-10 text-center shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">All Sales Are Final</h3>
                <p className="text-sage-900/90 leading-relaxed">
                  Because of the fragile, sacred, and energetic nature of our crystals and ritual kits, <strong>we do not accept returns, exchanges, or offer refunds</strong>.
                </p>
              </div>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">Why are sales final?</h3>
              <p>
                Each crystal absorbs and carries energy. To guarantee that every customer receives stones that are energetically pure and have not been handled by multiple previous parties, we must enforce a strict all-sales-are-final policy. Once a piece leaves our sanctuary, it belongs to its new journey.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">What if my item arrives damaged?</h3>
              <p>
                We take immense pride in our protective packaging. However, if your order is damaged by the shipping carrier during transit, please contact us immediately at <strong>support@crystalenii.com</strong> within 48 hours of receiving your delivery. Please include your order number and clear photos of both the damaged product and the packaging. We will review transit damages on a case-by-case basis.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">Order Cancellations</h3>
              <p>
                If you need to cancel an order, please email us within <strong>2 hours</strong> of placing it. Once an order enters the processing phase or has been shipped, it can no longer be canceled or modified.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
