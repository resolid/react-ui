import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import type { InputSize } from "../input/input.styles";
import type { ListboxItem } from "./use-listbox";
import { tx } from "../../utils/clsx";
import { useListboxGroup } from "./listbox-group-context";
import { listboxGroupLabelStyles } from "./listbox.styles";

type ListboxGroupLabelProps = {
  group: ListboxItem;
  size: InputSize;
};

export function ListboxGroupLabel(
  props: PrimitiveProps<"div", ListboxGroupLabelProps, "children">,
): ReactNode {
  const { group, size, className, ...rest } = props;

  const { renderGroupLabel } = useListboxGroup();

  return (
    <div
      className={tx(
        "flex w-full items-center px-1 text-[0.9em] leading-none text-fg-subtle",
        listboxGroupLabelStyles[size],
        className,
      )}
      {...rest}
    >
      {
        // react-doctor-disable-next-line react-doctor/no-render-in-render
        renderGroupLabel(group)
      }
    </div>
  );
}
