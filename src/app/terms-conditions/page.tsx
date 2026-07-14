import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsConditionsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-sage-50 pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-sm text-foreground/70 sm:text-base">
              The rules and guidelines for using our services.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
            <div className="max-w-3xl mx-auto text-sage-900/80 leading-relaxed space-y-6">
              <p className="text-sm text-sage-900/50 mb-8 italic">Last Updated: {new Date().toLocaleDateString()}</p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">1. Agreement to Terms</h3>
              <p>
                By accessing or using our website, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">2. Products and Natural Variations</h3>
              <p>
                Our products consist of natural stones and crystals. Therefore, variations in color, size, shape, and texture are completely normal and to be expected. The items you receive may not look identical to the exact photos displayed, as every natural piece is entirely unique.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">3. Not Medical Advice</h3>
              <p>
                The metaphysical properties and meanings provided on our website are for spiritual and energetic support only. They are not intended as a substitute for professional medical, psychological, or legal advice. Please consult a healthcare professional for any medical issues.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">4. Pricing and Availability</h3>
              <p>
                All prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of products.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">5. Intellectual Property</h3>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Crystalenii and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of our site without express written consent.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
