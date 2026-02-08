import type { ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import type { FileItem } from "./file-picker-context";
import { useFilePickerItem } from "./file-picker-item-context";

export type FilePickerItemSlotProps = {
  children: (file: FileItem) => ReactNode;
};

export const FilePickerItemSlot = ({ children }: FilePickerItemSlotProps): JSX.Element => {
  const file = useFilePickerItem();

  return <>{children(file)}</>;
};
