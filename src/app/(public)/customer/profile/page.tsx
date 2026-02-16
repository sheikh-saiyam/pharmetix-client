import CustomerPageHeader from "@/components/layout/customer/customer-header";
import { ProfileForm } from "@/features/customer/components/profile-form";
import { getSession } from "@/lib/get-session";
import { IUser } from "@/types/user.type";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { data: session } = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="space-y-6">
      <CustomerPageHeader
        title="View Profile"
        description="Manage your account information"
        Icon={User}
      />
      <ProfileForm user={session.user as IUser} />
    </div>
  );
}
