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

import { PetNotFoundError } from "./errors/pet-not-found-error";
import { GetPetService } from "./get-pet";

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryOrgsRepository: InMemoryOrgsRepository;
let sut: GetPetService;

describe("Get Pet Service", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    sut = new GetPetService(inMemoryPetsRepository);
  });

  it("should be able to get a pet", async () => {
    const orgToBeCreated = makeOrg();
    const org = await inMemoryOrgsRepository.create({
      ...orgToBeCreated,
      passwordHash: await hash(orgToBeCreated.password, 10),
    });

    const petToBeCreated = makePet({ orgId: org.id });
    const pet = await inMemoryPetsRepository.create({
      ...petToBeCreated,
      orgId: petToBeCreated.id,
    });

    const result = await sut.execute({
      id: pet.id,
    });

    expect(result).toEqual(expect.objectContaining({ pet }));
  });

  it("shouldn't be able to get a pet with wrong id", async () => {
    await expect(() => sut.execute({
      id: "non-existent-id",
    })).rejects.toBeInstanceOf(PetNotFoundError);
  });
});
