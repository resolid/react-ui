import { useId } from "react";
import type { JSX } from "react/jsx-runtime";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { OrientationContext } from "../../primitives/composite/orientation-context";
import type { Orientation, ValueProp } from "../../shared/types";
import { tx } from "../../utils";
import { TabsContext, type TabsContextValue } from "./tabs-context";

export type TabsRootProps = ValueProp<string> & {
  /**
   * 方向
   * @default "horizontal"
   */
  orientation?: Orientation;
};

export const TabsRoot = (props: PrimitiveProps<"div", TabsRootProps, "id">): JSX.Element => {
  const {
    children,
    className,
    value,
    defaultValue,
    onChange,
    orientation = "horizontal",
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState({ value, defaultValue, onChange });

  const baseId = useId();

  const context: TabsContextValue = {
    baseId,
    selectedValue: valueState,
    setSelectedValue: setValueState,
  };

  return (
    <div
      className={tx("flex", orientation == "horizontal" ? "flex-col" : "flex-row", className)}
      {...rest}
    >
      <OrientationContext value={orientation}>
        <TabsContext value={context}>{children}</TabsContext>
      </OrientationContext>
    </div>
  );
};
