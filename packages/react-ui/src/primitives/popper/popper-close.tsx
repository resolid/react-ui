import type { MouseEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { useButtonProps } from "../../hooks";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../polymorphic";
import { usePopperDispatch } from "./popper-dispatch-context";

export const PopperClose = (
  props: PolymorphicProps<"button", EmptyObject, "type">,
): JSX.Element => {
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
      as={"button"}
      render={render}
      {...buttonProps}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
