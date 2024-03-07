import { app } from "@/app";
import { env } from "@/env";

void app
  .listen({
    host: env.APP_HOST,
    port: env.APP_PORT,
  })
  .then(() => {
    console.log("🚀 HTTP server running at port " + env.APP_PORT);
  })
  .catch((error) => {
    console.error("❌ HTTP server not running.\n", error);
  });
