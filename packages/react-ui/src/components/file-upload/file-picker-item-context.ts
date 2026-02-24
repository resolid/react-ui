import type { FileItem } from "./file-picker-context";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

const [context, hook] = createSafeContext<FileItem>({
  name: "FilePickerItemContext",
});

export const FilePickerItemContext: SafeContext<FileItem> = context;
export const useFilePickerItem: UseSafeContext<FileItem> = hook;
