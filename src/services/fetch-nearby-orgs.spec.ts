import { makeOrg } from "@tests/make-org";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";

import {
  InMemoryOrgsRepository,
} from "@/repositories/in-memory/orgs.repository";

import { FetchNearbyOrgsService } from "./fetch-nearby-orgs";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let sut: FetchNearbyOrgsService;

describe("Get Pet Service", () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    sut = new FetchNearbyOrgsService(inMemoryOrgsRepository);
  });

  it("should be able to get a pet", async () => {
    const orgToBeCreated = makeOrg();
    const org = await inMemoryOrgsRepository.create({
      ...orgToBeCreated,
      passwordHash: await hash(orgToBeCreated.password, 10),
    });

    const nearbyOrgs = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    });

    expect(nearbyOrgs.orgs).toEqual([org]);
  });
});
