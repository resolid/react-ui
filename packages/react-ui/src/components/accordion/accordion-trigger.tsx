import type { MouseEvent, ReactNode } from "react";
import { useListItem } from "@floating-ui/react";
import type { EmptyObject, PolymorphicProps } from "../../primitives/polymorphic";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { useComposite } from "../../primitives/composite/composite-context";
import { dataAttr } from "../../utils/dom";
import { CollapsibleTrigger } from "../collapsible/collapsible-trigger";

export function AccordionTrigger(
  props: PolymorphicProps<"button", EmptyObject, "type" | "disabled">,
): ReactNode {
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
}
