import type { MouseEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { useButtonProps } from "../../hooks";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { AngleLeftIcon, AngleRightIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { useLocale } from "../provider/locale-context";
import { type PageColor, currentPageColorStyles } from "./pagination.styles";
import type { PageType } from "./use-pagination";

export type PaginationItemProps = {
  page: number;
  pageType: PageType;
  disabled: boolean;
  color: PageColor;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const PaginationItem = (
  props: PolymorphicProps<"button", PaginationItemProps, "type" | "role">,
): JSX.Element => {
  const {
    render,
    color,
    disabled,
    tabIndex,
    page,
    pageType,
    currentPage,
    setCurrentPage,
    className,
    children,
    ...rest
  } = props;

  const { t } = useLocale();

  const title =
    pageType == "previous"
      ? t("pagination.previous")
      : pageType == "next"
        ? t("pagination.next")
        : t("pagination.pageOf", { page });
  const current = pageType == "page" && page == currentPage;
  const currentStyle = currentPageColorStyles[color];

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    setCurrentPage(page);
  };

  const buttonProps = useButtonProps({
    hasRender: !!render,
    disabled,
    tabIndex,
  });

  return (
    <Polymorphic<"button">
      as={"button"}
      render={render}
      {...buttonProps}
      title={title}
      aria-label={title}
      aria-current={current ? "page" : undefined}
      className={tx(
        "inline-flex h-8 min-w-8 appearance-none items-center justify-center rounded-md px-2 select-none",
        current ? ["text-fg-emphasized", currentStyle] : "bg-bg-subtle",
        disabled ? "opacity-60" : !current && "cursor-pointer hover:bg-bg-muted",
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      {children ? (
        children
      ) : pageType == "previous" ? (
        <AngleLeftIcon />
      ) : pageType == "next" ? (
        <AngleRightIcon />
      ) : pageType == "end-ellipsis" || pageType == "start-ellipsis" ? (
        "..."
      ) : (
        page
      )}
    </Polymorphic>
  );
};
