import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://pharmetix-client.vercel.app",
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: true },
        status: { type: "string", required: true },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
