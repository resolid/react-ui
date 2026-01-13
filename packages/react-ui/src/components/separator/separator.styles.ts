import { tv, type TvReturnType, type VP } from "../../utils";

type SeparatorVariants = {
  color: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    neutral: string;
  };
  variant: {
    solid: string;
    dashed: string;
    dotted: string;
  };
  orientation: {
    horizontal: string;
    vertical: string;
  };
  label: {
    true: string;
    false: string;
  };
  position: {
    left: string;
    right: string;
    center: string;
  };
};

export const separatorStyles: TvReturnType<
  SeparatorVariants,
  undefined,
  string,
  SeparatorVariants,
  undefined
> = tv({
  base: "m-0 border-0",
  variants: {
    color: {
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
      neutral: "",
    },
    variant: {
      solid: "",
      dashed: "",
      dotted: "",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "h-auto self-stretch",
    },
    label: {
      true: `flex items-center text-xs before:me-2 before:h-0 before:shrink before:content-[""] after:ms-2 after:h-0 after:shrink after:content-[""]`,
      false: "",
    },
    position: {
      left: "",
      right: "",
      center: "",
    },
  },
  compoundVariants: [
    {
      label: false,
      orientation: "horizontal",
      class: "border-t-(length:--sv)",
    },
    {
      label: false,
      orientation: "vertical",
      class: "border-s-(length:--sv)",
    },
    {
      label: true,
      class: "before:border-t-(length:--sv) after:border-t-(length:--sv)",
    },
    {
      label: false,
      variant: "solid",
      class: "border-solid",
    },
    {
      label: false,
      variant: "dotted",
      class: "border-dotted",
    },
    {
      label: false,
      variant: "dashed",
      class: "border-dashed",
    },
    {
      label: true,
      variant: "solid",
      class: "before:border-solid after:border-solid",
    },
    {
      label: true,
      variant: "dotted",
      class: "before:border-dotted after:border-dotted",
    },
    {
      label: true,
      variant: "dashed",
      class: "before:border-dashed after:border-dashed",
    },
    {
      label: false,
      color: "primary",
      class: "border-bg-primary-pressed",
    },
    {
      label: false,
      color: "secondary",
      class: "border-bg-secondary-pressed",
    },
    {
      label: false,
      color: "success",
      class: "border-bg-success-pressed",
    },
    {
      label: false,
      color: "warning",
      class: "border-bg-warning-pressed",
    },
    {
      label: false,
      color: "danger",
      class: "border-bg-danger-pressed",
    },
    {
      label: false,
      color: "neutral",
      class: "border-bg-neutral-pressed",
    },
    {
      label: true,
      color: "primary",
      class: "before:border-bg-primary-pressed after:border-bg-primary-pressed",
    },
    {
      label: true,
      color: "secondary",
      class: "before:border-bg-secondary-pressed after:border-bg-secondary-pressed",
    },
    {
      label: true,
      color: "success",
      class: "before:border-bg-success-pressed after:border-bg-success-pressed",
    },
    {
      label: true,
      color: "warning",
      class: "before:border-bg-warning-pressed after:border-bg-warning-pressed",
    },
    {
      label: true,
      color: "danger",
      class: "before:border-bg-danger-pressed after:border-bg-danger-pressed",
    },
    {
      label: true,
      color: "neutral",
      class: "before:border-bg-neutral-pressed after:border-bg-neutral-pressed",
    },
    {
      label: true,
      position: "center",
      class: "before:grow before:basis-0 after:grow after:basis-0",
    },
    {
      label: true,
      position: "left",
      class: "before:grow-0 before:basis-[5%] after:grow after:basis-0",
    },
    {
      label: true,
      position: "right",
      class: "before:grow before:basis-0 after:grow-0 after:basis-[5%]",
    },
  ],
});

export type SeparatorStyleProps = VP<typeof separatorStyles>;
