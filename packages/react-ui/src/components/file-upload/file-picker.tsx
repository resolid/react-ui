import { FilePickerRoot, type FilePickerRootProps } from "./file-picker-root";

export type FilePickerProps = FilePickerRootProps;

export const FilePicker: typeof FilePickerRoot = FilePickerRoot;

export { FilePickerDropzone } from "./file-picker-dropzone";
export { FilePickerImagePreview } from "./file-picker-image-preview";
export { FilePickerItem } from "./file-picker-item";
export { FilePickerItemDelete } from "./file-picker-item-delete";
export { FilePickerItemSlot } from "./file-picker-item-slot";
export { FilePickerTrigger } from "./file-picker-trigger";
