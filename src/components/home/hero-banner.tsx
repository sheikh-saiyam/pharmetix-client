"use client";

import { ShieldCheck, ShoppingBag, Truck, Wallet } from "lucide-react";
import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="relative w-full bg-white pt-6 pb-12">
      <div className="container mx-auto">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Clean Typography */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
              <span className="h-px w-8 bg-primary" />
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                Trusted Healthcare
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 leading-[1.15]">
                Essential wellness <br />
                <span className="text-slate-800 font-normal italic">
                  delivered to your home.
                </span>
              </h1>
              <p className="text-slate-600 font-medium text-lg max-w-lg leading-relaxed mx-auto lg:mx-0">
                A simple way to shop genuine OTC medicines and healthcare
                essentials.{" "}
                <span className="text-primary font-medium italic">
                  {" "}
                  Pay only when you receive your order.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200/80">
                <Wallet className="h-4 w-4 text-slate-700" />
                <span className="text-sm font-medium text-slate-600">
                  Cash on Delivery
                </span>
              </div>
            </div>

            {/* Subtle Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 pt-10 max-w-2xl">
              {/* Genuine Products */}
              <div className="group flex items-center gap-4 transition-all duration-300">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 leading-tight">
                    Genuine
                  </span>
                  <span className="text-[12px] text-slate-500 uppercase tracking-tight">
                    Products
                  </span>
                </div>
              </div>

              {/* Fast Shipping */}
              <div className="group flex items-center gap-4 transition-all duration-300">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 leading-tight">
                    Fast
                  </span>
                  <span className="text-[12px] text-slate-500 uppercase tracking-tight">
                    Shipping
                  </span>
                </div>
              </div>

              {/* 5k+ Essentials */}
              <div className="group flex items-center gap-4 transition-all duration-300">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 leading-tight">
                    5k+
                  </span>
                  <span className="text-[12px] text-slate-500 uppercase tracking-tight">
                    Essentials
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Minimal Imagery */}
          <div className="flex-1 relative w-full max-w-[500px]">
            <div className="relative aspect-square rounded-[3rem] bg-slate- overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop"
                alt="Healthcare Excellence"
                className="w-full h-full object-cover opacity-90 select-none"
                width={1024}
                height={720}
              />

              {/* Top Left Floating Card */}
              <div className="absolute top-6 left-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-700">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                      Quality
                    </p>
                    <p className="text-xs font-semibold text-slate-900">
                      100% Genuine
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Right Floating Card */}
              <div className="absolute bottom-6 right-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-700">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                      Shipping
                    </p>
                    <p className="text-xs font-semibold text-slate-900">
                      Cash on Delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Soft Circle */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-slate-100/50 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
