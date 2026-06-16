import type { ReactNode } from "react";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { useCollectionState } from "../../primitives/collection/collection-state-context";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../../primitives/polymorphic";
import { usePopperTrigger } from "../../primitives/popper/popper-trigger-context";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils/clsx";
import { inputHeightStyles, inputPxStyles, inputPyStyles } from "../input/input.styles";
import { useComboboxInput } from "./combobox-input-context";

const comboboxInputSizes = {
  xs: "me-4",
  sm: "me-4.5",
  md: "me-5",
  lg: "me-5.5",
  xl: "me-6",
};

export function ComboboxInput(
  props: PolymorphicProps<"input", EmptyObject, "name" | "disabled">,
): ReactNode {
  const { render, className, ref, ...rest } = props;

  const { size, disabled, readOnly } = useCollectionState();

  const { getReferenceProps, setReference } = usePopperTrigger();
  const { inputRef, inputValue, name } = useComboboxInput();

  const refs = useMergeRefs(ref, inputRef, setReference);

  return (
    <Polymorphic
      as="input"
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
}
