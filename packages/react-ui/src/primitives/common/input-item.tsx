import type { MouseEvent, ReactNode } from "react";
import type { InputSize } from "../../components/input/input.styles";
import type { PrimitiveProps } from "../polymorphic";
import { CloseButton } from "../../components/close-button/close-button";
import { useLocale } from "../../components/provider/locale-context";
import { tx } from "../../utils/clsx";
import { ariaAttr } from "../../utils/dom";
import { inputItemSizeStyles } from "./input-item.styles";

export type InputItemProps = {
  size: InputSize;
  disabled: boolean;
  onRemove: () => void;
};

export function InputItem(props: PrimitiveProps<"div", InputItemProps>): ReactNode {
  const { size, disabled, onRemove, className, children, ...rest } = props;

  const { t } = useLocale();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div
      aria-disabled={ariaAttr(disabled)}
      className={tx(
        "inline-flex items-center gap-1 rounded-md pe-1 text-nowrap",
        inputItemSizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
      <CloseButton
        radius="md"
        disabled={disabled}
        className={tx("pointer-events-auto", !disabled && "text-fg-subtlest hover:text-fg-muted")}
        onClick={handleClick}
        tabIndex={-1}
        noPadding
        aria-label={t("input.remove")}
        size="1em"
      />
    </div>
  );
}
