import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { tx } from "../../utils/clsx";
import { InputGroupContext, type InputGroupContextValue } from "./input-group-context";

export type InputGroupProps = Partial<InputGroupContextValue>;

// oxlint-disable-next-line typescript/no-unnecessary-type-arguments
export function InputGroup(props: PrimitiveProps<"div", InputGroupProps>): ReactNode {
  const { children, className, size = "md", ...rest } = props;

  return (
    <div className={tx("flex items-stretch self-stretch", className)} {...rest}>
      <InputGroupContext value={{ size }}>{children}</InputGroupContext>
    </div>
  );
}
