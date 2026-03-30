import type { MouseEvent, RefObject } from "react";
import type { JSX } from "react/jsx-runtime";
import type { InputSize } from "../../components/input/input.styles";
import type { PrimitiveProps } from "../polymorphic";
import { CloseButton } from "../../components";
import { useLocale } from "../../components/provider/locale-context";
import { ariaAttr, tx } from "../../utils";
import { inputItemSizeStyles } from "./input-item.styles";

export type InputItemProps = {
  size: InputSize;
  disabled: boolean;
  finalRef: RefObject<HTMLElement | null>;
  onDelete: () => void;
};

export function InputItem(props: PrimitiveProps<"div", InputItemProps>): JSX.Element {
  const { size, disabled, finalRef, onDelete, className, children, ...rest } = props;

  const { t } = useLocale();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
    finalRef.current?.focus();
  };

  return (
    <div
      aria-disabled={ariaAttr(disabled)}
      className={tx(
        "inline-flex items-center gap-1 rounded-md pe-1",
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
        aria-label={t("inputItem.deleteTag")}
        size="1em"
      />
    </div>
  );
}
