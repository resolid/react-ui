import type { JSX } from "react";
import type { PrimitiveProps } from "../polymorphic";
import { useLocale } from "../../components/provider/locale-context";
import { tx } from "../../utils";
import { useOptionEmpty } from "./option-empty-context";

export function OptionEmpty({
  className,
  children,
  ...rest
}: PrimitiveProps<"div">): JSX.Element | null {
  const { t } = useLocale();
  const empty = useOptionEmpty();

  if (!empty) {
    return null;
  }

  return (
    <div className={tx("py-2 text-center text-sm text-fg-subtlest", className)} {...rest}>
      {children ?? t("noData")}
    </div>
  );
}
