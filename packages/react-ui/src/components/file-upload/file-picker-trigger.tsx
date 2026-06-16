import type { ReactNode } from "react";
import { useButtonProps } from "../../hooks/use-button-props";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../../primitives/polymorphic";
import { useFilePickerInputRef, useFilePickerStatus } from "./file-picker-context";

type FilePickerTriggerState = { disabled: boolean };

export function FilePickerTrigger(
  props: PolymorphicProps<
    "button",
    EmptyObject,
    "type" | "disabled" | "onClick",
    FilePickerTriggerState
  >,
): ReactNode {
  const { render, tabIndex, children, ...rest } = props;

  const { disabled } = useFilePickerStatus();

  const inputRef = useFilePickerInputRef();

  const buttonProps = useButtonProps({
    hasRender: !!render,
    disabled,
    tabIndex,
  });

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Polymorphic<"button", FilePickerTriggerState>
      as="button"
      state={{ disabled }}
      render={render}
      onClick={handleClick}
      {...buttonProps}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}
