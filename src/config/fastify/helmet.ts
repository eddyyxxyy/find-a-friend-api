import { FastifyHelmetOptions } from "@fastify/helmet";

const helmetConfigs: FastifyHelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      childSrc: ["'self'"],
      connectSrc: ["'self'"],
      defaultSrc: ["'self'"],
      fontSrc: ["'self'"],
      frameSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      mediaSrc: ["'self'"],
      objectSrc: ["'self'"],
      reportUri: "/csp-report",
      sandbox: ["allow-scripts"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  hsts: {
    includeSubDomains: true,
    maxAge: 31536000, // 1 year
    preload: true,
  },
  originAgentCluster: true,
  permittedCrossDomainPolicies: true,
  referrerPolicy: {
    policy: "origin",
  },
  xFrameOptions: {
    action: "sameorigin",
  },
  xXssProtection: true,
};

export { helmetConfigs };
