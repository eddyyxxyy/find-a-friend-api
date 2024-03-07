import { FastifyRateLimitOptions } from "@fastify/rate-limit";

const rateLimitConfigs: FastifyRateLimitOptions = {
  max: 2000, // 2000 request per hour
  timeWindow: 60 * 60 * 1000, // 1 hour
};

export { rateLimitConfigs };
