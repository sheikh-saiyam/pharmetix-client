import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pill } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-linear-to-r from-teal-500 to-emerald-600 text-white shadow-lg">
      <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm w-fit">
            <Pill className="mr-2 h-4 w-4" />
            <span>Trusted by 1 Million+ Customers</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Your Health, <br className="hidden sm:inline" />
            Delivered to Your Doorstep.
          </h1>
          <p className="max-w-[600px] text-teal-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Order medicines, healthcare products, and more from the comfort of
            your home. Fast delivery, genuine products, and great discounts.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="font-semibold text-teal-700 hover:bg-white/90"
            >
              <Link href="/medicines">
                Order Medicines <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/upload-prescription">Upload Prescription</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
    </section>
  );
}
