import { createHonoNodeServer, type Hono, type Env } from "@resolid/dev/http";
import { search } from "~/api/search";
import { uploadthing } from "~/api/uploadthing";

const honoConfig = <E extends Env>(app: Hono<E>) => {
  app.get("/api/search", async (c) => c.json(await search(c.req.query("q"))));
  app.post(
    "/api/uploadthing",
    async (c) => await uploadthing(c.req.query("act"), await c.req.formData()),
  );
};

export default createHonoNodeServer({ honoConfig, trustProxy: "loopback" });
