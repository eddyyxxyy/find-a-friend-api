import type { Org } from "@prisma/client";
import { hash } from "bcrypt";

import type { IOrgsRepository } from "@/repositories/orgs.interface";

import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface ICreateOrgServiceRequest {
  data: {
    city: string,
    email: string,
    latitude: number,
    longitude: number,
    name: string,
    ownersName: string,
    password: string,
    state: string,
    street: string,
    whatsappNumber: string,
    zipCode: string,
  }
}

interface ICreateOrgServiceResponse {
  org: Org;
}

class CreateOrgService {
  constructor(private readonly orgsRepository: IOrgsRepository) { }

  /**
   * Executes `IOrgsRepository` methods to create Organizations.
   *
   * @param data Organization data to be registered
   * @returns {Org} A Promise that resolves to the newly created `Org` object.
   */
  async execute(
    {
      data: {
        city,
        email,
        latitude,
        longitude,
        name,
        ownersName,
        password,
        state,
        street,
        whatsappNumber,
        zipCode,
      },
    }: ICreateOrgServiceRequest,
  ): Promise<ICreateOrgServiceResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(
      { email },
    );

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 10);

    const org = await this.orgsRepository.create({
      city,
      email,
      latitude,
      longitude,
      name,
      ownersName,
      passwordHash,
      state,
      street,
      whatsappNumber,
      zipCode,
    });

    return { org };
  }
}

export { CreateOrgService };
