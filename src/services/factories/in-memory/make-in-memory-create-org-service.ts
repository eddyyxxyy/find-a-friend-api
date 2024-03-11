import {
  InMemoryOrgsRepository,
} from "@/repositories/in-memory/orgs.repository";

import { CreateOrgService } from "../../create-org";

function makeCreateOrgService() {
  const inMemoryOrgsRepository = new InMemoryOrgsRepository();
  const createOrgService = new CreateOrgService(inMemoryOrgsRepository);

  return createOrgService;
}

export { makeCreateOrgService };
