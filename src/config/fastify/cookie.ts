import { FastifyCookieOptions } from "@fastify/cookie";

import { env } from "@/env";

const cookieConfigs: FastifyCookieOptions = {
  parseOptions: {
    httpOnly: true,
    maxAge: 1800, // 30 minutes
    path: "/",
    sameSite: "strict",
    secure: true,
  },
  secret: env.APP_COOKIE_SECRET,
};

export { cookieConfigs };
