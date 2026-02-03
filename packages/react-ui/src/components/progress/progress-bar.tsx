import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { ProgressBarRoot, type ProgressBarRootProps } from "./progress-bar-root";
import { ProgressBarSection, type ProgressBarSectionProps } from "./progress-bar-section";
import type { progressBarSizeStyles } from "./progress-bar.styles";

export type ProgressBarProps = Omit<ProgressBarRootProps, "size"> &
  ProgressBarSectionProps & {
    /**
     * 大小
     * @default "md"
     */
    size?: keyof typeof progressBarSizeStyles;
  };

export const ProgressBar = (
  props: PrimitiveProps<"div", ProgressBarProps, "children">,
): JSX.Element => {
  const {
    percent = 0,
    size = "md",
    color = "primary",
    radius = "full",
    orientation = "horizontal",
    striped = false,
    animated = false,
    ...rest
  } = props;

  return (
    <ProgressBarRoot size={size} radius={radius} orientation={orientation} {...rest}>
      <ProgressBarSection percent={percent} color={color} striped={striped} animated={animated} />
    </ProgressBarRoot>
  );
};

export {
  ProgressBarRoot,
  ProgressBarSection,
  type ProgressBarRootProps,
  type ProgressBarSectionProps,
};
