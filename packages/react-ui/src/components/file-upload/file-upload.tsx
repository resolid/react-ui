import { FileUploadRoot, type FileUploadRootProps, type UploadTransport } from "./file-upload-root";

export type { UploadTransport };

export type FileUploadProps = FileUploadRootProps;

export const FileUpload: typeof FileUploadRoot = FileUploadRoot;

export { FileUploadButton } from "./file-upload-button";
