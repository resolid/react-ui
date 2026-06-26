import type { PropsWithChildren, ReactNode } from "react";
import type { ListboxFlatItem } from "./use-listbox";
import { useCollectionFlat } from "../../primitives/collection/collection-flat-context";
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
  const { flatItems } = useCollectionFlat<ListboxFlatItem>();

  const estimateSize = (index: number) => {
    return flatItems[index]?.__group
      ? (groupLabelHeight ?? listboxGroupLabelHeights[size])
      : (itemHeight ?? listboxItemHeights[size]);
  };

  return (
    <CollectionVirtualizer totalCount={flatItems.length} estimateSize={estimateSize} {...rest}>
      {children}
    </CollectionVirtualizer>
  );
}
