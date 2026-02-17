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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleAlert,
  Loader2,
  LockKeyhole,
  Mail,
  Store,
  User,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  RegisterSchema,
  UserRole,
} from "../schemas/auth.schema";
import { ImageUploadField } from "@/components/form/image-upload-field";
import { toast } from "sonner";
import { UserStatus } from "@/types/user.type";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.CUSTOMER,
      image: "",
    },
  });

  async function onSubmit(values: RegisterSchema) {
    setIsLoading(true);

    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        role: values.role,
        image: values.image,
        status: UserStatus.ACTIVE,
      },
      {
        onSuccess: () => {
          router.refresh();

          toast.success("Registration successfully completed 🎉", {
            description: "Welcome to Pharmetix!",
            duration: 4000,
          });
          if (values.role === UserRole.CUSTOMER) {
            router.push("/customer");
          } else {
            router.push("/dashboard/seller");
          }
        },
        onError: (ctx) => {
          setIsLoading(false);
          form.setError("root", { message: ctx.error.message });
        },
      },
    );
  }

  return (
    <div className="w-full max-w-[450px] mx-auto overflow-hidden">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-[150px] h-auto select-none">
          <Image src={Logo} alt="Logo" width={1080} height={720} />
        </div>
        <p className="text-lg font-medium text-slate-600">
          Join the Pharmetix network
        </p>
      </div>

      <div className="p-1">
        <div className="mt-1 p-6 bg-white shadow-lg shadow-muted rounded-[1.4rem]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Visual Role Selection */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-slate-700 font-semibold">
                      I want to join as a
                    </FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => field.onChange(UserRole.CUSTOMER)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-2",
                          field.value === UserRole.CUSTOMER
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-slate-100 hover:border-slate-200 bg-slate-50/50",
                        )}
                      >
                        <UserCircle
                          className={cn(
                            "w-6 h-6",
                            field.value === UserRole.CUSTOMER
                              ? "text-primary"
                              : "text-slate-400",
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-bold",
                            field.value === UserRole.CUSTOMER
                              ? "text-primary"
                              : "text-slate-500",
                          )}
                        >
                          Customer
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => field.onChange(UserRole.SELLER)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-2",
                          field.value === UserRole.SELLER
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-slate-100 hover:border-slate-200 bg-slate-50/50",
                        )}
                      >
                        <Store
                          className={cn(
                            "w-6 h-6",
                            field.value === UserRole.SELLER
                              ? "text-primary"
                              : "text-slate-400",
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-bold",
                            field.value === UserRole.SELLER
                              ? "text-primary"
                              : "text-slate-500",
                          )}
                        >
                          Seller
                        </span>
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ImageUploadField
                control={form.control}
                name="image"
                label="Profile Picture"
                previewClassName="rounded-full w-[150px] h-[150px]"
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute w-4 h-4 left-3 top-[11px] text-slate-400" />
                        <Input
                          placeholder="John Doe"
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
                    <FormLabel className="text-slate-700">Password</FormLabel>
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
                className="w-full h-11 bg-primary/60 hover:bg-primary/70 text-white rounded-xl shadow-lg shadow-primary/90/10 transition-all active:scale-[0.98] mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-slate-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-bold text-primary/60 hover:underline decoration-2 underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
