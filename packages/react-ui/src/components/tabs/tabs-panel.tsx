import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { getPanelId, getTabId, useTabs } from "./tabs-context";

export type TabsPanelProps = {
  /**
   * 将内容与触发器关联起来的唯一值
   */
  value: string;
};

export function TabsPanel(
  props: PrimitiveProps<"div", TabsPanelProps, "id" | "role" | "aria-labelledby">,
): JSX.Element | null {
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
