import { FastifyJWTOptions } from "@fastify/jwt";

import { env } from "@/env";

const jwtConfigs: FastifyJWTOptions = {
  cookie: {
    cookieName: "@find-a-friend:0.0.1:refreshToken",
    signed: true,
  },
  secret: env.APP_JWT_SECRET,
  sign: {
    expiresIn: "1h",
  },
};
export { jwtConfigs };
