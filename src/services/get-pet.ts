import type { Pet } from "@prisma/client";

import type { IPetsRepository } from "@/repositories/pets.interface";

import { PetNotFoundError } from "./errors/pet-not-found-error";

interface IGetPetServiceRequest {
  id: string,
}

interface IGetPetServiceResponse {
  pet: Pet,
}

class GetPetService {
  constructor(
    private readonly petsRepository: IPetsRepository,
  ) { }

  async execute(
    { id }: IGetPetServiceRequest,
  ): Promise<IGetPetServiceResponse> {
    const pet = await this.petsRepository.findById({ id });

    if (!pet) {
      throw new PetNotFoundError();
    }

    return { pet };
  }
}

export { GetPetService };
