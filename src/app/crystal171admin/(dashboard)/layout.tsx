import Sidebar from "@/components/admin/Sidebar";
import { logout } from "./actions";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-sage-50">
      <Sidebar onLogout={logout} />
      <main className="flex-1 overflow-x-hidden px-6 py-8 sm:px-10">{children}</main>
    </div>
  );
}
