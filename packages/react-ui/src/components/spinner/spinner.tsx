import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useLocale } from "../provider/locale-context";
import { VisuallyHidden } from "../visually-hidden/visually-hidden";
import { type SpinnerStyleProps, spinnerStyles } from "./spinner.styles";

export type SpinnerProps = {
  /**
   * 颜色
   * @default "primary"
   */
  color?: SpinnerStyleProps["color"];

  /**
   * 大小
   * @default "md"
   */
  size?: SpinnerStyleProps["size"];

  /**
   * 标签
   * @default "加载中"
   */
  label?: string;
};

export const Spinner = (props: PrimitiveProps<"span", SpinnerProps>): JSX.Element => {
  const { t } = useLocale();

  const {
    label = t("spinner.loading"),
    className,
    size = "md",
    color = "primary",
    ...rest
  } = props;

  return (
    <span className={tx(spinnerStyles({ color, size }), className)} {...rest}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </span>
  );
};
