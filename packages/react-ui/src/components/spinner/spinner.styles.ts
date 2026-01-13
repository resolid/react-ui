import { tv, type TvReturnType, type VP } from "../../utils";

type SpinnerVariants = {
  size: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  color: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    neutral: string;
  };
};

export const spinnerStyles: TvReturnType<
  SpinnerVariants,
  undefined,
  string,
  SpinnerVariants,
  undefined
> = tv({
  base: "inline-block animate-spin rounded-full",
  variants: {
    size: {
      xs: "h-3 w-3 border-2",
      sm: "h-4 w-4 border-2",
      md: "h-5 w-5 border-2",
      lg: "h-6 w-6 border-3",
      xl: "h-7 w-7 border-3",
    },
    color: {
      primary: "border-s-bg-primary border-e-fg-primary border-t-fg-primary border-b-bg-primary",
      secondary:
        "border-s-bg-secondary border-e-fg-secondary border-t-fg-secondary border-b-bg-secondary",
      success: "border-s-bg-success border-e-fg-success border-t-fg-success border-b-bg-success",
      warning: "border-s-bg-warning border-e-fg-warning border-t-fg-warning border-b-bg-warning",
      danger: "border-s-bg-danger border-e-fg-danger border-t-fg-danger border-b-bg-danger",
      neutral: "border-t-fg-neutral border-e-fg-neutral border-s-bg-neutral border-b-bg-neutral",
    },
  },
});

export type SpinnerStyleProps = VP<typeof spinnerStyles>;
