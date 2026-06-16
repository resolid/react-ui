import type { ReactElement, ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import type { PageColor } from "./pagination.styles";
import { tx } from "../../utils/clsx";
import { PaginationItem, type PaginationItemProps } from "./pagination-item";
import { usePagination, type UsePaginationOptions } from "./use-pagination";

export type PaginationProps = UsePaginationOptions & {
  /**
   * 颜色
   * @default "primary"
   */
  color?: PageColor;

  /**
   * 分页项目渲染
   */
  renderItem?: (props: PaginationItemProps) => ReactElement;

  /**
   * 总数显示渲染
   */
  renderTotal?: (total: number, totalPages: number) => ReactElement;
};

export function Pagination(props: PrimitiveProps<"nav", PaginationProps, "role">): ReactNode {
  const {
    page,
    defaultPage,
    onChange,
    total,
    pageSize,
    siblings,
    boundaries,
    disabled,
    color = "primary",
    renderItem: renderItemProp,
    renderTotal,
    className,
    ...rest
  } = props;

  const { pageItems, totalPages, currentPage, setCurrentPage } = usePagination({
    page,
    defaultPage,
    onChange,
    total,
    pageSize,
    siblings,
    boundaries,
    disabled,
  });

  const renderItem = renderItemProp ?? defaultRenderItem;

  return (
    <nav
      aria-label="Pagination"
      className={tx("flex w-auto items-center gap-2", className)}
      {...rest}
    >
      {renderTotal?.(total, totalPages)}
      <ul className="flex flex-nowrap gap-1">
        {pageItems.map((item) => (
          <li key={`${item.pageType}-${item.page}`}>
            {
              // react-doctor-disable-next-line react-doctor/no-render-in-render
              renderItem({
                ...item,
                color,
                currentPage,
                setCurrentPage,
              })
            }
          </li>
        ))}
      </ul>
    </nav>
  );
}

function defaultRenderItem(props: PaginationItemProps) {
  return <PaginationItem {...props} />;
}
