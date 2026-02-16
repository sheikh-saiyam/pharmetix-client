"use client";

import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { IUser, UserRole } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Camera, Mail, ShieldCheck, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IProfileFormValues, profileSchema } from "../schema/profile.schema";
import { ChangePasswordDialog } from "./change-password-dialog";

interface ProfileFormProps {
  user: IUser;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage] = useState<string | null>(user.image || null);

  const form = useForm<IProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      image: user.image || "",
    },
  });

  async function onSubmit(data: IProfileFormValues) {
    setIsLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: data.name,
      });
      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }
      router.refresh();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* Header & Avatar */}
          <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-slate-200" />
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 bg-primary/60 hover:bg-primary/70 text-white p-2 rounded-full shadow-md transition-transform active:scale-90"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div className="text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h2 className="text-2xl font-black text-slate-800">
                    {user.name}
                  </h2>
                  <Badge
                    className={cn(
                      "rounded-full mt-1.5 px-3 py-0.5 font-bold text-[10px] tracking-widest border-none",
                      user.role === UserRole.ADMIN
                        ? "bg-rose-500 text-white"
                        : user.role === UserRole.SELLER
                          ? "bg-amber-500 text-white"
                          : "bg-primary/60 text-white",
                    )}
                  >
                    {user.role}
                  </Badge>
                  {user.status === "ACTIVE" && (
                    <Badge
                      variant="outline"
                      className="mt-1.5 rounded-full border-emerald-200 text-emerald-600 bg-emerald-50 text-[10px] font-bold"
                    >
                      ACTIVE
                    </Badge>
                  )}
                </div>
                <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4" /> {user.email}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel className="text-xs font-bold text-slate-600 ml-1 tracking-widest">
                  Account ID
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="h-5 w-5 text-slate-600" />
                    <span className="text-sm font-bold text-slate-600">
                      {user.id}
                    </span>
                  </div>
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel className="text-xs font-bold text-slate-600 ml-1">
                  Member Since
                </FormLabel>
                <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <CalendarDays className="h-5 w-5 text-slate-600" />
                  <span className="text-sm font-bold text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </FormItem>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-slate-700 ml-1 tracking-widest">
                    Full Name <span className="text-[10px]">(editable)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-[18px] h-5 w-5 text-slate-600" />
                      <Input
                        {...field}
                        className="pl-12 h-14 rounded-xl border-slate-200 focus:ring-primary/40"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="opacity-50" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
            <ChangePasswordDialog />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto h-12 px-10 bg-primary/60 hover:bg-primary/70 text-white rounded-2xl shadow-xl shadow-primary/90/10 transition-all font-black text-xs"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
