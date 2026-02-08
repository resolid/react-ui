import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { FileItem } from "./file-picker-context";

export type FileUploadBaseProps = {
  /**
   * 是否自动上传
   * @default true
   */
  autoUpload?: boolean;

  /**
   * 最大并行数
   * @default 3
   */
  maxParallel?: number;
};

export type ProgressCallback = (progress: number) => void;

export type FileUploadContextValue = Required<FileUploadBaseProps> & {
  uploadFile: (file: FileItem, updateFile: (file: FileItem) => void) => Promise<void>;
  deleteFile: (id: string) => Promise<boolean>;
  cancelUpload: (id: string) => boolean;
};

const fileUploadContextTuple = createSafeContext<FileUploadContextValue>({
  name: "FileUploadContext",
});

export const FileUploadContext: SafeContext<FileUploadContextValue> = fileUploadContextTuple[0];
export const useFileUpload: UseSafeContext<FileUploadContextValue> = fileUploadContextTuple[1];
