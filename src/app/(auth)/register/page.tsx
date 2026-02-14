import RegisterForm from "@/features/auth/components/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Pharmetix",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-4">
      <RegisterForm />
    </div>
  );
}
