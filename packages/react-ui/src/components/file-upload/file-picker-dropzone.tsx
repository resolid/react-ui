import { type DragEvent, type ReactNode, useState } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { hasRoundedBaseClass, hasSizeBaseClass } from "../../shared/utils";
import { tx } from "../../utils/clsx";
import { dataAttr, stopEvent } from "../../utils/dom";
import { useFilePickerAction, useFilePickerStatus } from "./file-picker-context";

export function FilePickerDropzone(props: PrimitiveProps<"div">): ReactNode {
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

    if (e.dataTransfer.files.length > 0) {
      await addFiles(multiple ? e.dataTransfer.files : [e.dataTransfer.files[0]!]);
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

  return (
    <div
      role="application"
      aria-disabled={dataAttr(disabled)}
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
      onDragOver={stopEvent}
      onDrop={handleDrop}
      {...rest}
    >
      {children}
    </div>
  );
}
