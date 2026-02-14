import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button"; // For mobile toggle if needed
// import Header? Or just use sidebar.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
