import { Org } from "@prisma/client";

import { IOrgsRepository } from "@/repositories/orgs.interface";

interface IFetchNearbyOrgsServiceRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyOrgsServiceResponse {
  orgs: Org[];
}

class FetchNearbyOrgsService {
  constructor(
    private orgsRepository: IOrgsRepository,
  ) { }

  async execute(
    data: IFetchNearbyOrgsServiceRequest,
  ): Promise<IFetchNearbyOrgsServiceResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: data.userLatitude,
      longitude: data.userLongitude,
    });

    return { orgs };
  }
}

export { FetchNearbyOrgsService };
