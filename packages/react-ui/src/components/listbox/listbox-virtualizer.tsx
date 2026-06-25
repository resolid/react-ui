import { omit } from "@resolid/utils";
import { type PropsWithChildren, type ReactNode, useMemo } from "react";
import type { ListboxFlatItem, ListboxNodeItem } from "./use-listbox";
import { useCollectionFields } from "../../primitives/collection/collection-fields-context";
import { useCollectionNodes } from "../../primitives/collection/collection-nodes-context";
import { useCollectionState } from "../../primitives/collection/collection-state-context";
import {
  CollectionVirtualizer,
  type CollectionVirtualizerBaseProps,
} from "../../primitives/collection/collection-virtualizer";
import { listboxGroupLabelHeights, listboxItemHeights } from "./listbox.styles";

export type ListboxVirtualizerProps = CollectionVirtualizerBaseProps & {
  /**
   * 项目的高度（以像素为单位）
   */
  itemHeight?: number;

  /**
   * 分组标签的高度（以像素为单位）
   */
  groupLabelHeight?: number;
};

export function ListboxVirtualizer({
  children,
  itemHeight,
  groupLabelHeight,
  ...rest
}: PropsWithChildren<ListboxVirtualizerProps>): ReactNode {
  const { size } = useCollectionState();
  const { nodeItems } = useCollectionNodes<ListboxNodeItem>();
  const { getItemChildren, childrenKey } = useCollectionFields();

  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const flat = useMemo(() => {
    const flatItems: ListboxFlatItem[] = [];
    const labelIndices: Set<number> = new Set();
    const groupIndices: number[] = [];

    let itemIndex = 0;
    let groupIndex = 0;

    for (const item of nodeItems) {
      const itemChildren = getItemChildren<ListboxNodeItem>(item);

      if (Array.isArray(itemChildren)) {
        labelIndices.add(itemIndex);
        groupIndices.push(groupIndex);

        flatItems.push({ ...(omit(item, [childrenKey]) as ListboxNodeItem), __group: true });
        itemIndex++;

        for (const child of itemChildren) {
          flatItems.push(child);
          itemIndex++;
          groupIndex++;
        }
      } else {
        flatItems.push(item);
        itemIndex++;
        groupIndex++;
      }
    }

    return { flatItems, labelIndices, groupIndices };
  }, [childrenKey, nodeItems, getItemChildren]);

  return (
    <CollectionVirtualizer
      itemHeight={itemHeight ?? listboxItemHeights[size]}
      labelHeight={groupLabelHeight ?? listboxGroupLabelHeights[size]}
      {...flat}
      {...rest}
    >
      {children}
    </CollectionVirtualizer>
  );
}
