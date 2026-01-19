import type { JSX } from "react";
import { useLocale } from "../../components/provider/locale-context";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../polymorphic";
import { useOptionEmpty } from "./option-empty-context";

export const OptionEmpty = ({
  className,
  children,
  ...rest
}: PrimitiveProps<"div">): JSX.Element | null => {
  const isEmpty = useOptionEmpty();
  const { t } = useLocale();

  if (isEmpty) {
    return (
      <div className={tx("py-2 text-center text-sm text-fg-subtlest", className)} {...rest}>
        {children ?? t("noData")}
      </div>
    );
  }

  return null;
};
