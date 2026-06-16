import type { MouseEvent, ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";
import { useLocale } from "../../components/provider/locale-context";
import { CloseIcon } from "../../shared/icons";
import { tx } from "../../utils/clsx";
import { useInputClear } from "./input-clear-context";

export function InputClear(
  props: PrimitiveProps<"button", EmptyObject, "disabled" | "children">,
): ReactNode {
  const { className, ...rest } = props;

  const { t } = useLocale();
  const { visible, disabled, onClear } = useInputClear();

  if (!visible) {
    return null;
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClear();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={tx(!disabled && "cursor-pointer", className)}
      aria-label={t("input.clear")}
      {...rest}
    >
      <CloseIcon size="1.25em" />
    </button>
  );
}
