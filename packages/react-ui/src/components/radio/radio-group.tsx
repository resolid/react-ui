import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import type { Orientation } from "../../shared/types";
import { useControllableState } from "../../hooks/use-controllable-state";
import { tx } from "../../utils/clsx";
import { ariaAttr } from "../../utils/dom";
import { type RadioGroupBaseProps, RadioGroupContext } from "./radio-group-context";

export type RadioGroupProps = RadioGroupBaseProps & {
  /**
   * 默认值
   */
  defaultValue?: string | number;

  /**
   * onChange 回调
   */
  onChange?: (value: string | number) => void;

  /**
   * 方向
   * @default 'horizontal'
   */
  orientation?: Orientation;
};

export function RadioGroup(props: PrimitiveProps<"div", RadioGroupProps, "role">): ReactNode {
  const {
    color = "primary",
    size = "md",
    disabled = false,
    required = false,
    readOnly = false,
    invalid = false,
    orientation = "horizontal",
    name,
    value,
    defaultValue = "",
    onChange,
    className,
    children,
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = (changed: string | number) => {
    if (disabled || readOnly) {
      return;
    }

    setValueState(changed);
  };

  const groupContext = {
    name,
    size,
    color,
    disabled,
    required,
    readOnly,
    invalid,
    value: valueState,
    onChange: handleChange,
  };

  return (
    <div
      role="radiogroup"
      aria-disabled={ariaAttr(disabled)}
      aria-required={ariaAttr(required)}
      aria-invalid={ariaAttr(invalid)}
      aria-orientation={orientation}
      className={tx(
        "inline-flex",
        orientation == "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      {...rest}
    >
      <RadioGroupContext value={groupContext}>{children}</RadioGroupContext>
    </div>
  );
}
