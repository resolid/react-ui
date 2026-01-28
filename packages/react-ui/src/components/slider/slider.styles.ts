export const sliderSizeStyles = {
  xs: {
    heigh: "0.25em",
    width: "0.25em",
    border: "border-2",
    thumb: { width: 12, height: 12 },
  },
  sm: {
    heigh: "0.375em",
    width: "0.375em",
    border: "border-3",
    thumb: { width: 16, height: 16 },
  },
  md: {
    heigh: "0.5em",
    width: "0.5em",
    border: "border-3",
    thumb: { width: 20, height: 20 },
  },
  lg: {
    heigh: "0.625em",
    width: "0.625em",
    border: "border-3",
    thumb: { width: 24, height: 24 },
  },
  xl: {
    heigh: "0.75em",
    width: "0.75em",
    border: "border-4",
    thumb: { width: 28, height: 28 },
  },
};

export type SliderSize = keyof typeof sliderSizeStyles;

export const sliderColorStyles = {
  primary: {
    track: "bg-bg-primary-emphasis",
    thumb: {
      enable: "border-bg-primary-emphasis focus-visible:outline-bg-primary-pressed",
      disable: "border-bg-primary-emphasis/75",
    },
  },
  secondary: {
    track: "bg-bg-secondary-emphasis",
    thumb: {
      enable: "border-bg-secondary-emphasis focus-visible:outline-bg-secondary-pressed",
      disable: "border-bg-secondary-emphasis/75",
    },
  },
  success: {
    track: "bg-bg-success-emphasis",
    thumb: {
      enable: "border-bg-success-emphasis focus-visible:outline-bg-success-pressed",
      disable: "border-bg-success-emphasis/75",
    },
  },
  warning: {
    track: "bg-bg-warning-emphasis",
    thumb: {
      enable: "border-bg-warning-emphasis  focus-visible:outline-bg-warning-pressed",
      disable: "border-bg-warning-emphasis/75",
    },
  },
  danger: {
    track: "bg-bg-danger-emphasis",
    thumb: {
      enable: "border-bg-danger-emphasis focus-visible:outline-bg-danger-pressed",
      disable: "border-bg-danger-emphasis/75",
    },
  },
  neutral: {
    track: "bg-bg-neutral-emphasis",
    thumb: {
      enable: "border-bg-neutral-emphasis  focus-visible:outline-bg-neutral-pressed",
      disable: "border-bg-neutral-emphasis/75",
    },
  },
};

export type SliderColor = keyof typeof sliderColorStyles;
