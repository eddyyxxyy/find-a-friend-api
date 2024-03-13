import { makeOrg } from "@tests/make-org";
import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";

import { CreateOrgService } from "./create-org";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import {
  makeCreateOrgService,
} from "./factories/in-memory/make-in-memory-create-org-service";

describe("Create Org Service", () => {
  let sut: CreateOrgService;

  beforeEach(() => {
    sut = makeCreateOrgService();
  });

  it("should be able to create org", async () => {
    const org = makeOrg();

    const { org: createdOrg } = await sut.execute({ data: org });

    expect(createdOrg.id).toEqual(expect.any(String));
  });

  it("should be hash password when creating an org", async () => {
    const org = makeOrg();

    const { org: { passwordHash } } = await sut.execute({ data: org });

    const isPasswordHashed = await compare("123456", passwordHash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to create org with same email", async () => {
    const org = makeOrg();

    await sut.execute({ data: org });

    await expect(() => sut.execute({ data: org }))
      .rejects
      .toBeInstanceOf(OrgAlreadyExistsError);
  });
});
