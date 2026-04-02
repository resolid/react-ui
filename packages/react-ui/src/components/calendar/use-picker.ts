import {
  autoUpdate,
  flip,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from "@floating-ui/react";
import type { PopperFloatingContextValue } from "../../primitives/popper/popper-floating-context";
import type { PopperPositionerContextValue } from "../../primitives/popper/popper-positioner-context";
import type { PopperTransitionContextValue } from "../../primitives/popper/popper-transtion-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { DisclosureProps } from "../../shared/types";
import type { PickerRootContextValue, PickerStatusContextValue } from "./picker-context";
import { useDisclosure } from "../../hooks";

export type UsePickerOptions = DisclosureProps &
  PickerStatusContextValue & {
    readOnly: boolean;
    multiple?: boolean;
    closeOnSelect: boolean;
  };

export function usePicker(options: UsePickerOptions): {
  rootContextValue: PickerRootContextValue;
  statusContextValue: PickerStatusContextValue;
  triggerContextValue: PopperTriggerContextValue;
  floatingContextValue: PopperFloatingContextValue;
  positionerContextValue: PopperPositionerContextValue;
  transitionContextValue: PopperTransitionContextValue;
} {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    duration = 250,
    disabled,
    readOnly,
    required,
    invalid,
    multiple,
    placeholder,
    closeOnSelect,
    size,
  } = options;

  const [openState, { handleOpen, handleClose }] = useDisclosure({
    open,
    defaultOpen,
    onOpenChange,
  });

  const { refs, context, elements, floatingStyles } = useFloating<HTMLDivElement>({
    middleware: [offset(6), flip()],
    open: openState,
    onOpenChange: (opened, _e, reason) => {
      if (opened) {
        handleOpen();
      } else {
        handleClose();

        if (reason != "focus-out" && reason != "outside-press") {
          requestAnimationFrame(() => {
            elements.domReference?.focus();
          });
        }
      }
    },
    placement: "bottom",
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useRole(context, { role: "dialog" }),
    useClick(context, {
      enabled: !disabled && !readOnly,
      keyboardHandlers: closeOnSelect && !multiple,
    }),
    useDismiss(context, {
      enabled: !disabled && !readOnly,
    }),
  ]);

  const { isMounted, status } = useTransitionStatus(context, {
    duration,
  });

  const triggerContextValue: PopperTriggerContextValue = {
    setReference: refs.setReference,
    getReferenceProps,
  };

  const floatingContextValue: PopperFloatingContextValue = {
    getFloatingProps,
  };

  const transitionContextValue: PopperTransitionContextValue = {
    status,
    mounted: isMounted,
    duration,
  };

  const positionerContextValue: PopperPositionerContextValue = {
    setPositioner: refs.setFloating,
    positionerStyles: floatingStyles,
  };

  const statusContextValue: PickerStatusContextValue = {
    disabled,
    invalid,
    required,
    placeholder,
    size,
  };

  const rootContextValue: PickerRootContextValue = {
    context,
  };

  return {
    rootContextValue,
    statusContextValue,
    triggerContextValue,
    floatingContextValue,
    positionerContextValue,
    transitionContextValue,
  };
}
