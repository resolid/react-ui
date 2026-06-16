import type { ReactNode } from "react";
import { AngleDownIcon } from "../../shared/icons";
import { tx } from "../../utils/clsx";
import { selectChevronStyle } from "./select.styles";

export function SelectChevron({ className }: { className: string }): ReactNode {
  return (
    <span className={tx(selectChevronStyle, className)}>
      <AngleDownIcon className="text-fg-subtle" />
    </span>
  );
}
