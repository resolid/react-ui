import type { JSX } from "react/jsx-runtime";
import { useButtonProps } from "../../hooks";
import { Polymorphic, type EmptyObject, type PolymorphicProps } from "../../primitives";
import { useFilePickerInputRef, useFilePickerStatus } from "./file-picker-context";

type FilePickerTriggerState = { disabled: boolean };

export const FilePickerTrigger = (
  props: PolymorphicProps<
    "button",
    EmptyObject,
    "type" | "disabled" | "onClick",
    FilePickerTriggerState
  >,
): JSX.Element => {
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
    <>
      <Polymorphic<"button", FilePickerTriggerState>
        as={"button"}
        state={{ disabled }}
        render={render}
        onClick={handleClick}
        {...buttonProps}
        {...rest}
      >
        {children}
      </Polymorphic>
    </>
  );
};
