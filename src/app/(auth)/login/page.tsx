import LoginForm from "@/features/auth/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Pharmetix",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-4">
      <LoginForm />
    </div>
  );
}
