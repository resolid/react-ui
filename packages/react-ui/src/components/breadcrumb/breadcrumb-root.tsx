import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { AngleRightIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { BreadcrumbContext, type BreadcrumbContextValue } from "./breadcrumb-context";

export type BreadcrumbRootProps = BreadcrumbContextValue;

export function BreadcrumbRoot(props: PrimitiveProps<"nav", BreadcrumbRootProps>): JSX.Element {
  const { children, className, separator: separatorProp, ...rest } = props;

  const separator = separatorProp ?? <AngleRightIcon />;

  return (
    <nav aria-label="Breadcrumb" {...rest}>
      <BreadcrumbContext value={{ separator }}>
        <ol className={tx("inline-flex items-center", className)}>{children}</ol>
      </BreadcrumbContext>
    </nav>
  );
}
