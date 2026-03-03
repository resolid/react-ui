import { env } from "node:process";

export async function uploadthing(act: string | undefined, data: FormData) {
  if (act == "getPrepareUrl") {
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
    return await fetch("https://api.uploadthing.com/v6/deleteFiles", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Uploadthing-Api-Key": env.UPLOADTHING_API_KEY,
      } as unknown as Headers,
      body: JSON.stringify({
        customIds: [data.get("id")],
      }),
    });
  }
}
