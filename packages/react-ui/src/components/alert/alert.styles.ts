import {
  type AlertAndBadgeShareStyles,
  alertAndBadgeShareStyles,
  type AlertAndBadgeVariants,
} from "../../shared/styles";
import { tv, type TvReturnType, type VP } from "../../utils/clsx";

export const alertStyles: TvReturnType<
  AlertAndBadgeVariants,
  undefined,
  string,
  AlertAndBadgeVariants,
  undefined,
  AlertAndBadgeShareStyles
> = tv({
  base: "relative rounded-md border p-4",
  extend: alertAndBadgeShareStyles,
});

export type AlertStyleProps = VP<typeof alertStyles>;
