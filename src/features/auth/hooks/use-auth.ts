import { useSession } from "@/lib/auth-client";

export const useAuth = () => {
  const session = useSession();

  return {
    ...session,
    isAuthenticated: !!session.data?.session,
    user: session.data?.user,
    isLoading: session.isPending,
  };
};
