import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: env.NODE_ENV === "dev" ? ["error", "info", "query", "warn"] : [],
  transactionOptions: {
    isolationLevel: "ReadCommitted",
    maxWait: 5,
    timeout: 10,
  },
});

export { prisma };
