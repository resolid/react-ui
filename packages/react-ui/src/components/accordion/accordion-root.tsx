import { Composite } from "@floating-ui/react";
import { type KeyboardEvent, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import {
  CompositeContext,
  type CompositeContextValue,
} from "../../primitives/composite/composite-context";
import { OrientationContext } from "../../primitives/composite/orientation-context";
import type { MultipleValueProps, Orientation } from "../../shared/types";
import { tx } from "../../utils";
import { useDirection } from "../provider/direction-context";
import {
  type AccordionBaseProps,
  AccordionContext,
  type AccordionContextValue,
} from "./accordion-context";

export type AccordionRootProps = MultipleValueProps & {
  /**
   * 允许关闭内容, 当 `multiple` 为 `false` 时有效
   * @default false
   */
  collapsible?: boolean;

  /**
   * 方向
   * @default "horizontal"
   */
  orientation?: Orientation;
} & AccordionBaseProps;

export const AccordionRoot = (props: PrimitiveProps<"div", AccordionRootProps>): JSX.Element => {
  const {
    value,
    multiple = true,
    defaultValue = multiple ? [] : null,
    onChange,
    collapsible = false,
    orientation = "vertical",
    disabled = false,
    duration = 250,
    className,
    children,
    onKeyDown,
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState<
    (string | number)[] | string | number | null
  >({
    value,
    defaultValue,
    onChange: onChange as (value: (string | number)[] | string | number | null) => void,
  });

  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const direction = useDirection(true);

  const context: AccordionContextValue = {
    disabled,
    duration,
    collapsible,
    openedValue: valueState,
    setOpenedValue: setValueState,
  };

  const compositeContext: CompositeContextValue = {
    activeIndex,
    setActiveIndex,
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);

    if (e.key === "Tab") {
      e.preventDefault();

      const changeTo = orientation == "horizontal" ? "ArrowLeft" : "ArrowDown";

      const newEvent = new KeyboardEvent("keydown", {
        key: changeTo,
        code: changeTo,
        bubbles: true,
      });

      e.target.dispatchEvent(newEvent);
    }
  };

  return (
    <Composite
      rtl={direction == "rtl"}
      orientation={orientation}
      activeIndex={activeIndex}
      onNavigate={setActiveIndex}
      className={tx("flex", orientation == "horizontal" ? "flex-row" : "flex-col", className)}
      onKeyDown={handleKeyDown}
      render={(props) => <div {...props} aria-orientation={undefined} />}
      {...rest}
    >
      <AccordionContext value={context}>
        <OrientationContext value={orientation}>
          <CompositeContext value={compositeContext}>{children}</CompositeContext>
        </OrientationContext>
      </AccordionContext>
    </Composite>
  );
};
