import type { SyntheticEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useFilePickerItem } from "./file-picker-item-context";

export const FilePickerImagePreview = (
  props: PrimitiveProps<"img", EmptyObject, "src" | "srcSet" | "onLoad">,
): JSX.Element => {
  const { className, ...rest } = props;

  const file = useFilePickerItem();

  const local = file.kind == "local";

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (!(e.target instanceof HTMLImageElement)) {
      return;
    }

    if (local) {
      URL.revokeObjectURL(e.target.src);
    }
  };

  return (
    <img
      src={local ? URL.createObjectURL(file.file) : (file.file.preview ?? file.file.url)}
      alt={file.file.name}
      className={tx("size-full object-cover", className)}
      onLoad={handleLoad}
      {...rest}
    />
  );
};
