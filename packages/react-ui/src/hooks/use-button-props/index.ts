import type { AriaRole, ButtonHTMLAttributes } from "react";

export type UseButtonPropsOptions = {
  hasRender: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  role?: AriaRole;
  disabled?: boolean;
  tabIndex?: number;
};

export function useButtonProps(options: UseButtonPropsOptions): {
  type: "submit" | "reset" | "button" | undefined;
  role: string | (string & {}) | undefined;
  disabled: boolean | undefined;
  tabIndex: number | undefined;
  "aria-disabled": boolean | undefined;
} {
  const { hasRender, type = "button", role, disabled = false, tabIndex } = options;

  return {
    type: !hasRender ? type : undefined,
    role: role && role !== "button" ? role : hasRender ? "button" : undefined,
    disabled: !hasRender ? disabled : undefined,
    tabIndex: tabIndex ?? (hasRender && !disabled ? 0 : undefined),
    "aria-disabled": hasRender && disabled ? true : undefined,
  };
}
