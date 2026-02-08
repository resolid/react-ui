import { type PropsWithChildren, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useLocale } from "../provider/locale-context";
import type { LocalFile, UploadedFile } from "./file-picker-context";
import {
  type FileUploadBaseProps,
  FileUploadContext,
  type FileUploadContextValue,
  type ProgressCallback,
} from "./file-upload-context";

export type UploadTransport = {
  upload: (
    file: LocalFile,
    signal: AbortSignal,
    onProgress: ProgressCallback,
  ) => Promise<UploadedFile>;
  delete?: (id: string) => Promise<boolean>;
};

export type FileUploadProps = FileUploadBaseProps & {
  /**
   * 文件上传传输方法
   */
  transport: UploadTransport;
};

export const FileUpload = (props: PropsWithChildren<FileUploadProps>): JSX.Element => {
  const { autoUpload = true, maxParallel = 3, transport, children } = props;

  const { t } = useLocale();

  const [abortControllers, setAbortControllers] = useState<
    { id: string; controller: AbortController }[]
  >([]);

  const contextValue: FileUploadContextValue = {
    autoUpload,
    maxParallel,
    uploadFile: async (file, updateFile) => {
      if (file.kind != "local") {
        return;
      }

      const controller = new AbortController();

      setAbortControllers((prev) => [...prev, { id: file.id, controller }]);

      updateFile({ ...file, status: "uploading", progress: 1 });

      try {
        const uploadedFile = await transport.upload(
          { id: file.id, file: file.file },
          controller.signal,
          (progress) => {
            updateFile({ ...file, status: "uploading", progress });
          },
        );

        updateFile({
          id: file.id,
          kind: "remote",
          file: {
            ...uploadedFile,
            type: file.file.type,
            name: file.file.name,
            size: file.file.size,
          },
        });
      } catch (e) {
        updateFile({
          ...file,
          status: "error",
          error: t("fileUpload.uploadError", { error: (e as Error).message }),
        });
      }
    },
    deleteFile: async (id) => {
      if (transport.delete) {
        return await transport.delete(id);
      }

      return true;
    },
    cancelUpload: (id) => {
      const controller = abortControllers.find((c) => c.id === id);

      if (controller) {
        controller.controller.abort();
        return true;
      }

      return false;
    },
  };

  return <FileUploadContext value={contextValue}>{children}</FileUploadContext>;
};
