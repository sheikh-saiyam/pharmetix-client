import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),

  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_IMGBB_API_KEY: z.string(),
});

const result = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_IMGBB_API_KEY: process.env.NEXT_PUBLIC_IMGBB_API_KEY,
});

if (!result.success) {
  console.error("❌ Invalid environment variables", result.error.flatten());
  throw new Error("Invalid environment variables");
}

export const env = result.data;
