import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';

export type TSizes = "SMALL" | "MEDIUM" | "LARGE" | "HUGE";
export type TEnergyAndIndependenceLevels = "LOW" | "MEDIUM" | "HIGH";
export type TEnvironmentMinimumSize = "SMALL" | "MEDIUM" | "WIDE" | "XWIDE";

interface Pet {
  id: string;
  name: string;
  about: string;
  age: number;
  size: TSizes;
  energyLevel: TEnergyAndIndependenceLevels;
  independenceLevel: TEnergyAndIndependenceLevels;
  environmentMinimumSize: TEnvironmentMinimumSize;
  wasAdopted: boolean;
  orgId: string;
}

type Overwrite = {
  age?: number;
  energyLevel?: TEnergyAndIndependenceLevels;
  environmentMinimumSize?: TEnvironmentMinimumSize;
  independenceLevel?: TEnergyAndIndependenceLevels;
  orgId?: string;
  size?: TSizes;
}

/**
* Creates an pet object with default values for testing purposes
*
* @returns {Pet} An `Pet` object
*/
function makePet(
  overwrite?: Overwrite
): Pet {
  return {
    id: randomUUID(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? 2,
    energyLevel: overwrite?.energyLevel ?? faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    environmentMinimumSize: overwrite?.environmentMinimumSize ?? faker.helpers.arrayElement(["SMALL", "MEDIUM", "WIDE", "XWIDE"]),
    independenceLevel: overwrite?.independenceLevel ?? faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    name: faker.animal.dog(),
    orgId: overwrite?.orgId ?? randomUUID(),
    size: overwrite?.size ?? faker.helpers.arrayElement(["SMALL", "MEDIUM", "LARGE", "HUGE"]),
    wasAdopted: false,
  };
}

export { makePet };
