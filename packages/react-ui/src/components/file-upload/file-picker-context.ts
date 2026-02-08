import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type FileStatus = "ready" | "uploading" | "error" | "success";

export type UploadedFile = {
  url: string;
  preview?: string;
};

export type RemoteFile = UploadedFile & {
  id: string;
  name: string;
  size: number;
  type: string;
};

export type RemoteFileItem = {
  id: string;
  file: Omit<RemoteFile, "id">;
  kind: "remote";
  error?: string;
};

export type LocalFile = {
  id: string;
  file: File;
};

export type LocalFileItem = LocalFile & {
  kind: "local";
  status: FileStatus;
  progress: number;
  error?: string;
};

export type FileItem = LocalFileItem | RemoteFileItem;

export type FilePickerActionContextValue = {
  addFiles: (files: File[] | FileList) => Promise<void>;
  updateFile: (file: FileItem) => void;
  removeFile: (id: string) => Promise<void>;
};

const actionContextTuple = createSafeContext<FilePickerActionContextValue>({
  name: "FilePickerContext",
});

export const FilePickerActionContext: SafeContext<FilePickerActionContextValue> =
  actionContextTuple[0];
export const useFilePickerAction: UseSafeContext<FilePickerActionContextValue> =
  actionContextTuple[1];

export type FilePickerStatusContextValue = {
  disabled: boolean;
  multiple: boolean;
};

const statusContextTuple = createSafeContext<FilePickerStatusContextValue>({
  name: "FilePickerStatusContext",
});

export const FilePickerStatusContext: SafeContext<FilePickerStatusContextValue> =
  statusContextTuple[0];
export const useFilePickerStatus: UseSafeContext<FilePickerStatusContextValue> =
  statusContextTuple[1];

const filesContextTuple = createSafeContext<FileItem[]>({
  name: "FilePickerFilesContext",
});

export const FilePickerFilesContext: SafeContext<FileItem[]> = filesContextTuple[0];
export const useFilePickerFiles: UseSafeContext<FileItem[]> = filesContextTuple[1];

const inputRefContextTuple = createSafeContext<RefObject<HTMLInputElement | null>>({
  name: "FilePickerInputRefContext",
});

export const FilePickerInputRefContext: SafeContext<RefObject<HTMLInputElement | null>> =
  inputRefContextTuple[0];
export const useFilePickerInputRef: UseSafeContext<RefObject<HTMLInputElement | null>> =
  inputRefContextTuple[1];
