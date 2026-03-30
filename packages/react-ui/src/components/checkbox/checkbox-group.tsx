import type { ChangeEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import type { Orientation } from "../../shared/types";
import { useControllableState } from "../../hooks";
import { isInputEvent, tx } from "../../utils";
import { type CheckboxGroupBaseProps, CheckboxGroupContext } from "./checkbox-group-context";

export type CheckboxGroupProps = {
  /**
   * 默认值
   */
  defaultValue?: (string | number)[];

  /**
   * onChange 回调
   */
  onChange?: (value: (string | number)[]) => void;

  /**
   * 方向
   * @default 'horizontal'
   */
  orientation?: Orientation;
} & CheckboxGroupBaseProps;

export function CheckboxGroup(
  props: PrimitiveProps<"div", CheckboxGroupProps, "role">,
): JSX.Element {
  const {
    color = "primary",
    size = "md",
    disabled = false,
    name,
    value,
    defaultValue = [],
    onChange,
    orientation = "horizontal",
    className,
    children,
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = (eventOrValue: ChangeEvent<HTMLInputElement> | string | number) => {
    const inputEvent = isInputEvent(eventOrValue);

    const checked = inputEvent ? eventOrValue.target.checked : !valueState.includes(eventOrValue);

    const selectedValue = inputEvent ? eventOrValue.target.value : eventOrValue;

    const nextValue = checked
      ? [...valueState, selectedValue]
      : valueState.filter((v) => String(v) !== String(selectedValue));

    setValueState(nextValue);
  };

  const context = {
    name,
    size,
    color,
    disabled,
    value: valueState,
    onChange: handleChange,
  };

  return (
    <div
      role="group"
      className={tx(
        "inline-flex",
        orientation == "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      {...rest}
    >
      <CheckboxGroupContext value={context}>{children}</CheckboxGroupContext>
    </div>
  );
}
