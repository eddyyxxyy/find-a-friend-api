import { makeOrg } from "@tests/make-org";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";

import {
  InMemoryOrgsRepository,
} from "@/repositories/in-memory/orgs.repository";

import { AuthenticateOrgService } from "./authenticate-org";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Org Service", () => {
  let repo: InMemoryOrgsRepository;
  let sut: AuthenticateOrgService;

  beforeEach(() => {
    repo = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgService(repo);
  });

  it("should be able to authenticate an Org", async () => {
    const org = makeOrg();

    await repo.create({
      ...org,
      passwordHash: await hash(org.password, 10),
    });

    const { org: authenticatedOrg } = await sut.execute({
      data: {
        email: org.email,
        password: org.password,
      },
    });

    expect(authenticatedOrg.id).toEqual(expect.any(String));
  });

  it(
    "should be able to refuse Org authentication with wrong e-mail",
    async () => {
      const org = makeOrg();

      await repo.create({
        ...org,
        passwordHash: await hash(org.password, 10),
      });

      await expect(() => sut.execute({
        data: {
          email: "wrong@email.com",
          password: org.password,
        },
      })).rejects.toBeInstanceOf(InvalidCredentialsError);
    },
  );

  it(
    "should be able to refuse Org authentication with wrong password",
    async () => {
      const org = makeOrg();

      await repo.create({
        ...org,
        passwordHash: await hash(org.password, 10),
      });

      await expect(() => sut.execute({
        data: {
          email: org.email,
          password: "wr0ngPassw0rd",
        },
      })).rejects.toBeInstanceOf(InvalidCredentialsError);
    },
  );
});
