import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import type { Orientation } from "../../shared/types";
import { tx } from "../../utils";
import { useFilePickerFiles } from "./file-picker-context";
import { FilePickerItemContext } from "./file-picker-item-context";

export type FilePickerListProps = {
  /**
   * 方向
   * @default "horizontal"
   */
  orientation?: Orientation;
};

export const FilePickerList = (
  props: PrimitiveProps<"ul", FilePickerListProps>,
): JSX.Element | null => {
  const { orientation = "vertical", className, children, ...rest } = props;

  const files = useFilePickerFiles();

  if (files.length == 0) {
    return null;
  }

  return (
    <ul className={tx("flex gap-2", orientation ? "flex-col" : "flex-row", className)} {...rest}>
      {files.map((file) => (
        <FilePickerItemContext key={file.id} value={file}>
          {children}
        </FilePickerItemContext>
      ))}
    </ul>
  );
};
