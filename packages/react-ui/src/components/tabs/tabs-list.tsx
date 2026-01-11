import { Composite } from "@floating-ui/react";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { CompositeContext } from "../../primitives/composite/composite-context";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { IndicatorContext } from "../../primitives/indicator/indicator-context";
import { tx } from "../../utils";

export const TabsList = (props: PrimitiveProps<"div", EmptyObject, "role">): JSX.Element => {
  const { children, className, ref, ...rest } = props;

  const orientation = useOrientation();

  const [listElement, setListElement] = useState<HTMLElement | null>(null);
  const [itemElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const refs = useMergeRefs(ref, setListElement);

  return (
    <Composite
      ref={refs}
      role={"tablist"}
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
      <IndicatorContext value={{ listElement, itemElement }}>
        <CompositeContext value={{ activeIndex, setActiveIndex, setActiveElement }}>
          {children}
        </CompositeContext>
      </IndicatorContext>
    </Composite>
  );
};
