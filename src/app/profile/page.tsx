import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/neonAuth";
import { prisma } from "@/lib/db";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileClient from "./ProfileClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    redirect("/sign-up");
  }

  const user = await prisma.userProfile.upsert({
    where: { id: session.user.id },
    update: {},
    create: { id: session.user.id, name: session.user.name, email: session.user.email },
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
    },
  });

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  return (
    <>
      <TopBar />
      <Header isLoggedIn={true} />
      <main className="min-h-screen bg-sage-50 pb-20">
        <ProfileClient user={user} orders={orders} />
      </main>
      <Footer />
    </>
  );
}
