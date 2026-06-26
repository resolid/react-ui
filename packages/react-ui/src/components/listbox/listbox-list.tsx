import type { CSSProperties, ReactNode } from "react";
import type { ListboxFlatItem } from "./use-listbox";
import { useCollectionFlat } from "../../primitives/collection/collection-flat-context";
import { useCollectionState } from "../../primitives/collection/collection-state-context";
import { useCollectionVirtualizer } from "../../primitives/collection/collection-virtualizer-context";
import { ListboxGroupLabel } from "./listbox-group-label";
import { ListboxItem } from "./listbox-item";

export type ListboxListProps = {
  checkmark?: boolean;
};

export function ListboxList({ checkmark }: ListboxListProps): ReactNode[] {
  const { flatItems } = useCollectionFlat<ListboxFlatItem>();

  const virtualizer = useCollectionVirtualizer();

  if (!virtualizer) {
    return flatItems.map((item) => <Item key={item.__key} item={item} checkmark={checkmark} />);
  }

  const setSize = flatItems.length;

  return virtualizer.virtualItems.map((row) => {
    const item = flatItems[row.index]!;

    return (
      <Item
        key={item.__key}
        item={item}
        setSize={setSize}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translateY(${row.start}px)`,
          overflowAnchor: "none",
        }}
      />
    );
  });
}

const Item = ({
  item,
  style,
  checkmark = true,
  setSize,
}: {
  item: ListboxFlatItem;
  style?: CSSProperties;
  checkmark?: boolean;
  setSize?: number;
}) => {
  const { size, disabled, readOnly } = useCollectionState();

  if (item.__group) {
    return <ListboxGroupLabel group={item} size={size} style={style} />;
  }

  return (
    <ListboxItem
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
};
