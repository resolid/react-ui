import { tv, type TvReturnType } from "../utils";

export const inputTextShareStyles = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-base",
  xl: "text-lg",
};

export const toggleLabelShareStyles = "gap-(--sv) relative inline-flex items-center";

export const toggleControlShareStyles =
  "inline-flex shrink-0 select-none border-2 outline-2 outline-offset-2 outline-transparent";

export const toggleColorShareStyles = {
  primary: {
    focus: "peer-focus-visible:outline-bg-primary-emphasis/70",
    checked: "bg-bg-primary-emphasis",
  },
  secondary: {
    focus: "peer-focus-visible:outline-bg-secondary-emphasis/70",
    checked: "bg-bg-secondary-emphasis",
  },
  success: {
    focus: "peer-focus-visible:outline-bg-success-emphasis/70",
    checked: "bg-bg-success-emphasis",
  },
  warning: {
    focus: "peer-focus-visible:outline-bg-warning-emphasis/70",
    checked: "bg-bg-warning-emphasis",
  },
  danger: {
    focus: "peer-focus-visible:outline-bg-danger-emphasis/70",
    checked: "bg-bg-danger-emphasis",
  },
  neutral: {
    focus: "peer-focus-visible:outline-bg-neutral-emphasis/70",
    checked: "bg-bg-neutral-emphasis",
  },
};

export type ToggleColor = keyof typeof toggleColorShareStyles;

type BinaryColorShareStyles = {
  primary: {
    border: string;
    focus: string;
    checked: string;
  };
  secondary: {
    border: string;
    focus: string;
    checked: string;
  };
  success: {
    border: string;
    focus: string;
    checked: string;
  };
  warning: {
    border: string;
    focus: string;
    checked: string;
  };
  danger: {
    border: string;
    focus: string;
    checked: string;
  };
  neutral: {
    border: string;
    focus: string;
    checked: string;
  };
};

export const binaryColorShareStyles: BinaryColorShareStyles = {
  primary: {
    ...toggleColorShareStyles.primary,
    border: "border-bg-primary-emphasis",
  },
  secondary: {
    ...toggleColorShareStyles.secondary,
    border: "border-bg-secondary-emphasis",
  },
  success: {
    ...toggleColorShareStyles.success,
    border: "border-bg-success-emphasis",
  },
  warning: {
    ...toggleColorShareStyles.warning,
    border: "border-bg-warning-emphasis",
  },
  danger: {
    ...toggleColorShareStyles.danger,
    border: "border-bg-danger-emphasis",
  },
  neutral: {
    ...toggleColorShareStyles.neutral,
    border: "border-bg-neutral-emphasis",
  },
};

export const binarySizeShareStyles = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

export type BinarySize = keyof typeof binarySizeShareStyles;

export type AlertAndBadgeVariants = {
  variant: {
    solid: string;
    outline: string;
    subtle: string;
    soft: string;
  };
  color: {
    primary: string;
    secondary: string;
    neutral: string;
    success: string;
    warning: string;
    danger: string;
  };
};

export type AlertAndBadgeShareStyles = TvReturnType<
  AlertAndBadgeVariants,
  undefined,
  undefined,
  AlertAndBadgeVariants,
  undefined
>;

export const alertAndBadgeShareStyles: AlertAndBadgeShareStyles = tv({
  variants: {
    variant: {
      solid: "border-transparent text-fg-emphasized",
      outline: "border-current bg-bg-normal",
      subtle: "border-current",
      soft: "border-transparent",
    },
    color: {
      primary: "",
      secondary: "",
      neutral: "",
      success: "",
      warning: "",
      danger: "",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "solid",
      className: "bg-bg-primary-emphasis",
    },
    {
      color: "primary",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-primary",
    },
    {
      color: "primary",
      variant: ["soft", "subtle"],
      className: "bg-bg-primary",
    },
    {
      color: "secondary",
      variant: "solid",
      className: "bg-bg-secondary-emphasis",
    },
    {
      color: "secondary",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-secondary",
    },
    {
      color: "secondary",
      variant: ["soft", "subtle"],
      className: "bg-bg-secondary",
    },
    {
      color: "success",
      variant: "solid",
      className: "bg-bg-success-emphasis",
    },
    {
      color: "success",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-success",
    },
    {
      color: "success",
      variant: ["soft", "subtle"],
      className: "bg-bg-success",
    },

    {
      color: "warning",
      variant: "solid",
      className: "bg-bg-warning-emphasis",
    },
    {
      color: "warning",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-warning",
    },
    {
      color: "warning",
      variant: ["soft", "subtle"],
      className: "bg-bg-warning",
    },
    {
      color: "danger",
      variant: "solid",
      className: "bg-bg-danger-emphasis",
    },
    {
      color: "danger",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-danger",
    },
    {
      color: "danger",
      variant: ["soft", "subtle"],
      className: "bg-bg-danger",
    },
    {
      color: "neutral",
      variant: "solid",
      className: "bg-bg-neutral-emphasis",
    },
    {
      color: "neutral",
      variant: ["soft", "subtle"],
      className: "bg-bg-neutral",
    },
  ],
});
