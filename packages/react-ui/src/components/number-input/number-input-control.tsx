import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import type { InputSize } from "../input/input.styles";
import { AngleDownIcon, AngleUpIcon } from "../../shared/icons";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils";

export function NumberInputControl(
  props: PrimitiveProps<
    "button",
    { stepper: "increment" | "decrement"; size: InputSize; inputId: string },
    "type" | "children"
  >,
): JSX.Element {
  const { className, disabled, stepper, size, inputId, ...rest } = props;

  return (
    <button
      type="button"
      tabIndex={-1}
      disabled={disabled}
      aria-label={`${stepper} value`}
      aria-controls={inputId}
      className={tx(
        "pointer-events-auto flex h-full appearance-none items-center justify-center bg-bg-subtle transition-colors select-none",
        disabled ? "opacity-60" : "hover:bg-bg-muted",
        stepper == "increment" && "rounded-tr-md",
        stepper == "decrement" && "rounded-br-md",
        inputTextShareStyles[size],
        className,
      )}
      {...rest}
    >
      {stepper == "increment" && <AngleUpIcon size="0.875em" />}
      {stepper == "decrement" && <AngleDownIcon size="0.875em" />}
    </button>
  );
}
