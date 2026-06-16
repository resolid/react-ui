import type { ReactNode } from "react";
import type { PolymorphicProps } from "../../primitives/polymorphic";
import { useCollectionState } from "../../primitives/collection/collection-state-context";
import { PopperAnchor } from "../../primitives/popper/popper-anchor";
import { usePopperState } from "../../primitives/popper/popper-state-context";
import { tx } from "../../utils/clsx";
import { dataAttr } from "../../utils/dom";
import { inputStyles } from "../input/input.styles";
import { useComboboxState } from "./combobox-state-context";

export function ComboboxAnchor(props: PolymorphicProps<"div">): ReactNode {
  const { render, children, className, ...rest } = props;

  const { open } = usePopperState();
  const { invalid } = useComboboxState();
  const { disabled } = useCollectionState();

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
