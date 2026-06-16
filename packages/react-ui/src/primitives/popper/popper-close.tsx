import type { MouseEvent, ReactNode } from "react";
import { useButtonProps } from "../../hooks/use-button-props";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../polymorphic";
import { usePopperDispatch } from "./popper-dispatch-context";

export function PopperClose(props: PolymorphicProps<"button", EmptyObject, "type">): ReactNode {
  const { render, children, tabIndex, disabled = false, onClick, ...rest } = props;

  const { handleClose } = usePopperDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    handleClose();
  };

  const buttonProps = useButtonProps({
    hasRender: !!render,
    tabIndex,
    disabled,
  });

  return (
    <Polymorphic<"button">
      as="button"
      render={render}
      {...buttonProps}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}
