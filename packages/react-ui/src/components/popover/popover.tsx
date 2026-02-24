import type { ComponentProps, PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import { PopperAnchor } from "../../primitives/popper/popper-anchor";
import { PopperArrow, type PopperArrowProps } from "../../primitives/popper/popper-arrow";
import { PopperClose } from "../../primitives/popper/popper-close";
import { PopperDescription } from "../../primitives/popper/popper-description";
import { PopperTitle } from "../../primitives/popper/popper-title";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { PopoverProvider } from "./popover-provider";
import { type PopoverProps, usePopover } from "./use-popover";

export type { PopoverProps };

export const Popover = (props: PropsWithChildren<PopoverProps>): JSX.Element => {
  const { children, ...rest } = props;

  const popover = usePopover(rest);

  return <PopoverProvider value={popover}>{children}</PopoverProvider>;
};

export const PopoverTrigger = (
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): JSX.Element => <PopperTrigger active {...props} />;

export const PopoverArrow = (props: PopperArrowProps): JSX.Element => {
  const { width = 11, height = 6, ...rest } = props;

  return <PopperArrow width={width} height={height} {...rest} />;
};

export const PopoverAnchor: typeof PopperAnchor = PopperAnchor;
export const PopoverTitle: typeof PopperTitle = PopperTitle;
export const PopoverDescription: typeof PopperDescription = PopperDescription;
export const PopoverClose: typeof PopperClose = PopperClose;

export { PopoverContent } from "./popover-content";
