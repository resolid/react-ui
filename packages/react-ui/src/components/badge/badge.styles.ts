import {
  type AlertAndBadgeShareStyles,
  alertAndBadgeShareStyles,
  type AlertAndBadgeVariants,
} from "../../shared/styles";
import { tv, type TvReturnType, type VP } from "../../utils";

export const badgeStyles: TvReturnType<
  AlertAndBadgeVariants,
  undefined,
  string,
  AlertAndBadgeVariants,
  undefined,
  AlertAndBadgeShareStyles
> = tv({
  base: "inline-flex items-center border px-2 py-1 text-xs",
  extend: alertAndBadgeShareStyles,
});

export type BadgeStyleProps = VP<typeof badgeStyles>;
