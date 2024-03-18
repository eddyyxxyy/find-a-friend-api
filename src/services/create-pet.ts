import { randomUUID } from "node:crypto";

import type { Pet } from "@prisma/client";

import type { IOrgsRepository } from "@/repositories/orgs.interface";
import type { IPetsRepository } from "@/repositories/pets.interface";

import { OrgDoesntExistError } from "./errors/org-doesnt-exist-error";

export interface ICreatePetServiceRequest {
  data: {
    about: string,
    age: number,
    energyLevel: "HIGH" | "LOW" | "MEDIUM",
    environmentMinimumSize: "MEDIUM" | "SMALL" | "WIDE" | "XWIDE",
    independenceLevel: "HIGH" | "LOW" | "MEDIUM",
    name: string,
    orgId: string,
    size: "HUGE" | "LARGE" | "MEDIUM" | "SMALL",
  },
}

interface ICreatePetServiceResponse {
  pet: Pet,
}

class CreatePetService {
  constructor(
    private readonly orgsRepository: IOrgsRepository,
    private readonly petsRepository: IPetsRepository,
  ) { }

  async execute({
    data: {
      about,
      age,
      energyLevel,
      environmentMinimumSize,
      independenceLevel,
      name,
      orgId,
      size,
    },
  }: ICreatePetServiceRequest): Promise<ICreatePetServiceResponse> {
    const org = await this.orgsRepository.findById({ id: orgId });

    if (!org) {
      throw new OrgDoesntExistError();
    }

    const pet = await this.petsRepository.create({
      about,
      age,
      energyLevel,
      environmentMinimumSize,
      id: randomUUID(),
      independenceLevel,
      name,
      orgId,
      size,
      wasAdopted: false,
    });

    return { pet };
  }
}

export { CreatePetService };
