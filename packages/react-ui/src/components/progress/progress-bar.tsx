import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import type { progressBarSizeStyles } from "./progress-bar.styles";
import { ProgressBarRoot, type ProgressBarRootProps } from "./progress-bar-root";
import { ProgressBarSection, type ProgressBarSectionProps } from "./progress-bar-section";

export type ProgressBarProps = Omit<ProgressBarRootProps, "size"> &
  ProgressBarSectionProps & {
    /**
     * 大小
     * @default "md"
     */
    size?: keyof typeof progressBarSizeStyles;
  };

export function ProgressBar(props: PrimitiveProps<"div", ProgressBarProps, "children">): ReactNode {
  const {
    percent,
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
}
