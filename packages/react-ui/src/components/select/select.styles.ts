export const selectSizeStyles = {
  xs: {
    select: "pe-7",
    chevron: "px-1.5",
    native: "ps-2.5",
    root: "ps-1",
  },
  sm: {
    select: "pe-8",
    chevron: "px-2",
    native: "ps-3",
    root: "ps-1",
  },
  md: {
    select: "pe-8",
    chevron: "px-2",
    native: "ps-3.5",
    root: "ps-1.5",
  },
  lg: {
    select: "pe-10",
    chevron: "px-2",
    native: "ps-4",
    root: "ps-1.5",
  },
  xl: {
    select: "pe-10",
    chevron: "px-2.5",
    native: "ps-4",
    root: "ps-1.5",
  },
};

export const selectChevronStyle =
  "pointer-events-none absolute inset-e-0 top-0 bottom-0 flex items-center justify-center";

export type SelectSize = keyof typeof selectSizeStyles;
