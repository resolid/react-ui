import { Composite } from "@floating-ui/react";
import { type ReactNode, useState } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives/polymorphic";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { CompositeContext } from "../../primitives/composite/composite-context";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { IndicatorContext } from "../../primitives/indicator/indicator-context";
import { tx } from "../../utils/clsx";
import { useDirection } from "../provider/direction-context";

export function TabsList(props: PrimitiveProps<"div", EmptyObject, "role">): ReactNode {
  const { children, className, ref, ...rest } = props;

  const orientation = useOrientation();
  const direction = useDirection(true);

  const [listElement, setListElement] = useState<HTMLElement | null>(null);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const refs = useMergeRefs(ref, (node) => {
    if (node) {
      setListElement(node);
    }

    return () => {
      setListElement(null);
    };
  });

  return (
    <Composite
      ref={refs}
      rtl={direction == "rtl"}
      role="tablist"
      orientation={orientation}
      activeIndex={activeIndex}
      onNavigate={setActiveIndex}
      className={tx(
        "relative flex",
        orientation == "horizontal" ? "flex-row items-center" : "flex-col items-stretch",
        className,
      )}
      {...rest}
    >
      <IndicatorContext value={{ listElement, activeElement }}>
        <CompositeContext value={{ activeIndex, setActiveIndex, setActiveElement }}>
          {children}
        </CompositeContext>
      </IndicatorContext>
    </Composite>
  );
}
