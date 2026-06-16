import { type ReactNode, useLayoutEffect, useState } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives/polymorphic";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { useCollectionState } from "../../primitives/collection/collection-state-context";
import { usePopperFloating } from "../../primitives/popper/popper-floating-context";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils/clsx";
import { ariaAttr } from "../../utils/dom";
import { useListboxScroll } from "./listbox-scroll-context";

export function ListboxContent(
  props: PrimitiveProps<"div", EmptyObject, "role" | "tabIndex">,
): ReactNode {
  const { children, className, ref, ...rest } = props;

  const { size, multiple } = useCollectionState();
  const { scrollToRef, scrollRef } = useListboxScroll();
  const { setFloating, getFloatingProps } = usePopperFloating();

  const [hasScrollTo, setHasScrollTo] = useState(false);

  // react-doctor-disable-next-line react-doctor/no-derived-state-effect
  useLayoutEffect(() => {
    setHasScrollTo(!!scrollToRef.current);
  }, [scrollToRef, setHasScrollTo]);

  const refs = useMergeRefs(ref, setFloating, scrollRef);

  return (
    <div
      ref={refs}
      tabIndex={hasScrollTo ? -1 : undefined}
      className={tx(
        "scrollbar scrollbar-lite relative overflow-y-auto overscroll-contain outline-none",
        inputTextShareStyles[size],
        className,
      )}
      aria-multiselectable={ariaAttr(multiple)}
      {...(hasScrollTo ? rest : getFloatingProps(rest))}
    >
      {children}
    </div>
  );
}
