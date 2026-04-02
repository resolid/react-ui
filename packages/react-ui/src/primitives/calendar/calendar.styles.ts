export const calendarSizeStyles = {
  sm: {
    dayCellSize: "size-8",
    monthCellSize: "h-[calc((var(--spacing)*48+36px)/4)] w-[calc((var(--spacing)*56+8.015px)/3)]",
    textSize: "text-xs",
  },
  md: {
    dayCellSize: "size-9",
    monthCellSize: "h-[calc((var(--spacing)*54+36px)/4)] w-[calc((var(--spacing)*63+8.015px)/3)]",
    textSize: "text-sm",
  },
  lg: {
    dayCellSize: "size-10",
    monthCellSize: "h-[calc((var(--spacing)*60+36px)/4)] w-[calc((var(--spacing)*70+8.015px)/3)]",
    textSize: "",
  },
};

export type CalendarSize = keyof typeof calendarSizeStyles;

export const calendarColorStyles = {
  primary: {
    base: "focus-visible:outline-bg-primary-emphasis/70",
    today: "not-selected:decoration-fg-primary",
  },
  secondary: {
    base: "focus-visible:outline-bg-secondary-emphasis/70",
    today: "not-selected:decoration-fg-secondary",
  },
  success: {
    base: "focus-visible:outline-bg-success-emphasis/70",
    today: "not-selected:decoration-fg-success",
  },
  warning: {
    base: "focus-visible:outline-bg-warning-emphasis/70",
    today: "not-selected:decoration-fg-warning",
  },
  danger: {
    base: "focus-visible:outline-bg-danger-emphasis/70",
    today: "not-selected:decoration-fg-danger",
  },
  neutral: {
    base: "focus-visible:outline-bg-neutral-emphasis/70",
    today: "not-selected:decoration-fg-neutral",
  },
};

export type CalendarColor = keyof typeof calendarColorStyles;

export const calendarBaseStyles =
  "inline-flex items-center justify-center select-none rounded-md outline-transparent";

export const calendarCurrentStyles = "font-medium underline decoration-2 underline-offset-4";
