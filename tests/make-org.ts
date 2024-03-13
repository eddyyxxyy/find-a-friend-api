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

/**
* Creates an organization object with default values for testing purposes
*
* @returns {Org} An `Org` object
*/
function makeOrg(): Org {
  return {
    city: "Franca",
    email: "testowner@email.com",
    latitude: -20.5936743,
    longitude: -47.5889768,
    name: "Test Org",
    ownersName: "Test Owner",
    password: "123456",
    state: "São Paulo",
    street: "Test Street",
    whatsappNumber: "5511991234567",
    zipCode: "12345678",
  };
}

export { makeOrg };
