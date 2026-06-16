import type { ReactNode } from "react";
import { useButtonProps } from "../../hooks/use-button-props";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { useCollectionState } from "../../primitives/collection/collection-state-context";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../../primitives/polymorphic";
import { AngleDownIcon } from "../../shared/icons";
import { tx } from "../../utils/clsx";
import { ariaAttr } from "../../utils/dom";
import { selectSizeStyles } from "../select/select.styles";
import { useComboboxInput } from "./combobox-input-context";
import { useComboboxRoot } from "./combobox-root-context";
import { useComboboxTrigger } from "./combobox-trigger-context";

export function ComboboxTrigger(
  props: PolymorphicProps<"button", EmptyObject, "type" | "tabIndex" | "disabled">,
): ReactNode {
  const { render, children, ref, ...rest } = props;

  const { inputRef } = useComboboxInput();
  const { triggerRef } = useComboboxTrigger();
  const { rootContext } = useComboboxRoot();
  const { size, disabled } = useCollectionState();

  const buttonProps = useButtonProps({
    hasRender: !!render,
    disabled,
    tabIndex: -1,
  });

  const handleClick = () => {
    rootContext.onOpenChange(!rootContext.open, undefined, "click");
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const refs = useMergeRefs(ref, triggerRef);

  return (
    <Polymorphic<"button">
      as="button"
      render={render}
      ref={refs}
      className={tx(
        "absolute inset-e-0 top-0 bottom-0 outline-none",
        selectSizeStyles[size].chevron,
      )}
      onClick={handleClick}
      onFocus={handleFocus}
      aria-haspopup="listbox"
      aria-expanded={ariaAttr(rootContext.open)}
      aria-controls={rootContext.floatingId}
      {...buttonProps}
      {...rest}
    >
      {children ?? <AngleDownIcon className="text-fg-subtle" />}
    </Polymorphic>
  );
}
