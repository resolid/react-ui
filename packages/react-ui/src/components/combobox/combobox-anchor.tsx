import type { JSX } from "react/jsx-runtime";
import type { PolymorphicProps } from "../../primitives";
import { PopperAnchor } from "../../primitives/popper/popper-anchor";
import { usePopperState } from "../../primitives/popper/popper-state-context";
import { dataAttr, tx } from "../../utils";
import { inputStyles } from "../input/input.styles";
import { useListboxState } from "../listbox/listbox-state-context";
import { useComboboxState } from "./combobox-state-context";

export function ComboboxAnchor(props: PolymorphicProps<"div">): JSX.Element {
  const { render, children, className, ...rest } = props;

  const { open } = usePopperState();
  const { invalid } = useComboboxState();
  const { disabled } = useListboxState();

  return (
    <PopperAnchor
      render={render}
      data-active={dataAttr(open)}
      className={tx(
        !render && inputStyles({ disabled, invalid, focusable: true }),
        !disabled && "active:border-bg-primary-emphasis active:outline-bg-primary-emphasis/70",
        className,
      )}
      {...rest}
    >
      {children}
    </PopperAnchor>
  );
}
