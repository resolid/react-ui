import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  type FloatingContext,
  inline,
  offset,
  type Placement,
  shift,
  useFloating,
} from "@floating-ui/react";
import { type CSSProperties, type Dispatch, type SetStateAction, useState } from "react";

export type PopperWithInlineProps = {
  /**
   * 放置位置
   * @default "auto"
   */
  placement?: "auto" | Placement;

  /**
   * 控制是否启用 inline 中间件
   * @default false
   */
  inlineMiddleware?: boolean;
};

export type UsePopperWithInlineProps = PopperWithInlineProps & {
  openState: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

export function usePopperWithInline({
  placement,
  inlineMiddleware,
  openState,
  handleOpen,
  handleClose,
}: UsePopperWithInlineProps): {
  setArrowElem: Dispatch<SetStateAction<SVGSVGElement | null>>;
  floatingStyles: CSSProperties;
  refs: ReturnType<typeof useFloating>["refs"];
  context: FloatingContext;
} {
  const [arrowElem, setArrowElem] = useState<SVGSVGElement | null>(null);

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      inlineMiddleware && inline(),
      offset(8),
      placement == "auto" ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowElem,
        padding: 4,
      }),
    ],
    open: openState,
    onOpenChange: (open) => {
      if (open) {
        handleOpen();
      } else {
        handleClose();
      }
    },
    placement: placement == "auto" ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  return { setArrowElem, floatingStyles, refs, context };
}
