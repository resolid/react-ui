import {
  useTransitionStatus,
  type FloatingContext,
  type UseTransitionStatusProps,
} from "@floating-ui/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { TransitionStatus } from "../../shared/types";

export const useElementTransitionStatus = <E extends HTMLElement = HTMLElement>(
  open: boolean,
  props?: UseTransitionStatusProps,
): {
  isMounted: boolean;
  status: TransitionStatus;
  element: E | null;
  setElement: Dispatch<SetStateAction<E | null>>;
} => {
  const [element, setElement] = useState<E | null>(null);

  const { isMounted, status } = useTransitionStatus(
    {
      open,
      elements: { floating: element, reference: null, domReference: null },
    } as unknown as FloatingContext,
    props,
  );

  return { isMounted, status, element, setElement };
};
