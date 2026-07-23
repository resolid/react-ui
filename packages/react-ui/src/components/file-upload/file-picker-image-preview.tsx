import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives/polymorphic";
import { useObjectUrl } from "../../hooks/use-object-url";
import { tx } from "../../utils/clsx";
import { useFilePickerItem } from "./file-picker-item-context";

export function FilePickerImagePreview(
  props: PrimitiveProps<"img", EmptyObject, "src" | "srcSet" | "onLoad">,
): ReactNode {
  const { className, ...rest } = props;

  const file = useFilePickerItem();

  const local = file.kind == "local";
  const localUrl = useObjectUrl(local ? file.file : null);

  return (
    <img
      src={local ? localUrl : (file.file.preview ?? file.file.url)}
      alt={file.file.name}
      className={tx("size-full object-cover", className)}
      {...rest}
    />
  );
}
