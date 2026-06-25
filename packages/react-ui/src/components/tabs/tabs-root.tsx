import { type ReactNode, useId } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import type { Orientation, ValueProps } from "../../shared/types";
import { useControllableState } from "../../hooks/use-controllable-state";
import { OrientationContext } from "../../primitives/composite/orientation-context";
import { tx } from "../../utils/clsx";
import { TabsContext, type TabsContextValue } from "./tabs-context";

export type TabsRootProps = ValueProps<string> & {
  /**
   * 方向
   * @default "horizontal"
   */
  orientation?: Orientation;
};

export function TabsRoot(props: PrimitiveProps<"div", TabsRootProps, "id">): ReactNode {
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
}
