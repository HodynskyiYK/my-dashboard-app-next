import { Sidebar } from "@/widgets/sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;