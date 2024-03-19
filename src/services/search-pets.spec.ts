import { makeOrg } from "@tests/make-org";
import { makePet } from "@tests/make-pet";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";

import {
  InMemoryOrgsRepository,
} from "@/repositories/in-memory/orgs.repository";
import {
  InMemoryPetsRepository,
} from "@/repositories/in-memory/pets.repository";
import {
  SearchPetsService,
} from "@/services/search-pets";

describe("Search Pets Use Case", () => {
  let inMemoryOrgsRepository: InMemoryOrgsRepository;
  let inMemoryPetsRepository: InMemoryPetsRepository;
  let sut: SearchPetsService;

  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrgsRepository);
    sut = new SearchPetsService(inMemoryPetsRepository);
  });

  it("should be able to search pets by city", async () => {
    const orgToBeCreated = makeOrg();
    const org = await inMemoryOrgsRepository.create({
      ...orgToBeCreated,
      passwordHash: await hash(orgToBeCreated.password, 10),
    });

    await inMemoryPetsRepository.create(makePet({ orgId: org.id }));
    await inMemoryPetsRepository.create(makePet({ orgId: org.id }));

    const orgToBeCreated2 = makeOrg();
    const org2 = await inMemoryOrgsRepository.create({
      ...orgToBeCreated2,
      passwordHash: await hash(orgToBeCreated2.password, 10),
    });

    await inMemoryPetsRepository.create(makePet({ orgId: org2.id }));

    const { pets } = await sut.execute({ city: org.city });

    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut.execute({ city: org2.city });

    expect(pets2).toHaveLength(1);
  });

  it("should be able to search pets by city and age", async () => {

    const orgToBeCreated = makeOrg();
    const org = await inMemoryOrgsRepository.create({
      ...orgToBeCreated,
      passwordHash: await hash(orgToBeCreated.password, 10),
    });

    await inMemoryPetsRepository.create(makePet({ age: 1, orgId: org.id }));
    await inMemoryPetsRepository.create(makePet({ orgId: org.id }));

    const { pets } = await sut.execute({ age: 1, city: org.city });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {

    const orgToBeCreated = makeOrg();
    const org = await inMemoryOrgsRepository.create({
      ...orgToBeCreated,
      passwordHash: await hash(orgToBeCreated.password, 10),
    });

    await inMemoryPetsRepository.create(
      makePet({ orgId: org.id, size: "SMALL" }),
    );
    await inMemoryPetsRepository.create(
      makePet({ orgId: org.id, size: "MEDIUM" }),
    );
    await inMemoryPetsRepository.create(
      makePet({ orgId: org.id, size: "LARGE" }),
    );

    const { pets } = await sut.execute({ city: org.city, size: "SMALL" });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and energyLevel", async () => {

    const orgToBeCreated = makeOrg();
    const org = await inMemoryOrgsRepository.create({
      ...orgToBeCreated,
      passwordHash: await hash(orgToBeCreated.password, 10),
    });

    await inMemoryPetsRepository.create(
      makePet({ energyLevel: "LOW", orgId: org.id }),
    );
    await inMemoryPetsRepository.create(
      makePet({ energyLevel: "MEDIUM", orgId: org.id }),
    );
    await inMemoryPetsRepository.create(
      makePet({ energyLevel: "HIGH", orgId: org.id }),
    );

    const { pets } = await sut.execute({ city: org.city, energyLevel: "LOW" });

    expect(pets).toHaveLength(1);
  });

  it(
    "should be able to search pets by city and environmentMinimumSize",
    async () => {

      const orgToBeCreated = makeOrg();
      const org = await inMemoryOrgsRepository.create({
        ...orgToBeCreated,
        passwordHash: await hash(orgToBeCreated.password, 10),
      });

      await inMemoryPetsRepository.create(
        makePet({ environmentMinimumSize: "WIDE", orgId: org.id }),
      );
      await inMemoryPetsRepository.create(
        makePet({ environmentMinimumSize: "SMALL", orgId: org.id }),
      );

      const { pets } = await sut.execute({
        city: org.city,
        environmentMinimumSize: "WIDE",
      });

      expect(pets).toHaveLength(1);
    });
});
