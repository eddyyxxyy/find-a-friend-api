import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { env } from "@/env";

export function globalErrorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({
        issues: error.format(),
        message: "Validation error",
      });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error" });
}
