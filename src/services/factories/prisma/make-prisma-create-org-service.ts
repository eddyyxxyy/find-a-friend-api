

import { PrismaOrgsRepository } from "@/repositories/prisma/orgs.repository";

import { CreateOrgService } from "../../create-org";

function makeCreateOrgService() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const createOrgService = new CreateOrgService(prismaOrgsRepository);

  return createOrgService;
}

export { makeCreateOrgService };
