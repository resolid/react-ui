import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { TooltipProvider } from "./tooltip-provider";
import { type TooltipProps, useTooltip } from "./use-tooltip";

export type { TooltipProps };

export function Tooltip(props: PropsWithChildren<TooltipProps>): ReactNode {
  const { children, ...rest } = props;

  const tooltip = useTooltip(rest);

  return <TooltipProvider value={tooltip}>{children}</TooltipProvider>;
}

export function TooltipTrigger(
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): ReactNode {
  return <PopperTrigger active={false} {...props} />;
}

export { PopperArrow as TooltipArrow } from "../../primitives/popper/popper-arrow";

export { TooltipContent } from "./tooltip-content";
