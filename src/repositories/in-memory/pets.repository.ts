import { randomUUID } from "node:crypto";

import { Pet } from "@prisma/client";

import type { CreatePetInput, IPetsRepository } from "../pets.interface";

/**
 * Implements in memory Pets repository for testing purposes.
 *
 * @class InMemoryPetsRepository
 * @implements {IPetsRepository}
 */
class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = [];

  create(data: CreatePetInput) {
    const pet: Pet = {
      ...data,
      id: randomUUID(),
      orgId: data.orgId,
      wasAdopted: false,
    };

    this.pets.push(pet);

    return new Promise<Pet>((resolve) => resolve(pet));
  }
}

export { InMemoryPetsRepository };
