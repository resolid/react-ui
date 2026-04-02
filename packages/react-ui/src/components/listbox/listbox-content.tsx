import type { JSX } from "react/jsx-runtime";
import { useLayoutEffect, useState } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useMergeRefs } from "../../hooks";
import { usePopperFloating } from "../../primitives/popper/popper-floating-context";
import { inputTextShareStyles } from "../../shared/styles";
import { ariaAttr, tx } from "../../utils";
import { useListboxScroll } from "./listbox-scroll-context";
import { useListboxState } from "./listbox-state-context";

export function ListboxContent(
  props: PrimitiveProps<"div", EmptyObject, "role" | "tabIndex">,
): JSX.Element {
  const { children, className, ref, ...rest } = props;

  const { size, multiple } = useListboxState();
  const { scrollToRef, scrollRef } = useListboxScroll();
  const { setFloating, getFloatingProps } = usePopperFloating();

  const [hasScrollTo, setHasScrollTo] = useState(false);

  useLayoutEffect(() => {
    setHasScrollTo(!!scrollToRef.current);
  }, [scrollToRef, setHasScrollTo]);

  const refs = useMergeRefs(ref, setFloating, scrollRef);

  return (
    <div
      ref={refs}
      tabIndex={hasScrollTo ? -1 : undefined}
      className={tx(
        "scrollbar scrollbar-thin relative overflow-y-auto overscroll-contain outline-none",
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
