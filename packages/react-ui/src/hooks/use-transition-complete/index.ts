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
  // react-doctor-disable-next-line react-doctor/no-event-handler
  const prevStatus = usePrevious(status);

  const onCloseCompleteEvent = useEffectEvent(onCloseComplete);

  useEffect(() => {
    // oxlint-disable-next-line react-you-might-not-need-an-effect-js/no-event-handler
    if (prevStatus == "close" && status == "unmounted") {
      onCloseCompleteEvent();
    }
  }, [prevStatus, status]);
}
