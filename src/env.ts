import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  APP_COOKIE_SECRET: z.string(),
  APP_HOST: z.string().default("127.0.0.1"),
  APP_JWT_SECRET: z.string(),
  APP_PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables.\n", _env.error.format());
  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
