import type { JSX } from "react";
import { AngleDownIcon } from "../../shared/icons";
import { tx } from "../../utils";

export const SelectChevron = ({ className }: { className: string }): JSX.Element => {
  return (
    <span
      className={tx(
        "pointer-events-none absolute end-0 top-0 bottom-0 flex items-center justify-center",
        className,
      )}
    >
      <AngleDownIcon className={"text-fg-subtle"} />
    </span>
  );
};
