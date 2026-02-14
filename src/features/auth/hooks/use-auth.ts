import { authClient } from "@/lib/auth-client";

export const { useSession, useListSessions, useActiveOrganization } =
  authClient;

export const useAuth = () => {
  const session = useSession();

  return {
    ...session,
    isAuthenticated: !!session.data?.session,
    user: session.data?.user,
    isLoading: session.isPending,
  };
};
