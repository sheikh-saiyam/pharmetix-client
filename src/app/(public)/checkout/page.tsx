import { CheckoutForm } from "@/features/order/components/checkout-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Pharmetix",
  description: "Secure checkout",
};

export default function CheckoutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
