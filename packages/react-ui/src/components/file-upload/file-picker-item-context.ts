import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { FileItem } from "./file-picker-context";

const contextTuple = createSafeContext<FileItem>({
  name: "FilePickerItemContext",
});

export const FilePickerItemContext: SafeContext<FileItem> = contextTuple[0];
export const useFilePickerItem: UseSafeContext<FileItem> = contextTuple[1];
