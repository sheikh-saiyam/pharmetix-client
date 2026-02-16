"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  changePasswordSchema,
  IChangePasswordSchema,
} from "@/features/auth/schemas/change-password.schema";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  CircleAlert,
  KeyRound,
  Loader2,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ChangePasswordDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<IChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      revokeOtherSessions: true,
    },
  });

  async function onSubmit(data: IChangePasswordSchema) {
    setIsLoading(true);
    try {
      const { error, data: res } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: data.revokeOtherSessions,
      });

      if (error) {
        form.setError("root", {
          message: error.message || "Failed to change password",
        });
        return;
      }

      if (res.token) {
        toast.success("Password changed successfully");
        form.reset();
        setOpen(false);
      }
    } catch {
      form.setError("root", {
        message: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto h-12 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 gap-2"
        >
          <KeyRound className="h-4 w-4" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 bg-primary/10 rounded-full">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            Change Password
          </DialogTitle>
          <DialogDescription>
            Enter your current password and a new password to update your
            account security.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSubmit(form.getValues());
            }}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="rounded-xl px-4 h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="rounded-xl px-4 h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="rounded-xl px-4 h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="revokeOtherSessions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-xl border p-4 shadow-sm bg-slate-50/50">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sign out from other devices</FormLabel>
                    <FormDescription>
                      Secure your account by ending other sessions.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Root Error Message */}
            {form.formState.errors.root && (
              <div className="p-3 text-sm font-medium text-center text-red-600 border border-red-100 rounded-lg bg-red-50 shadow-sm shadow-red-600/90/20 flex items-center gap-2 justify-center">
                <CircleAlert /> {form.formState.errors.root.message}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl h-11 shadow-lg shadow-primary/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
