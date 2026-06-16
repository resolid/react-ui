import type { ReactNode } from "react";
import { useListItem } from "@floating-ui/react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { InputItem, type InputItemProps } from "../../primitives/common/input-item";
import { useComposite } from "../../primitives/composite/composite-context";
import { tx } from "../../utils/clsx";
import { ariaAttr } from "../../utils/dom";

type TagsInputItemProps = Omit<InputItemProps, "onRemove"> & {
  onRemove: (index: number) => void;
};

export function TagsInputItem(props: PrimitiveProps<"div", TagsInputItemProps, "ref">): ReactNode {
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
