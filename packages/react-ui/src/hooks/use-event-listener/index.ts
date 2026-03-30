import { isBrowser, isString } from "@resolid/utils";
import { type RefObject, useEffect, useEffectEvent } from "react";

type UseEventListenerTarget = Window | Document | HTMLElement | RefObject<HTMLElement | null>;

type ExtractTargetElement<Target> = Target extends RefObject<infer Element> ? Element : Target;

type ExtractEventMap<Target> =
  ExtractTargetElement<Target> extends Window
    ? WindowEventMap
    : ExtractTargetElement<Target> extends Document
      ? DocumentEventMap
      : HTMLElementEventMap;

type ExtractEventName<Target> = keyof ExtractEventMap<ExtractTargetElement<Target>>;

type ExtractEvent<Target, EventName extends ExtractEventName<Target>> = ExtractEventMap<
  ExtractTargetElement<Target>
>[EventName];

export function useEventListener<
  TargetEventName extends ExtractEventName<Target>,
  TargetEvent extends ExtractEvent<Target, TargetEventName>,
  Target extends UseEventListenerTarget = Window,
>(
  eventName: TargetEventName,
  handler: (event: TargetEvent) => void,
  target?: Target,
  options?: boolean | AddEventListenerOptions,
): void {
  const handlerEvent = useEffectEvent(handler);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    if (!(isString(eventName) && target !== null)) {
      return;
    }

    const targetElement: Exclude<UseEventListenerTarget, RefObject<HTMLElement>> | null =
      target === undefined ? window : "current" in target ? target.current : target;

    if (!targetElement?.addEventListener) {
      return;
    }

    const eventListener = (event: Event) => handlerEvent(event as unknown as TargetEvent);

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [target, eventName, options]);
}
