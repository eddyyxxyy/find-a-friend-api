import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import {
  OrgAlreadyExistsError,
} from "@/services/errors/org-already-exists-error";
import {
  makeCreateOrgService,
} from "@/services/factories/prisma/make-prisma-create-org-service";

const createOrgBodySchema = z.object({
  city: z.string()
    .min(3, "Invalid City name. City name must be at least 3 characters long.")
    .max(55, "Invalid City name. City name must be at max 55 characters long."),
  email: z.string().email(),
  id: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string()
    .min(
      3,
      "Invalid Organization name. \
      Organization name must be at least 3 characters long.",
    )
    .max(
      55,
      "Invalid Organization name. \
      Organization name must be at max 55 characters long.",
    ),
  ownersName: z.string()
    .min(
      3,
      "Invalid Organization owner name. \
      Organization owner name must be at least 3 characters long.",
    )
    .max(
      55,
      "Invalid Organization owner name. \
      Organization owner name must be at max 55 characters long.",
    ),
  password: z.string()
    .regex(
      /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$@$%&? "]).*$/,
      "Invalid Password. Passwords must have be 8 characters long \
      and have at least 1 special char (e.g. '#'), 1 character and 1 number.",
    ),
  state: z.string()
    .min(
      3,
      "Invalid State name. State name must be at least 3 characters long.")
    .max(
      55,
      "Invalid State name. State name must be at max 55 characters long."),
  street: z.string()
    .min(
      3,
      "Invalid Street address. \
      Street address must be at least 3 characters long.",
    )
    .max(
      55,
      "Invalid Street address. \
      Street address must be at max 55 characters long.",
    ),
  whatsappNumber: z.string()
    .regex(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Invalid whatsapp number. Example: +55 (11) 99999-9999.",
    ),
  zipCode: z.string()
    .regex(
      /[0-9]{5}-[\d]{3}/,
      "Invalid zipCode. Example: 12345-678",
    ),
});

async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createOrgBodySchema.parse(request.body);

  const createOrgService = makeCreateOrgService();

  try {
    const { org } = await createOrgService.execute({
      data: body,
    });

    return reply.status(201).send(
      { data: org, message: "Org created with success." },
    );
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
  }
}

export { createOrgController };
