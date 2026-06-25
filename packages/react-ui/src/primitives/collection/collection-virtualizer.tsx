import { useVirtualizer } from "@tanstack/react-virtual";
import { type PropsWithChildren, type ReactNode, useLayoutEffect } from "react";
import type { CollectionItem } from "./types";
import { usePopperFloating } from "../popper/popper-floating-context";
import { useCollectionScroll } from "./collection-scroll-context";
import { CollectionVirtualizerContext } from "./collection-virtualizer-context";

export type CollectionVirtualizerBaseProps = {
  /**
   * 在可见区域上方和下方渲染的项目数
   * @default 3
   */
  overscan?: number;

  /**
   * 应用于虚拟器开始处的填充（以像素为单位）
   * @default 4
   */
  paddingStart?: number;

  /**
   * 应用于虚拟器末尾的填充（以像素为单位）
   * @default 4
   */
  paddingEnd?: number;

  /**
   * 滚动到元素时应用于虚拟器开始处的填充（以像素为单位）
   * @default 17
   */
  scrollPaddingStart?: number;

  /**
   * 滚动到元素时应用于虚拟器末尾的填充（以像素为单位）
   * @default 17
   */
  scrollPaddingEnd?: number;

  /**
   * 虚拟化列表中项目之间的间距
   */
  gap?: number;

  /**
   * 将 ResizeObserver 封装在 requestAnimationFrame 中，实现更顺畅的更新并减少布局抖动
   * @default false
   */
  useAnimationFrameWithResizeObserver?: boolean;
};

type CollectionVirtualizerProps<T extends CollectionItem> = CollectionVirtualizerBaseProps & {
  flatItems: T[];
  labelIndices: Set<number>;
  groupIndices: number[];
  itemHeight: number;
  labelHeight: number;
};

export function CollectionVirtualizer<T extends CollectionItem>({
  itemHeight,
  labelHeight,
  overscan = 3,
  paddingStart = 4,
  paddingEnd = 4,
  scrollPaddingStart = 4,
  scrollPaddingEnd = 4,
  gap,
  useAnimationFrameWithResizeObserver = false,
  flatItems,
  labelIndices,
  groupIndices,
  children,
}: PropsWithChildren<CollectionVirtualizerProps<T>>): ReactNode {
  const { getFloatingProps } = usePopperFloating();
  const { scrollToRef, scrollRef } = useCollectionScroll();

  const { virtualItems, totalSize, scrollToIndex } = useVirtualizerCompiler({
    count: flatItems.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => (labelIndices.has(index) ? labelHeight : itemHeight),
    overscan,
    paddingStart,
    paddingEnd,
    scrollPaddingStart,
    scrollPaddingEnd,
    gap,
    useAnimationFrameWithResizeObserver,
  });

  useLayoutEffect(() => {
    scrollToRef.current = (index, options) => {
      const scrollIndex =
        index > 0 ? index + groupIndices.reduce((acc, num) => acc + (num <= index ? 1 : 0), 0) : 0;

      scrollToIndex(scrollIndex, options);
    };

    return () => {
      scrollToRef.current = null;
    };
  }, [groupIndices, scrollToIndex, scrollToRef]);

  return (
    <div
      className="relative w-full outline-none"
      style={{ height: `${totalSize}px` }}
      {...getFloatingProps()}
    >
      <CollectionVirtualizerContext value={{ virtualItems, flatItems }}>
        {children}
      </CollectionVirtualizerContext>
    </div>
  );
}

// oxlint-disable-next-line react/react-compiler
function useVirtualizerCompiler(options: Parameters<typeof useVirtualizer>[0]) {
  "use no memo";

  // oxlint-disable-next-line react-hooks-js/incompatible-library
  const { getVirtualItems, getTotalSize, scrollToIndex } = useVirtualizer(options);

  return { virtualItems: getVirtualItems(), totalSize: getTotalSize(), scrollToIndex };
}
