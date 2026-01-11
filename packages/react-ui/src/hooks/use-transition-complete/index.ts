import { useEffect, useEffectEvent } from "react";
import type { TransitionStatus } from "../../shared/types";
import { usePrevious } from "../use-previous";

export type UseTransitionCompleteOptions = {
  status: TransitionStatus;
  onCloseComplete: () => void;
};

export function useTransitionComplete({
  status,
  onCloseComplete,
}: UseTransitionCompleteOptions): void {
  const prevStatus = usePrevious(status);

  const onCloseCompleteEvent = useEffectEvent(onCloseComplete);

  useEffect(() => {
    if (prevStatus == "close" && status == "unmounted") {
      onCloseCompleteEvent();
    }
  }, [prevStatus, status]);
}
