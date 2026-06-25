import type { CSSProperties, ReactNode } from "react";
import { isArray } from "@resolid/utils";
import type { ListboxFlatItem, ListboxNodeItem } from "./use-listbox";
import { useCollectionFields } from "../../primitives/collection/collection-fields-context";
import { useCollectionNodes } from "../../primitives/collection/collection-nodes-context";
import { useCollectionState } from "../../primitives/collection/collection-state-context";
import { useCollectionVirtualizer } from "../../primitives/collection/collection-virtualizer-context";
import { ListboxGroupLabel } from "./listbox-group-label";
import { ListboxItem } from "./listbox-item";

export type ListboxListProps = {
  checkmark?: boolean;
};

export function ListboxList({ checkmark = true }: ListboxListProps): ReactNode[] {
  const { size, disabled, readOnly } = useCollectionState();
  const { nodeItems } = useCollectionNodes<ListboxNodeItem>();
  const { getItemValue, getItemLabel, getItemChildren } = useCollectionFields();

  const virtual = useCollectionVirtualizer<ListboxFlatItem>();

  if (virtual) {
    const setSize = virtual.flatItems.length;

    return virtual.virtualItems.map((row) => {
      const item = virtual.flatItems[row.index]!;

      const style = {
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translateY(${row.start}px)`,
        overflowAnchor: "none",
      } as CSSProperties;

      return item.__group ? (
        <ListboxGroupLabel key={getItemLabel(item)} group={item} size={size} style={style} />
      ) : (
        <ListboxItem
          key={getItemValue(item)}
          item={item}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          checkmark={checkmark}
          aria-setsize={setSize}
          aria-posinset={item.__index + 1}
          style={style}
        />
      );
    });
  }

  return nodeItems.map((item) => {
    const children = getItemChildren<ListboxNodeItem>(item);

    return isArray(children) ? (
      // react-doctor-disable-next-line react-doctor/prefer-tag-over-role
      <div key={getItemLabel(item)} role="group">
        <ListboxGroupLabel group={item} size={size} />
        {children.map((child) => (
          <ListboxItem
            key={getItemValue(child)}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            checkmark={checkmark}
            item={child}
          />
        ))}
      </div>
    ) : (
      <ListboxItem
        key={getItemValue(item)}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        checkmark={checkmark}
        item={item}
      />
    );
  });
}
