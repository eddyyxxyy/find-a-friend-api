import { randomUUID } from "node:crypto";

import { Org, Prisma } from "@prisma/client";

import {
  getDistanceBetweenCoordinates,
} from "@/utils/get-distance-between-coordinates";

import type { FindManyNearbyParams, IOrgsRepository } from "../orgs.interface";

/**
 * Implements in memory Organization repository for testing purposes.
 *
 * @class InMemoryOrgsRepository
 * @implements {IOrgsRepository}
 */
class InMemoryOrgsRepository implements IOrgsRepository {
  public orgs: Org[] = [];

  create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      ...data,
      id: data.id ? data.id : randomUUID(),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.orgs.push(org);

    return new Promise<Org>((resolve) => resolve(org));
  }

  findByEmail(data: { email: string }) {
    const org = this.orgs.find((org) => org.email === data.email);

    return new Promise<Org | null>((resolve) => resolve(org ?? null));
  }

  findById(data: { id: string }) {
    const org = this.orgs.find((org) => org.id === data.id);

    return new Promise<Org | null>((resolve) => resolve(org ?? null));
  }

  findManyNearby(data: FindManyNearbyParams) {
    const orgs = this.orgs.filter((org) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: data.latitude, longitude: data.longitude },
        {
          latitude: org.latitude.toNumber(),
          longitude: org.longitude.toNumber(),
        },
      );

      return distance < 10;
    });

    return new Promise<Org[]>((resolve) => resolve(orgs));
  }
}

export { InMemoryOrgsRepository };
