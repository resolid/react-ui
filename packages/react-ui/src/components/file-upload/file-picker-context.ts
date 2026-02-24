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

const [actionContext, actionHook] = createSafeContext<FilePickerActionContextValue>({
  name: "FilePickerContext",
});

export const FilePickerActionContext: SafeContext<FilePickerActionContextValue> = actionContext;
export const useFilePickerAction: UseSafeContext<FilePickerActionContextValue> = actionHook;

export type FilePickerStatusContextValue = {
  disabled: boolean;
  multiple: boolean;
};

const [statusContext, statusHook] = createSafeContext<FilePickerStatusContextValue>({
  name: "FilePickerStatusContext",
});

export const FilePickerStatusContext: SafeContext<FilePickerStatusContextValue> = statusContext;
export const useFilePickerStatus: UseSafeContext<FilePickerStatusContextValue> = statusHook;

const [filesContext, filesHook] = createSafeContext<FileItem[]>({
  name: "FilePickerFilesContext",
});

export const FilePickerFilesContext: SafeContext<FileItem[]> = filesContext;
export const useFilePickerFiles: UseSafeContext<FileItem[]> = filesHook;

const [inputContext, inputHook] = createSafeContext<RefObject<HTMLInputElement | null>>({
  name: "FilePickerInputRefContext",
});

export const FilePickerInputRefContext: SafeContext<RefObject<HTMLInputElement | null>> =
  inputContext;
export const useFilePickerInputRef: UseSafeContext<RefObject<HTMLInputElement | null>> = inputHook;
