import { makeOrg } from "@tests/make-org";
import { randomUUID } from "crypto";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe("Create Org (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new org", async () => {
    const response = await request(app.server).post("/orgs").send({
      id: randomUUID(),
      ...makeOrg({ password: "54893@SidhsusaiSAN2" }),
    });

    expect(response.statusCode).toEqual(201);
  });
});
