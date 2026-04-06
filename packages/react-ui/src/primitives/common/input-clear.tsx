import type { MouseEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";
import { useLocale } from "../../components/provider/locale-context";
import { CloseIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { useInputClear } from "./input-clear-context";

export function InputClear(
  props: PrimitiveProps<"button", EmptyObject, "disabled" | "children">,
): JSX.Element | null {
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
