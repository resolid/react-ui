import { isNumber, isString, range } from "@resolid/utils";
import { useMemo, type SetStateAction } from "react";
import { useControllableState } from "../../hooks";

export type UsePaginationOptions = {
  /**
   * 当前分页
   */
  page?: number;

  /**
   * 默认分页
   * @default 1
   */
  defaultPage?: number | string | null;

  /**
   * onChange 回调
   */
  onChange?: (page: number) => void;

  /**
   * 总记录数
   */
  total: number;

  /**
   * 分页大小
   * @default 20
   */
  pageSize?: number;

  /**
   * 当前页面之前和之后显示的页数
   * @default 2
   */
  siblings?: number;

  /**
   * 分页开头和结尾处显示的页数
   * @default 2
   */
  boundaries?: number;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export type PageType = "page" | "next" | "previous" | "start-ellipsis" | "end-ellipsis";

export const usePagination = (
  options: UsePaginationOptions,
): {
  pageItems: {
    page: number;
    pageType: PageType;
    disabled: boolean;
  }[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (value: SetStateAction<number>) => void;
} => {
  const {
    page,
    defaultPage,
    onChange,
    total,
    pageSize = 20,
    siblings = 2,
    boundaries = 2,
    disabled = false,
  } = options;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const [currentPage, setCurrentPage] = useControllableState<number>({
    value: page,
    defaultValue: isString(defaultPage) ? parseInt(defaultPage) : defaultPage || 1,
    onChange,
  });

  // ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next']
  const pageItems = useMemo(() => {
    const startPages = range(1, Math.min(boundaries, totalPages));
    const endPages = range(Math.max(totalPages - boundaries + 1, boundaries + 1), totalPages);

    const siblingsStart = Math.max(
      Math.min(currentPage - siblings, totalPages - boundaries - siblings * 2 - 1),
      boundaries + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(currentPage + siblings, boundaries + siblings * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
    );

    return [
      ["previous", Math.max(1, currentPage - 1)],
      ...startPages,
      ...(siblingsStart > boundaries + 2
        ? [["start-ellipsis", Math.max(1, siblingsStart - 1)]]
        : boundaries + 1 < totalPages - boundaries
          ? [boundaries + 1]
          : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < totalPages - boundaries - 1
        ? [["end-ellipsis", Math.min(totalPages, siblingsEnd + 1)]]
        : totalPages - boundaries > boundaries
          ? [totalPages - boundaries]
          : []),
      ...endPages,
      ["next", Math.min(totalPages, currentPage + 1)],
    ].map((pn) =>
      isNumber(pn)
        ? { page: pn, pageType: "page" as PageType, disabled: disabled }
        : {
            page: pn[1] as number,
            pageType: pn[0] as PageType,
            disabled:
              disabled ||
              (pn[0] == "previous" && currentPage <= 1) ||
              (pn[0] == "next" && currentPage >= totalPages),
          },
    );
  }, [currentPage, totalPages, boundaries, siblings, disabled]);

  return { pageItems, totalPages, currentPage, setCurrentPage };
};
