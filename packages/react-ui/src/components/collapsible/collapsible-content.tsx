import type { JSX } from "react/jsx-runtime";
import { type CSSProperties, useEffect, useState } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useElementTransitionStatus, useIsomorphicEffect, useMergeRefs } from "../../hooks";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { tx } from "../../utils";
import { useCollapsibleContent } from "./collapsible-content-context";

export function CollapsibleContent(
  props: PrimitiveProps<"div", EmptyObject, "id">,
): JSX.Element | null {
  const { children, ref, ...rest } = props;

  const orientation = useOrientation(true);

  const { id, open, duration } = useCollapsibleContent();

  const { isMounted, status, element, setElement } = useElementTransitionStatus(open, { duration });

  const [size, setSize] = useState<{ width?: number; height?: number }>();

  const [skipAnimation, setSkipAnimation] = useState(open || isMounted);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setSkipAnimation(false);
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  useIsomorphicEffect(() => {
    if (isMounted && element) {
      const rect = element.getBoundingClientRect();

      setSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [element, isMounted]);

  const refs = useMergeRefs(ref, setElement);

  if (!isMounted) {
    return null;
  }

  const horizontal = orientation == "horizontal";

  return (
    <div
      role="presentation"
      style={
        {
          "--hv": size?.height ? `${size.height}px` : undefined,
          "--wv": size?.width ? `${size.width}px` : undefined,
        } as CSSProperties
      }
      className={tx(
        "overflow-clip",
        !skipAnimation && [
          "duration-(--dv)",
          horizontal ? "transition-[width]" : "transition-[height]",
        ],
        skipAnimation || status == "open"
          ? horizontal
            ? "w-(--wv)"
            : "h-(--hv)"
          : horizontal
            ? "w-0"
            : "h-0",
      )}
    >
      <div id={id} ref={refs} {...rest}>
        {children}
      </div>
    </div>
  );
}
