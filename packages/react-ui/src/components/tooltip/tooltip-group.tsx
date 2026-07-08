import type { PropsWithChildren, ReactNode } from "react";
import { FloatingDelayGroup } from "@floating-ui/react";
import type { DelayProps } from "../../shared/types";

export type TooltipGroupProps = DelayProps & {
  /**
   * 如果之前的提示在超时内关闭，另一个提示会立即打开。以毫秒为单位。
   * @default 400
   */
  timeout?: number;
};

export function TooltipGroup({
  openDelay = 300,
  closeDelay = 150,
  timeout = 400,
  children,
}: PropsWithChildren<TooltipGroupProps>): ReactNode {
  return (
    <FloatingDelayGroup delay={{ open: openDelay, close: closeDelay }} timeoutMs={timeout}>
      {children}
    </FloatingDelayGroup>
  );
}
