import { SwaggerOptions } from "@fastify/swagger";

const swaggerConfigs: SwaggerOptions = {
  hideUntagged: true,
  swagger: {
    consumes: ["application/json"],
    definitions: {
      Pet: {
        properties: {
          about: { type: "string" },
          energyLevel: { enum: ["LOW", "MEDIUM", "HIGH"], type: "string" },
          environmentMinimumSize: {
            enum: ["SMALL", "MEDIUM", "WIDE", "XWIDE"],
            type: "string",
          },
          id: { format: "uuid", type: "string" },
          independenceLevel: {
            enum: ["LOW", "MEDIUM", "HIGH"],
            type: "string",
          },
          name: { type: "string" },
          size: { type: "number" },
        },
        required: [
          "about",
          "energyLevel",
          "environmentMinimumSize",
          "id",
          "independenceLevel",
          "name",
          "size",
        ],
        type: "object",
      },
    },
    host: "localhost:3333",
    info: {
      description: "Allows that animal shelters, rescue organizations, and \
      individual pet owners rehoming their pets to register them for \
      adoption, then users can search for adoptable pets in their area.",
      title: "Find A Friend API",
      version: "0.0.1",
    },
    produces: ["application/json"],
    schemes: ["http"],
    securityDefinitions: {

    },
    tags: [
      { description: "Pet related end-points", name: "pets" },
      { description: "Org related end-points", name: "orgs" },
    ],
  },
};

export { swaggerConfigs };
