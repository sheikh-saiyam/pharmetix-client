"use client";

import { PageLoader } from "@/components/layout/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  createOrderSchema,
  ICreateOrderSchema,
} from "@/features/order/schemas/order.schema";
import { orderService } from "@/features/order/services/order.service";
import { useCartStore } from "@/store/cart.store";
import { IUser } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  CircleAlert,
  CreditCardIcon,
  Hash,
  Home,
  HomeIcon,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function CheckoutForm({ user }: { user: IUser }) {
  const router = useRouter();
  const { items, clearCart, totalPrice } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [hasHydrated, setHasHydrated] = useState(false);

  const form = useForm<ICreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      shippingName: user?.name || "",
      shippingPhone: "",
      shippingAddress: "",
      shippingCity: "",
      shippingPostalCode: "",
      orderItems: [],
    },
  });

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (user) {
      form.setValue("shippingName", user.name || "");
    }
    if (items.length > 0) {
      form.setValue(
        "orderItems",
        items.map((i) => ({ medicineId: i.id, quantity: i.quantity })),
      );
    }
  }, [user, items, form]);

  useEffect(() => {
    if (hasHydrated && items.length === 0) {
      router.push("/cart");
    }
  }, [hasHydrated, items.length, router]);

  if (!hasHydrated) {
    return <PageLoader />;
  }

  if (items.length === 0) return null;

  async function onSubmit(values: ICreateOrderSchema) {
    setIsSubmitting(true);

    try {
      const response = await orderService.create(values);
      if (response.success) {
        toast.success(`Order placed! Order #${response.data.orderNumber}`);
        router.push("/dashboard/customer/orders");
        router.refresh();
        setTimeout(() => {
          clearCart();
        }, 1000);
      } else {
        form.setError("root", {
          type: "manual",
          message: response.message || "Failed to place order",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        form.setError("root", {
          type: "manual",
          message: error.response.data.message || "Failed to place order",
        });
      } else {
        form.setError("root", {
          type: "manual",
          message: "An unexpected error occurred",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl py-12 px-4">
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 rounded-full" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <CreditCardIcon /> Checkout
            </h1>
            <p className="text-slate-700 font-medium text-xl mt-1">
              Complete your shipping details
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-4 text-primary/70">
                  <MapPin className="h-5 w-5" />
                  <h2 className="font-bold text-lg text-slate-800">
                    Shipping Information
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 items-start gap-5">
                  <FormField
                    control={form.control}
                    name="shippingName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-xs font-bold text-slate-500 ml-1">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-[16px] h-4 w-4 text-slate-400" />
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-primary/40"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 md:col-span-2 items-start gap-5">
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-500 ml-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-[16px] h-4 w-4 text-slate-400" />
                          <Input
                            placeholder="email@example.com"
                            value={user?.email}
                            className="pl-10 h-12 rounded-xl border-slate-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="shippingPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-slate-500 ml-1">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-[16px] h-4 w-4 text-slate-400" />
                              <Input
                                placeholder="017XXXXXXXX"
                                {...field}
                                className="pl-10 h-12 rounded-xl border-slate-200"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 md:col-span-2 items-start gap-5">
                    <FormField
                      control={form.control}
                      name="shippingCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-slate-500 ml-1">
                            City
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HomeIcon className="absolute left-3 top-[16px] h-4 w-4 text-slate-400" />
                              <Input
                                placeholder="Dhaka"
                                {...field}
                                className="pl-10 h-12 rounded-xl border-slate-200"
                              />
                            </div>
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
                          <FormLabel className="text-xs font-bold text-slate-500 ml-1">
                            Postal Code
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Hash className="absolute left-3 top-[16px] h-4 w-4 text-slate-400" />
                              <Input
                                placeholder="1212"
                                {...field}
                                className="pl-10 h-12 rounded-xl border-slate-200"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shippingAddress"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-xs font-bold text-slate-500 ml-1">
                          Street Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Home className="absolute left-3 top-[11px] h-4 w-4 text-slate-400" />
                            <Textarea
                              placeholder="House 12, Road 5..."
                              {...field}
                              className="pl-10 h-12 rounded-xl border-slate-200"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {form.formState.errors.root ? (
                <div className="p-3 text-sm font-medium text-center text-red-600 border border-red-100 rounded-lg bg-red-50 shadow-sm shadow-red-600/90/20 flex items-center gap-2 justify-center">
                  <CircleAlert /> {form.formState.errors.root.message}
                </div>
              ) : (
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-4 items-center">
                  <ShieldCheck className="h-6 w-6 text-primary/80 shrink-0" />
                  <p className="text-[11px] text-primary/80 font-bold tracking-tight">
                    100% Secure Checkout • Genuine Medicines Only
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-14 bg-primary/60 hover:bg-primary/70 text-white rounded-xl shadow-xl shadow-primary/90/10 transition-all font-black"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing..."
                  : `Confirm Order (৳${totalPrice() + 60})`}
              </Button>
            </form>
          </Form>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-5">
          <Card className="sticky top-24 border shadow-lg shadow-muted rounded-[1rem] overflow-hidden">
            <CardContent className="px-6 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-xl text-slate-800">
                  Order Summary
                </h3>
                <ShoppingBag className="h-5 w-5 text-primary/40" />
              </div>

              <Separator className="border" />

              <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center group"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="h-12 w-12 rounded-xl bg-slate-50 p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={item.image || "/placeholder-medicine.png"}
                          alt={item.brandName}
                          width={40}
                          height={40}
                          className="object-contain mix-blend-multiply"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 line-clamp-1">
                          {item.brandName}
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-slate-700">
                      ৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-900">
                    <span className="font-extrabold">৳ </span>
                    {totalPrice()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Delivery Fee</span>
                  <span className="text-slate-900">
                    <span className="font-extrabold">৳ </span>60
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Discount</span>
                  <span className="text-emerald-500">
                    -<span className="font-extrabold">৳ </span>0
                  </span>
                </div>
              </div>

              <Separator className="border" />

              <div className="flex justify-between items-end pb-2">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-500 tracking-widest">
                    Total Amount
                  </p>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">
                    ৳ {totalPrice() + 60}
                  </p>
                </div>
              </div>

              <p className="text-[12px] text-center text-slate-400 font-medium">
                By confirming, you agree to Pharmetix Terms of Service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
