import type { JSX } from "react/jsx-runtime";
import { useButtonProps, useMergeRefs } from "../../hooks";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../../primitives";
import { AngleDownIcon } from "../../shared/icons";
import { ariaAttr, tx } from "../../utils";
import { useListboxState } from "../listbox/listbox-state-context";
import { selectSizeStyles } from "../select/select.styles";
import { useComboboxInput } from "./combobox-input-context";
import { useComboboxRoot } from "./combobox-root-context";
import { useComboboxTrigger } from "./combobox-trigger-context";

export const ComboboxTrigger = (
  props: PolymorphicProps<"button", EmptyObject, "type" | "tabIndex" | "disabled">,
): JSX.Element => {
  const { render, children, ref, ...rest } = props;

  const { inputRef } = useComboboxInput();
  const { triggerRef } = useComboboxTrigger();
  const { rootContext } = useComboboxRoot();
  const { size, disabled } = useListboxState();

  const buttonProps = useButtonProps({
    hasRender: !!render,
    disabled: disabled,
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
      as={"button"}
      render={render}
      ref={refs}
      className={tx("absolute end-0 top-0 bottom-0 outline-none", selectSizeStyles[size].chevron)}
      onClick={handleClick}
      onFocus={handleFocus}
      aria-haspopup="listbox"
      aria-expanded={ariaAttr(rootContext.open)}
      aria-controls={rootContext.floatingId}
      {...buttonProps}
      {...rest}
    >
      {children ?? <AngleDownIcon className={"text-fg-subtle"} />}
    </Polymorphic>
  );
};
