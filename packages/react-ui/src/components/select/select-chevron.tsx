import type { JSX } from "react";
import { AngleDownIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { selectChevronStyle } from "./select.styles";

export function SelectChevron({ className }: { className: string }): JSX.Element {
  return (
    <span className={tx(selectChevronStyle, className)}>
      <AngleDownIcon className="text-fg-subtle" />
    </span>
  );
}
