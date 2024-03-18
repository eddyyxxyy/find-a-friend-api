import { faker } from "@faker-js/faker";

interface Org {
  city: string;
  email: string;
  latitude: number;
  longitude: number;
  name: string;
  ownersName: string;
  password: string;
  state: string;
  street: string;
  whatsappNumber: string;
  zipCode: string;
}

type Overwrite = {
  password?: string;
}

/**
* Creates an organization object with random values for testing purposes
*
* @returns {Org} An `Org` object
*/
function makeOrg(overwrite?: Overwrite): Org {
  return {
    city: faker.location.city(),
    email: faker.internet.email(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    name: faker.company.name(),
    ownersName: faker.person.fullName(),
    password: overwrite?.password ?? faker.internet.password(),
    state: faker.location.state(),
    street: faker.location.streetAddress(),
    whatsappNumber: faker.phone.number(),
    zipCode: faker.location.zipCode(),
  };
}

export { makeOrg };
