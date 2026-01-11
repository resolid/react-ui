import { runIf } from "@resolid/utils";
import { type PropsWithChildren, type ReactElement, useReducer } from "react";
import type { JSX } from "react/jsx-runtime";
import { PortalLite } from "../portal/portal-lite";
import {
  type ToastConfig,
  ToastContext,
  type ToastContextValue,
  type ToastId,
  type ToastPlacement,
} from "./toast-context";
import { ToastRegion, type ToastRegionBaseProps } from "./toast-region";

export type ToastProviderProps = {
  /**
   * 自动关闭延时, 设置为 `null` 时不自动关闭
   * @default 5000
   */
  duration?: number | null;
} & Partial<ToastRegionBaseProps>;

type ToastState = {
  [K in ToastPlacement]: ToastConfig[];
};

type ToastAction =
  | { type: "ADD"; payload: { toast: ToastConfig } }
  | { type: "UPDATE"; payload: { id: ToastId; component: ReactElement; duration?: number | null } }
  | { type: "DISMISS"; payload: { id: ToastId } }
  | { type: "CLEAR"; payload: { placements?: ToastPlacement[] } }
  | { type: "REMOVE"; payload: { id: ToastId } };

const reducer = (state: ToastState, action: ToastAction) => {
  switch (action.type) {
    case "ADD": {
      const { toast } = action.payload;
      const placement = toast.placement;

      return {
        ...state,
        [placement]:
          placement.slice(0, 3) == "top"
            ? [toast, ...state[placement]]
            : [...state[placement], toast],
      };
    }
    case "UPDATE": {
      const { id, component, duration } = action.payload;

      const [placement, index] = getPlacementAndIndexById(state, id);

      if (placement == undefined || index == undefined) {
        return state;
      }

      return {
        ...state,
        [placement]: [
          ...state[placement].slice(0, index),
          {
            id,
            duration: duration !== undefined ? duration : state[placement][index].duration,
            component: () => component,
            update: true,
            dismiss: false,
          },
          ...state[placement].slice(index + 1),
        ],
      };
    }
    case "DISMISS": {
      const { id } = action.payload;

      const [placement, index] = getPlacementAndIndexById(state, id);

      if (placement == undefined || index == undefined) {
        return state;
      }

      return {
        ...state,
        [placement]: [
          ...state[placement].slice(0, index),
          { ...state[placement][index], dismiss: true },
          ...state[placement].slice(index + 1),
        ],
      };
    }
    case "CLEAR": {
      const placements =
        !action.payload.placements || action.payload.placements.length == 0
          ? ([
              "bottom",
              "bottom-start",
              "bottom-end",
              "top",
              "top-start",
              "top-end",
            ] as ToastPlacement[])
          : action.payload.placements;

      const result = { ...state };

      for (const placement of placements) {
        result[placement] = state[placement].map((toast) => ({ ...toast, dismiss: true }));
      }

      return result;
    }
    case "REMOVE": {
      const { id } = action.payload;

      const [placement, index] = getPlacementAndIndexById(state, id);

      if (placement == undefined || index == undefined) {
        return state;
      }

      return {
        ...state,
        [placement]: [...state[placement].slice(0, index), ...state[placement].slice(index + 1)],
      };
    }
    default:
      return state;
  }
};

export const ToastProvider = ({
  placement = "bottom-end",
  duration = 5000,
  spacing = "0.75rem",
  visibleToasts = 5,
  children,
}: PropsWithChildren<ToastProviderProps>): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    "top-start": [],
    top: [],
    "top-end": [],
    "bottom-start": [],
    bottom: [],
    "bottom-end": [],
  });

  const context: ToastContextValue = {
    show: (component, options) => {
      const toastId = options?.id ?? `t-${Math.random().toString(36).slice(2, 9)}`;

      dispatch({
        type: "ADD",
        payload: {
          toast: {
            id: toastId,
            placement: options?.placement ?? placement,
            duration: options?.duration === undefined ? duration : options.duration,
            component: () => component,
            update: false,
            dismiss: false,
          },
        },
      });

      return toastId;
    },
    update: (id, component) => {
      dispatch({ type: "UPDATE", payload: { id, component } });
    },
    dismiss: (id) => {
      dispatch({ type: "DISMISS", payload: { id } });
    },
    promise: (promise, component, options) => {
      const originalDuration = options?.duration === undefined ? duration : options.duration;

      const toastId = context.show(component({ state: "pending" }), { ...options, duration: null });

      runIf(promise)
        .then((data) => {
          dispatch({
            type: "UPDATE",
            payload: {
              id: toastId,
              component: component({ state: "success", data }),
              duration: originalDuration,
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: "UPDATE",
            payload: {
              id: toastId,
              component: component({ state: "failure", error }),
              duration: originalDuration,
            },
          });
        });

      return toastId;
    },
    clear: (...args) => {
      dispatch({ type: "CLEAR", payload: { placements: args } });
    },
  };

  const remove = (id: ToastId) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  return (
    <ToastContext value={context}>
      {children}
      <PortalLite>
        {Object.entries(state).map(([placement, toasts]) => {
          if (toasts.length == 0) {
            return null;
          }

          return (
            <ToastRegion
              key={placement}
              placement={placement as ToastPlacement}
              spacing={spacing}
              visibleToasts={visibleToasts}
              toasts={toasts}
              remove={remove}
            />
          );
        })}
      </PortalLite>
    </ToastContext>
  );
};

const getPlacementAndIndexById = (
  state: ToastState,
  id: ToastId,
): [ToastPlacement | undefined, number | undefined] => {
  for (const [placement, toasts] of Object.entries(state)) {
    const index = toasts.findIndex((toast) => toast.id == id);

    if (index > -1) {
      return [placement as ToastPlacement, index];
    }
  }

  return [undefined, undefined];
};
