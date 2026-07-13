import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/db";
import CheckoutClient from "./CheckoutClient";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/sign-up");
  }

  const payload = await verifyJwt(token);
  if (!payload || !payload.id) {
    redirect("/sign-up");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id as string },
    select: {
      name: true,
      email: true,
      phone: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      state: true,
      postalCode: true,
      country: true,
    }
  });

  if (!user) {
    redirect("/sign-up");
  }

  // Retrieve WhatsApp number from the .env file, or use a default if not found
  const whatsappNumber = process.env.WHATSAPP_NUMBER || "7014167848";

  return (
    <>
      <TopBar />
      <Header isLoggedIn={true} />
      <main className="min-h-screen bg-sage-50 pb-20 pt-10">
        <CheckoutClient user={user} whatsappNumber={whatsappNumber} />
      </main>
      <Footer />
    </>
  );
}
