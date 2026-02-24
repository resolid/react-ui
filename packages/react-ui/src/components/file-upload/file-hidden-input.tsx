import type { JSX } from "react/jsx-runtime";
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

export const FileHiddenInput = ({
  name,
  required,
  disabled,
  multiple,
  files,
  ...rest
}: PrimitiveProps<"input", FileHiddenInputProps, "value">): JSX.Element => {
  const value = files
    .filter((file) => file.kind == "remote")
    .map((file) => JSON.stringify({ id: file.id, ...file.file }));

  return (
    <VisuallyHiddenInput
      name={name}
      required={required}
      disabled={disabled}
      value={multiple ? value : (value[0] ?? "")}
      {...rest}
    />
  );
};
