import type { MouseEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { useButtonProps } from "../../hooks";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../../primitives";
import { useCollapsibleTrigger } from "./collapsible-trigger-context";

export const CollapsibleTrigger = (
  props: PolymorphicProps<"button", EmptyObject, "type" | "disabled">,
): JSX.Element => {
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
};
