"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrderSchema,
  CreateOrderSchema,
} from "@/features/order/schemas/order.schema";
import { orderService } from "@/features/order/services/order.service";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // If address is textarea
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useEffect, useState } from "react";

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart, totalPrice } = useCartStore();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      shippingName: user?.name || "",
      shippingPhone: "",
      shippingAddress: "",
      shippingCity: "",
      shippingPostalCode: "",
      orderItems: items.map((i) => ({
        medicineId: i.id,
        quantity: i.quantity,
      })),
    },
  });

  // Update form default values when user loads
  useEffect(() => {
    if (user) {
      form.setValue("shippingName", user.name || "");
    }
    // Sync items to form if cart changes?
    form.setValue(
      "orderItems",
      items.map((i) => ({ medicineId: i.id, quantity: i.quantity })),
    );
  }, [user, items, form]);

  if (isAuthLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    router.push("/login?redirect=/checkout");
    return null;
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  async function onSubmit(values: CreateOrderSchema) {
    setIsSubmitting(true);
    try {
      const response = await orderService.create(values);
      if (response.success) {
        toast.success(
          `Order placed successfully! Order #${response.data.orderNumber}`,
        );
        clearCart();
        router.push("/dashboard/customer/orders"); // Redirect to orders list
        router.refresh();
      } else {
        toast.error(response.message || "Failed to place order");
      }
    } catch (error: any) {
      // Handle backend validation errors
      // "Stock insufficient for one or more items."
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Failed to place order");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Need axios import for error handling check above
  const axios = require("axios"); // Or import at top

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="shippingName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="017..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="House 12, Road 5..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shippingCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="1212" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Placing Order..."
                : `Place Order (৳${totalPrice() + 60})`}
            </Button>
          </form>
        </Form>
      </div>

      <div className="bg-muted/10 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.brandName} x {item.quantity}
              </span>
              <span>৳{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total + Delivery (60)</span>
            <span>৳{totalPrice() + 60}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
