import { CheckoutForm } from "@/features/order/components/checkout-form";
import { getSession } from "@/lib/get-session";
import { IUser, UserRole } from "@/types/user.type";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout - Pharmetix",
  description: "Secure checkout",
};

export default async function CheckoutPage() {
  const { data: session } = await getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.role !== UserRole.CUSTOMER) {
    redirect("/");
  }

  return (
    <div className="container mx-auto">
      <CheckoutForm user={session?.user as IUser} />
    </div>
  );
}
