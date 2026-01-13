import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../../primitives";
import { usePopperTrigger } from "../../primitives/popper/popper-trigger-context";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils";
import { inputHeightStyles, inputPxStyles, inputPyStyles } from "../input/input.styles";
import { useListboxState } from "../listbox/listbox-state-context";
import { useComboboxInput } from "./combobox-input-context";

const comboboxInputSizes = {
  xs: "mr-4",
  sm: "mr-4.5",
  md: "mr-5",
  lg: "mr-5.5",
  xl: "mr-6",
};

export const ComboboxInput = (
  props: PolymorphicProps<"input", EmptyObject, "name" | "disabled">,
): JSX.Element => {
  const { render, className, ref, ...rest } = props;

  const { size, disabled, readOnly } = useListboxState();

  const { getReferenceProps, setReference } = usePopperTrigger();
  const { inputRef, inputValue, name } = useComboboxInput();

  const refs = useMergeRefs(ref, inputRef, setReference);

  return (
    <Polymorphic
      as={"input"}
      render={render}
      ref={refs}
      value={inputValue}
      className={tx(
        !render && [
          "outline-none",
          comboboxInputSizes[size],
          inputPxStyles[size],
          inputPyStyles[size],
          inputHeightStyles[size],
          inputTextShareStyles[size],
        ],
        className,
      )}
      name={name}
      disabled={disabled}
      readOnly={readOnly}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      autoCapitalize="none"
      aria-autocomplete="list"
      {...getReferenceProps(rest)}
    />
  );
};
