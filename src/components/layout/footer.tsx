import Logo from "@/assets/logo.png";
import {
  Clock,
  DollarSign,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Truck,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8fafc] border-t border-slate-200">
      {/* 1. Value Proposition Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-slate-200 pb-12">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">100% Genuine</h4>
              <p className="text-sm text-slate-500">
                Directly from manufacturers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Fast Delivery</h4>
              <p className="text-sm text-slate-500">
                Home delivery within 24-48 hours
              </p>
            </div>
          </div>{" "}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Cash On Delivery</h4>
              <p className="text-sm text-slate-500">
                Cash on delivery accross Bangladesh
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">24/7 Support</h4>
              <p className="text-sm text-slate-500">
                Expert pharmacists ready to help
              </p>
            </div>
          </div>
        </div>

        {/* 2. Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand & Contact */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src={Logo}
                alt="Pharmetix"
                width={150}
                height={50}
                className="brightness-90 select-none"
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Your trusted online pharmacy. Providing high-quality medicines,
              healthcare products, and wellness essentials delivered safely to
              your doorstep.
            </p>
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Level 4, Health Tower, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <PhoneCall className="h-4 w-4 text-primary" />
                <span>+880 1234-567890 (9AM - 10PM)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@pharmetix.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 tracking-wide">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                "About Us",
                "Our Services",
                "Careers",
                "Latest Blogs",
                "Press Release",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-slate-500 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 tracking-wide">
              Help & Support
            </h4>
            <ul className="space-y-2">
              {["Help Center", "Track Order", "Return Policy"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-slate-500 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-slate-500 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-500 hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4 tracking-wide">
              Healthcare
            </h4>
            <ul className="space-y-2">
              {[
                "Prescription",
                "OTC Medicine",
                "Baby Care",
                "Diabetic Care",
                "Dental Care",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/medicine?category=${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-slate-500 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App & Social */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-slate-900 mb-4 tracking-wide">
              Download App
            </h4>
            <div className="flex flex-col gap-3 mb-5">
              <button className="flex items-center gap-2 bg-black justify-center text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all">
                <div className="text-left">
                  <Image
                    src={
                      "https://i.ibb.co.com/C5zGFM9M/Screenshot-2026-02-15-235120.png"
                    }
                    alt="Google Play"
                    width={130}
                    height={10}
                    className="h-[30px] mx-auto select-none w-full"
                  />
                </div>
              </button>
              <button className="flex items-center gap-2 bg-black justify-center text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all">
                <div className="text-left">
                  <Image
                    src={
                      "https://i.ibb.co.com/LqpVdXZ/Screenshot-2026-02-15-235246.png"
                    }
                    alt="Google Play"
                    width={110}
                    height={30}
                    className="h-[30px] mx-auto select-none w-full"
                  />
                </div>
              </button>
            </div>
            <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-pink-600 hover:border-pink-600 transition-all"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-600 transition-all"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} <strong>Pharmetix</strong>. All rights reserved.
            Managed by Pharmetix Healthcare Ltd.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-xs text-slate-500 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-slate-500 hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/cookie-policy"
                className="text-xs text-slate-500 hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
