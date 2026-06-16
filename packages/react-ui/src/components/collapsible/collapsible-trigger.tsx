import type { MouseEvent, ReactNode } from "react";
import { useButtonProps } from "../../hooks/use-button-props";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../../primitives/polymorphic";
import { useCollapsibleTrigger } from "./collapsible-trigger-context";

export function CollapsibleTrigger(
  props: PolymorphicProps<"button", EmptyObject, "type" | "disabled">,
): ReactNode {
  const { render, tabIndex, children, onClick, ...rest } = props;

  const { id, open, disabled, toggle } = useCollapsibleTrigger();

  const buttonProps = useButtonProps({
    hasRender: !!render,
    tabIndex,
    disabled,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
    toggle();
  };

  return (
    <Polymorphic<"button">
      as="button"
      render={render}
      {...buttonProps}
      aria-expanded={open}
      aria-controls={id}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}
