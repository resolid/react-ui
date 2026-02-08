import { env } from "node:process";
import type { Route } from "./+types/uploadthing";

export const action = async ({ request }: Route.ActionArgs) => {
  const params = new URL(request.url).searchParams;
  const act = params.get("act");

  if (act == "getPrepareUrl") {
    const data = await request.formData();

    return await fetch("https://api.uploadthing.com/v7/prepareUpload", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Uploadthing-Api-Key": env.UPLOADTHING_API_KEY,
      } as unknown as Headers,
      body: JSON.stringify({
        customId: data.get("fileId"),
        fileName: data.get("fileName"),
        fileSize: parseFloat(data.get("fileSize") as string),
        fileType: data.get("fileType"),
      }),
    });
  }

  if (act == "deleteFile") {
    const id = params.get("id");

    return await fetch("https://api.uploadthing.com/v6/deleteFiles", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Uploadthing-Api-Key": env.UPLOADTHING_API_KEY,
      } as unknown as Headers,
      body: JSON.stringify({
        customIds: [id],
      }),
    });
  }
};
