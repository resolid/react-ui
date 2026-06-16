import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives";
import type { FileItem } from "./file-picker-context";
import { VisuallyHiddenInput } from "../visually-hidden/visually-hidden-input";

type FileHiddenInputProps = {
  name: string;
  required: boolean;
  disabled: boolean;
  multiple: boolean;
  files: FileItem[];
};

export function FileHiddenInput({
  name,
  required,
  disabled,
  multiple,
  files,
  ...rest
}: PrimitiveProps<"input", FileHiddenInputProps, "value">): ReactNode {
  const value: string[] = [];

  for (const file of files) {
    if (file.kind !== "remote") {
      continue;
    }

    value.push(
      JSON.stringify({
        id: file.id,
        ...file.file,
      }),
    );
  }

  return (
    <VisuallyHiddenInput
      name={name}
      required={required}
      disabled={disabled}
      value={multiple ? value : (value[0] ?? "")}
      {...rest}
    />
  );
}
