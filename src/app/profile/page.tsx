import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/neonAuth";
import { ensureUserProfile } from "@/lib/data/userProfile";
import { listOrdersForUser } from "@/lib/data/orders";
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

  const user = await ensureUserProfile({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  const orders = await listOrdersForUser(session.user.id);

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
