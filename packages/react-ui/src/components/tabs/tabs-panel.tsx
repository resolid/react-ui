import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";
import { getPanelId, getTabId, useTabs } from "./tabs-context";

export type TabsPanelProps = {
  /**
   * 将内容与触发器关联起来的唯一值
   */
  value: string;
};

export function TabsPanel(
  props: PrimitiveProps<"div", TabsPanelProps, "id" | "role" | "aria-labelledby">,
): ReactNode {
  const { children, className, tabIndex, value, ...rest } = props;

  const { baseId, selectedValue } = useTabs();

  const tabId = getTabId(baseId, value);
  const panelId = getPanelId(baseId, value);
  const selected = value === selectedValue;

  if (!selected) {
    return null;
  }

  return (
    <div
      id={panelId}
      role="tabpanel"
      tabIndex={tabIndex ?? 0}
      aria-labelledby={tabId}
      className={tx("block", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
