import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-sage-50 pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-foreground/70 sm:text-base">
              How we protect your personal information and privacy.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
            <div className="max-w-3xl mx-auto text-sage-900/80 leading-relaxed space-y-6">
              <p className="text-sm text-sage-900/50 mb-8 italic">Last Updated: {new Date().toLocaleDateString()}</p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">1. Information We Collect</h3>
              <p>
                We collect information that you provide directly to us when you make a purchase, create an account, sign up for our newsletter, or contact our customer support. This may include your name, email address, shipping address, and payment information.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Process and fulfill your orders.</li>
                <li>Send you order confirmations and shipping updates.</li>
                <li>Respond to your customer service inquiries.</li>
                <li>Send you marketing communications (if you have opted in).</li>
              </ul>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">3. Information Sharing</h3>
              <p>
                We do not sell or rent your personal information to third parties. We only share your information with trusted service providers who assist us in operating our website, processing payments, and delivering your packages. These partners are strictly bound to keep your information confidential.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">4. Security</h3>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. Our checkout process utilizes secure encryption to ensure your payment details are safe.
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mt-8">5. Your Rights</h3>
              <p>
                You have the right to access, correct, or delete your personal information. If you wish to exercise any of these rights, please contact us at <strong>support@crystalenii.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
