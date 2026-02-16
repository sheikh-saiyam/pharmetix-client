import { CheckoutForm } from "@/features/order/components/checkout-form";
import { getSession } from "@/lib/get-session";
import { IUser } from "@/types/user.type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Pharmetix",
  description: "Secure checkout",
};

export default async function CheckoutPage() {
  const { data: session } = await getSession();

  return (
    <div className="container mx-auto">
      <CheckoutForm user={session?.user as IUser} />
    </div>
  );
}
