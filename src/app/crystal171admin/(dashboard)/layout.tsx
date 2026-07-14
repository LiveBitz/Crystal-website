import Sidebar from "@/components/admin/Sidebar";
import { logout } from "./actions";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-sage-50 lg:flex-row">
      <Sidebar onLogout={logout} />
      <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        {children}
      </main>
    </div>
  );
}
