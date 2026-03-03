import {
  createHonoVercelServer,
  createHonoNodeServer,
  type Hono,
  type Env,
} from "@resolid/dev/http.server";
import { search } from "~/api/search";
import { uploadthing } from "~/api/uploadthing";

const configure = <E extends Env>(app: Hono<E>) => {
  app.get("/api/search", async (c) => c.json(await search(c.req.query("q"))));
  app.post(
    "/api/uploadthing",
    async (c) => await uploadthing(c.req.query("act"), await c.req.formData()),
  );
};

export default await (import.meta.env.RESOLID_PLATFORM == "vercel"
  ? createHonoVercelServer({ configure })
  : createHonoNodeServer({ configure }));
