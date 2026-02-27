import { createServer, nodeConfig, vercelConfig } from "@resolid/dev/server";
import { env } from "node:process";

export default await createServer((platform) => {
  switch (platform) {
    case "vercel":
      return vercelConfig({});

    default:
      return nodeConfig({
        port: env.SERVER_PORT,
      });
  }
});
