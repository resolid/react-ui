import type { JSX } from "react/jsx-runtime";
import { useListItem } from "@floating-ui/react";
import type { PrimitiveProps } from "../../primitives";
import { InputItem, type InputItemProps } from "../../primitives/common/input-item";
import { useComposite } from "../../primitives/composite/composite-context";
import { ariaAttr, tx } from "../../utils";

type TagsInputItemProps = Omit<InputItemProps, "onRemove"> & {
  onRemove: (index: number) => void;
};

export function TagsInputItem(
  props: PrimitiveProps<"div", TagsInputItemProps, "ref">,
): JSX.Element {
  const { onRemove, className, children, ...rest } = props;

  const { ref: itemRef, index } = useListItem();
  const { activeIndex } = useComposite();

  const selected = activeIndex === index;

  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <InputItem
      ref={itemRef}
      aria-selected={ariaAttr(selected)}
      className={tx(selected ? "bg-bg-subtle" : "bg-bg-subtlest", className)}
      onRemove={handleRemove}
      {...rest}
    >
      {children}
    </InputItem>
  );
}
