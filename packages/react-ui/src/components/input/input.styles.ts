import { tv, type TvReturnType } from "../../utils";

export const inputPxStyles = {
  xs: "px-2.5",
  sm: "px-2.5",
  md: "px-3",
  lg: "px-3.5",
  xl: "px-3.5",
};

export const inputPyStyles = {
  xs: "py-1.25",
  sm: "py-1.25",
  md: "py-1.25",
  lg: "py-1.75",
  xl: "py-1.75",
};

export const inputHeightStyles = {
  xs: "min-h-6.5",
  sm: "min-h-7.5",
  md: "min-h-8.5",
  lg: "min-h-9.5",
  xl: "min-h-10.5",
};

export const selectHeightStyles = {
  xs: "min-h-7",
  sm: "min-h-8",
  md: "min-h-9",
  lg: "min-h-10",
  xl: "min-h-11",
};

type InputVariants = {
  disabled: {
    true: string;
    false: string;
  };
  invalid: {
    true: string;
    false: string;
  };
  active: {
    true: string;
    false: string;
  };
  focusable: {
    true: string;
    false: string;
  };
};

export const inputStyles: TvReturnType<
  InputVariants,
  undefined,
  string[],
  InputVariants,
  undefined
> = tv({
  base: [
    "relative inline-flex items-center rounded-md border",
    "outline-1 outline-transparent transition-colors",
  ],
  variants: {
    disabled: { true: "opacity-60", false: "" },
    invalid: { true: "border-bd-invalid", false: "border-bd-normal" },
    active: { true: "", false: "" },
    focusable: { true: "", false: "" },
  },
  compoundVariants: [
    {
      disabled: false,
      invalid: false,
      active: false,
      className: "not-focus-within:hover:border-bd-hovered",
    },
    {
      disabled: false,
      active: false,
      focusable: true,
      className:
        "focus-within:border-bg-primary-emphasis focus-within:outline-bg-primary-emphasis/70",
    },
  ],
});

export type InputSize = keyof typeof inputPxStyles;

export const inputAffixDefaultSizes = {
  xs: "26px",
  sm: "30px",
  md: "34px",
  lg: "38px",
  xl: "42px",
};

export const inputGroupStyles =
  "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none not-first:-ms-px";
