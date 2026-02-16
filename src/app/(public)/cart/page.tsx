"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart.store";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto min-h-[70vh] flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-primary/50" />
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-2">
          Your cart is empty
        </h1>
        <p className="text-slate-500 max-w-[300px] mb-8 font-medium">
          Looks like you haven&apos;t added any medicines to your prescription
          list yet.
        </p>
        <Button
          asChild
          className="rounded-full px-8 bg-primary/60 hover:bg-primary/70 shadow-lg shadow-primary/90/10"
        >
          <Link href="/medicines">Browse Medicines</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="relative pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 rounded-full" />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShoppingBag /> Your Cart
          </h1>
          <p className="text-slate-700 font-medium text-xl mt-1">
            {items.length}{" "}
            {items.length === 1 ? "Medicine Item" : "Medicine Items"} in your
            list
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={clearCart}
          className="text-slate-600 hover:text-rose-500 bg-secondary hover:bg-red-50 font-bold text-xs uppercase tracking-tighter transition-colors"
        >
          Clear all items
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Item List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col sm:flex-row items-center gap-6 p-4 rounded-3xl border shadow-sm shadow-muted transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-28 w-28 bg-slate-50 rounded-2xl overflow-hidden shrink-0 p-2">
                <Image
                  src={item.image || "/placeholder-medicine.png"}
                  alt={item.brandName}
                  fill
                  className="object-contain p-2 mix-blend-multiply"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                      {item.manufacturer || "Generic Provider"}
                    </p>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">
                      {item.brandName}
                    </h3>
                    <p className="text-xs italic text-slate-400">
                      {item.genericName} • {item.strength}
                    </p>
                  </div>
                  <p className="font-black text-slate-900 text-lg">
                    ৳{item.price * item.quantity}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  {/* Modern Quantity Controller */}
                  <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white hover:shadow-sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center text-xs font-bold text-slate-700">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white hover:shadow-sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= (item.stockQuantity || 100)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors rounded-full"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-0.5" />
                    <span className="text-[11px] mt-0.5 font-bold tracking-wider">
                      Remove
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary/60 mt-4 hover:bg-primary/50 hover:text-white rounded-full px-6 py-2 duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24 border shadow-lg shadow-muted rounded-[1rem] overflow-hidden">
            <CardContent className="px-6 space-y-4 bg-white">
              <h3 className="font-black text-xl text-slate-700">
                Cart Summary
              </h3>
              <Separator className="border" />

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

              <Button
                className="w-full h-14 bg-primary/60 hover:bg-primary/70 text-white rounded-2xl shadow-xl shadow-primary/90/10 transition-all active:scale-[0.98] font-bold"
                size="lg"
                asChild
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <p className="text-[12px] text-center text-slate-400 font-medium">
                Tax calculated at checkout where applicable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
