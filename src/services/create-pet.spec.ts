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

import { CreatePetService } from "./create-pet";
import { OrgDoesntExistError } from "./errors/org-doesnt-exist-error";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: CreatePetService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrgsRepository);
    sut = new CreatePetService(inMemoryOrgsRepository, inMemoryPetsRepository);
  });

  it("should be able to create a pet", async () => {
    const orgTobeCreate = makeOrg();

    const { id: orgId } = await inMemoryOrgsRepository.create({
      ...orgTobeCreate,
      passwordHash: await hash(
        orgTobeCreate.password,
        10,
      ),
    });

    const petToBeCreated = makePet({ orgId });

    const { pet: createdPet } = await sut.execute({
      data: {
        about: petToBeCreated.about,
        age: petToBeCreated.age,
        energyLevel: petToBeCreated.energyLevel,
        environmentMinimumSize: petToBeCreated.environmentMinimumSize,
        independenceLevel: petToBeCreated.independenceLevel,
        name: petToBeCreated.name,
        orgId,
        size: petToBeCreated.size,
      },
    });

    expect(createdPet.id).toEqual(expect.any(String));
  });

  it("should not be able to create a pet with invalid org id", async () => {
    const petToBeCreated = makePet();

    await expect(() => sut.execute({
      data: {
        about: petToBeCreated.about,
        age: petToBeCreated.age,
        energyLevel: petToBeCreated.energyLevel,
        environmentMinimumSize: petToBeCreated.environmentMinimumSize,
        independenceLevel: petToBeCreated.independenceLevel,
        name: petToBeCreated.name,
        orgId: "invalid-org-id",
        size: petToBeCreated.size,
      },
    })).rejects.toBeInstanceOf(OrgDoesntExistError);
  });
});
