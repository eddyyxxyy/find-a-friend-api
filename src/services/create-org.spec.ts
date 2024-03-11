import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";

import { CreateOrgService } from "./create-org";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import {
  makeCreateOrgService,
} from "./factories/in-memory/make-in-memory-create-org-service";

let sut: CreateOrgService;

describe("Create Org Service", () => {
  beforeEach(() => {
    sut = makeCreateOrgService();
  });

  it("should be able to create org", async () => {
    const org = {
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

    const { org: createdOrg } = await sut.execute({ data: org });

    expect(createdOrg.id).toEqual(expect.any(String));
  });

  it("should be hash password when creating an org", async () => {
    const org = {
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

    const { org: { passwordHash } } = await sut.execute({ data: org });

    const isPasswordHashed = await compare("123456", passwordHash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to create org with same email", async () => {
    const org = {
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

    await sut.execute({ data: org });

    await expect(() => sut.execute({ data: org }))
      .rejects
      .toBeInstanceOf(OrgAlreadyExistsError);
  });
});
