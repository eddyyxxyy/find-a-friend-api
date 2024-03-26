
import { FastifyInstance } from "fastify";

import { createOrgController } from "./create-org.controller";

async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController);
}

export { orgsRoutes };
