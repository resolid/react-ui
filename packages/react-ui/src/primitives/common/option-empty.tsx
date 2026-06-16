import type { ReactNode } from "react";
import type { PrimitiveProps } from "../polymorphic";
import { useLocale } from "../../components/provider/locale-context";
import { tx } from "../../utils/clsx";
import { useOptionEmpty } from "./option-empty-context";

export function OptionEmpty({ className, children, ...rest }: PrimitiveProps<"div">): ReactNode {
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
