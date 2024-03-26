import { prisma } from "@/lib/prisma";

import { FindManyNearbyParams, IOrgsRepository } from "../orgs.interface";
import { Org, Prisma } from ".prisma/client";

class PrismaOrgsRepository implements IOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data });

    return org;
  }

  async findByEmail(data: { email: string; }) {
    const org = await prisma.org.findUnique({
      where: {
        email: data.email,
      },
    });

    return org;
  }

  async findById(data: { id: string; }) {
    const org = await prisma.org.findUnique({
      where: {
        id: data.id,
      },
    });

    return org;
  }

  async findManyNearby(data: FindManyNearbyParams) {
    const orgs = await prisma.$queryRaw<Org[]>`
      SELECT * FROM orgs
      WHERE ( 6371 * acos( cos( radians(${data.latitude}) ) *
      cos( radians( latitude ) ) *
      cos( radians( longitude ) -
      radians(${data.longitude}) ) +
      sin( radians(${data.latitude}) )
      * sin( radians( latitude ) ) ) ) <= 10
    `;

    return orgs;
  }
}

export { PrismaOrgsRepository };
