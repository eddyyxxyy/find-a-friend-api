import fastifyCookie from "@fastify/cookie";
import fastifyHelmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";

import { globalErrorHandler } from "@/http/middlewares/global-error-handler";

import { cookieConfigs } from "./config/fastify/cookie";
import { helmetConfigs } from "./config/fastify/helmet";
import { jwtConfigs } from "./config/fastify/jwt";
import { rateLimitConfigs } from "./config/fastify/rate-limit";
import { swaggerConfigs } from "./config/fastify/swagger";
import { swaggerUiConfigs } from "./config/fastify/swagger-ui";
import { orgsRoutes } from "./http/controllers/orgs/orgs.routes";

const app = fastify();

void app.register(fastifyHelmet, helmetConfigs);

void app.register(fastifyCookie, cookieConfigs);

void app.register(fastifyRateLimit, rateLimitConfigs);

void app.register(fastifyJwt, jwtConfigs);

void app.register(fastifySwagger, swaggerConfigs);

void app.register(fastifySwaggerUi, swaggerUiConfigs);

app.setErrorHandler(globalErrorHandler);

void app.register(orgsRoutes);

export { app };
