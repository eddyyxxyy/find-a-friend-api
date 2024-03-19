import type { Pet } from "@prisma/client";
import {
  TEnergyAndIndependenceLevels,
  TEnvironmentMinimumSize,
  TSizes,
} from "@tests/make-pet";

import { IPetsRepository } from "@/repositories/pets.interface";

interface ISearchPetsServiceRequest {
  age?: number,
  city: string,
  energyLevel?: TEnergyAndIndependenceLevels,
  environmentMinimumSize?: TEnvironmentMinimumSize,
  independenceLevel?: TEnergyAndIndependenceLevels,
  size?: TSizes,
}

interface ISearchPetsServiceResponse {
  pets: Pet[],
}

class SearchPetsService {
  constructor(
    private readonly petsRepository: IPetsRepository,
  ) { }

  async execute(
    data: ISearchPetsServiceRequest,
  ): Promise<ISearchPetsServiceResponse> {
    const pets = await this.petsRepository.findAll(data);

    return { pets };
  }
}

export { SearchPetsService };
