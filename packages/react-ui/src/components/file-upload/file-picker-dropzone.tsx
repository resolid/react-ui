import { useState, type DragEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { hasRoundedBaseClass, hasSizeBaseClass } from "../../shared/utils";
import { dataAttr, tx } from "../../utils";
import { useFilePickerAction, useFilePickerStatus } from "./file-picker-context";

export const FilePickerDropzone = (props: PrimitiveProps<"div">): JSX.Element => {
  const { className, children, ...rest } = props;

  const { disabled, multiple } = useFilePickerStatus();
  const { addFiles } = useFilePickerAction();
  const [dragging, setDragging] = useState(false);

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    if (disabled) {
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await addFiles(multiple ? e.dataTransfer.files : [e.dataTransfer.files[0]]);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) {
      return;
    }

    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) {
      return;
    }

    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }

    setDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      role="application"
      aria-disabled={dataAttr(disabled)}
      tabIndex={disabled ? undefined : 0}
      className={tx(
        "flex p-6",
        "border-2 border-dashed bg-bg-normal transition-colors",
        "items-center justify-center text-center disabled:pointer-events-none",
        !hasSizeBaseClass(className) && "w-full",
        !hasRoundedBaseClass(className) && "rounded-md",
        dragging ? "border-bg-primary-pressed" : "border-bd-subtle",
        className,
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      {...rest}
    >
      {children}
    </div>
  );
};
