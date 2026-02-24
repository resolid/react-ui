import type { JSX } from "react/jsx-runtime";
import { type CSSProperties, useId } from "react";
import type { PrimitiveProps } from "../../primitives";
import type { DisclosureProps } from "../../shared/types";
import { useDisclosure } from "../../hooks";
import { tx } from "../../utils";
import {
  CollapsibleContentContext,
  type CollapsibleContentContextValue,
} from "./collapsible-content-context";
import {
  CollapsibleTriggerContext,
  type CollapsibleTriggerContextValue,
} from "./collapsible-trigger-context";

export type CollapsibleRootProps = DisclosureProps & {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export const CollapsibleRoot = (
  props: PrimitiveProps<"div", CollapsibleRootProps>,
): JSX.Element => {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    duration = 250,
    style,
    children,
    className,
    ...rest
  } = props;

  const [openState, { handleToggle }] = useDisclosure({ open, defaultOpen, onOpenChange });

  const id = useId();

  const triggerContext: CollapsibleTriggerContextValue = {
    id,
    disabled,
    open: openState,
    toggle: handleToggle,
  };

  const contentContext: CollapsibleContentContextValue = {
    id,
    open: openState,
    duration,
  };

  return (
    <div
      style={{ ...style, "--dv": `${duration}ms` } as CSSProperties}
      className={tx(disabled && "opacity-60", className)}
      {...rest}
    >
      <CollapsibleTriggerContext value={triggerContext}>
        <CollapsibleContentContext value={contentContext}>{children}</CollapsibleContentContext>
      </CollapsibleTriggerContext>
    </div>
  );
};
