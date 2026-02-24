import type { MouseEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { useListItem } from "@floating-ui/react";
import type { EmptyObject, PolymorphicProps } from "../../primitives";
import { useMergeRefs } from "../../hooks";
import { useComposite } from "../../primitives/composite/composite-context";
import { dataAttr } from "../../utils";
import { CollapsibleTrigger } from "../collapsible/collapsible-trigger";

export const AccordionTrigger = (
  props: PolymorphicProps<"button", EmptyObject, "type" | "disabled">,
): JSX.Element => {
  const { ref, onClick, ...rest } = props;

  const { ref: itemRef, index } = useListItem();
  const { setActiveIndex, activeIndex } = useComposite();

  const activated = activeIndex === index;

  const refs = useMergeRefs(ref, itemRef);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    setActiveIndex(index);
  };

  return (
    <CollapsibleTrigger
      ref={refs}
      tabIndex={activated ? 0 : -1}
      data-active={dataAttr(activated)}
      onClick={handleClick}
      {...rest}
    />
  );
};
