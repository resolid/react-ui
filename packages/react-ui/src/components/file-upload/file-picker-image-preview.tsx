import type { ReactNode, SyntheticEvent } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";
import { useFilePickerItem } from "./file-picker-item-context";

export function FilePickerImagePreview(
  props: PrimitiveProps<"img", EmptyObject, "src" | "srcSet" | "onLoad">,
): ReactNode {
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
}
