import { randomUUID } from "node:crypto";

import { Pet } from "@prisma/client";

import type { CreatePetInput, IPetsRepository } from "../pets.interface";
import { IFindAllData } from "../pets.interface";
import { InMemoryOrgsRepository } from "./orgs.repository";

/**
 * Implements in memory Pets repository for testing purposes.
 *
 * @class InMemoryPetsRepository
 * @implements {IPetsRepository}
 */
class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = [];

  constructor(
    private readonly orgsRepository: InMemoryOrgsRepository,
  ) { }

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

  findAll(data: IFindAllData) {
    const orgsByCity = this.orgsRepository.orgs.filter(
      (org) => org.city === data.city,
    );

    const pets = this.pets
      .filter((pet) => orgsByCity.some((org) => org.id === pet.orgId))
      .filter((pet) => !pet.wasAdopted)
      .filter((pet) => data.age ? data.age === pet.age : true)
      .filter(
        (pet) => data.energyLevel ? data.energyLevel === pet.energyLevel : true,
      )
      .filter(
        (pet) => data.environmentMinimumSize ?
          data.environmentMinimumSize === pet.environmentMinimumSize :
          true,
      )
      .filter(
        (pet) => data.independenceLevel ?
          data.independenceLevel === pet.independenceLevel :
          true,
      )
      .filter((pet) => data.size ? data.size === pet.size : true);

    return new Promise<Pet[] | []>((resolve) => resolve(pets ?? []));
  }

  findById(data: { id: string; }) {
    const pet = this.pets.find((pet) => pet.id === data.id);

    return new Promise<Pet | null>((resolve) => resolve(pet ?? null));
  }
}

export { InMemoryPetsRepository };
