import type { SVGAttributes } from "react";
import type { JSX } from "react/jsx-runtime";

type IconProps = Omit<
  SVGAttributes<HTMLOrSVGElement>,
  "viewBox" | "stroke" | "strokeWidth" | "strokeLinejoin" | "strokeLinecap" | "fill" | "style"
> & { size?: string };

export function CloseIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function AngleLeftIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      {...rest}
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export function AngleRightIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      {...rest}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function AngleUpIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      {...rest}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function AngleDownIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      {...rest}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CheckedIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 12 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="16"
      strokeDashoffset="0"
      {...rest}
    >
      <polyline points="1.5 6 4.5 9 10.5 1" />
    </svg>
  );
}

export function IndeterminateIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="4"
      {...rest}
    >
      <line x1="21" x2="3" y1="12" y2="12" />
    </svg>
  );
}

export function SearchIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg style={{ width: size }} viewBox="0 0 24 24" {...rest}>
      <path
        fill="currentColor"
        d="M21.71 20.29 18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg style={{ width: size }} viewBox="0 0 24 24" {...rest}>
      <path
        fill="currentColor"
        d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7h16Zm0-9H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1Z"
      />
    </svg>
  );
}

export function CalendarRangeIcon(props: IconProps): JSX.Element {
  const { size = "1em", ...rest } = props;

  return (
    <svg style={{ width: size }} viewBox="0 0 24 24" {...rest}>
      <path
        fill="currentColor"
        d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7h16Zm0-9H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1Z"
      />
      <path
        fill="currentColor"
        d="M17.96 15.772a.6.6 0 0 0-.126-.198l-2.401-2.402a.603.603 0 1 0-.853.853l1.381 1.375H8.049l1.38-1.375a.603.603 0 0 0-.852-.853l-2.4 2.402a.6.6 0 0 0-.127.198.6.6 0 0 0 0 .456.6.6 0 0 0 .126.198l2.401 2.401a.6.6 0 0 0 .853 0 .6.6 0 0 0 0-.852L8.049 16.6h7.912l-1.38 1.375a.6.6 0 0 0 0 .852.6.6 0 0 0 .852 0l2.4-2.4a.6.6 0 0 0 .127-.199.6.6 0 0 0 0-.456"
      />
    </svg>
  );
}
