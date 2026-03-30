import type { JSX } from "react/jsx-runtime";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { tx } from "../../utils";

export type BreadcrumbLinkProps = {
  /**
   * 面包屑链接是否代表当前页面。
   */
  current?: boolean;
};

export function BreadcrumbLink(props: PolymorphicProps<"a", BreadcrumbLinkProps>): JSX.Element {
  const { render, children, className, href, current, ...rest } = props;

  if (current) {
    return (
      <span
        className={tx("inline-flex items-center text-fg-muted", className)}
        aria-current="page"
        {...rest}
      >
        {children}
      </span>
    );
  }

  return (
    <Polymorphic<"a">
      as="a"
      render={render}
      href={href}
      className={tx("inline-flex cursor-pointer items-center hover:text-link-hovered", className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}
