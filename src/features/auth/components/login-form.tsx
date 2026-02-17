"use client";

import Logo from "@/assets/logo.png";
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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleAlert,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Store,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../schemas/auth.schema";
export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const quickLogin = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "password123");
  };

  async function onSubmit(values: LoginSchema) {
    setIsLoading(true);

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);

          form.setError("root", { message: ctx.error.message });
        },
      },
    );
  }

  return (
    <div className="w-full max-w-[400px] mx-auto overflow-hidden">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-4 space-y-0">
        <div className="w-[150px] h-auto select-none">
          <Image src={Logo} alt="Logo" width={1080} height={720} />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-slate-600">
            Access your medical dashboard
          </p>
        </div>
      </div>

      <div className="p-1">
        <div className="mt-1 p-6 bg-white shadow-lg shadow-muted rounded-[1.4rem]">
          {/* Quick Login Section */}
          <div className="mb-6 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
              Quick Login{" "}
              <span className="text-[10px] font-normal">
                (For exploration purpose)
              </span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => quickLogin("customer@pharmetix.com")}
                className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all gap-1 group"
              >
                <User className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary">
                  Customer
                </span>
              </button>
              <button
                type="button"
                onClick={() => quickLogin("seller@pharmetix.com")}
                className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all gap-1 group"
              >
                <Store className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary">
                  Seller
                </span>
              </button>
              <button
                type="button"
                onClick={() => quickLogin("admin@pharmetix.com")}
                className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all gap-1 group"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary">
                  Admin
                </span>
              </button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute w-4 h-4 left-3 top-[11px] text-slate-400" />
                        <Input
                          placeholder="name@pharmetix.com"
                          className="pl-10 border-slate-200 focus:border-primary/50 focus:ring-primary/50 rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-slate-700">Password</FormLabel>
                      <Link
                        href="/auth/forgot-password"
                        className="text-xs font-bold text-primary/60 hover:text-primary/70"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="absolute w-4 h-4 left-3 top-[11px] text-slate-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 border-slate-200 focus:border-primary/50 focus:ring-primary/50 rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Root Error Message */}
              {form.formState.errors.root && (
                <div className="p-3 text-sm font-medium text-center text-red-600 border border-red-100 rounded-lg bg-red-50 shadow-sm shadow-red-600/90/20 flex items-center gap-2 justify-center">
                  <CircleAlert /> {form.formState.errors.root.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-primary/60 hover:bg-primary/70 text-white rounded-xl shadow-lg shadow-primary/90/10 transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-slate-500">
              New to Pharmetix?{" "}
              <Link
                href="/auth/register"
                className="font-bold text-primary/60 hover:underline decoration-2 underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
