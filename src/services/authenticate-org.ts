import type { Org } from "@prisma/client";
import { compare } from "bcrypt";

import type { IOrgsRepository } from "@/repositories/orgs.interface";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface IAuthenticateOrgServiceRequest {
  data: {
    email: string,
    password: string,
  }
}

interface IAuthenticateOrgServiceResponse {
  org: Org;
}

class AuthenticateOrgService {
  constructor(private readonly orgsRepository: IOrgsRepository) { }

  async execute(
    { data: { email, password } }: IAuthenticateOrgServiceRequest,
  ): Promise<IAuthenticateOrgServiceResponse> {
    const org = await this.orgsRepository.findByEmail({ email });

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.passwordHash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}

export { AuthenticateOrgService };
