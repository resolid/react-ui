import type { UploadTransport } from "@resolid/react-ui";

const getPrepareUrl = async (
  fileId: string,
  fileName: string,
  fileSize: number,
  fileType: string,
  abortSignal: AbortSignal,
) => {
  const formData = new FormData();
  formData.append("fileId", fileId);
  formData.append("fileName", fileName);
  formData.append("fileSize", String(fileSize));
  formData.append("fileType", fileType);

  const response = await fetch("/api/uploadthing?act=getPrepareUrl", {
    method: "POST",
    body: formData,
    signal: abortSignal,
  });

  const result = await response.json();

  return result.url;
};

export const uploadthingTransport: UploadTransport = {
  upload: async (file, signal, onProgress) => {
    const signUrl = await getPrepareUrl(
      file.id,
      file.file.name,
      file.file.size,
      file.file.type,
      signal,
    );

    const formData = new FormData();
    formData.append("file", file.file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", signUrl);

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ url: JSON.parse(xhr.response).url });
        } else {
          reject(new Error(`上传失败，状态码: ${xhr.status}`));
        }
      };

      if (signal.aborted) {
        xhr.abort();
        return;
      }

      const onAbort = () => xhr.abort();
      signal.addEventListener("abort", onAbort, { once: true });

      xhr.send(formData);
    });
  },
  delete: async (id) => {
    try {
      await fetch("/api/uploadthing?act=deleteFile&id=" + id, {
        method: "POST",
      });

      return true;
    } catch {
      return true;
    }
  },
};
