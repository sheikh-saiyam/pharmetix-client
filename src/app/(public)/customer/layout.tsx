import { CustomerSidebar } from "@/components/layout/customer/customer-sidebar";
import { getSession } from "@/lib/get-session";
import { IUser } from "@/types/user.type";
import { redirect } from "next/navigation";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-6 max-w-7xl py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <CustomerSidebar user={session.user as IUser} />
        <main className="flex-1 min-w-0">
          <div className="bg-white shadow-lg shadow-muted rounded-md border overflow-hidden min-h-[500px] p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
