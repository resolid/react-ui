import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { InputGroupContext, type InputGroupContextValue } from "./input-group-context";

export type InputGroupProps = Partial<InputGroupContextValue>;

export function InputGroup(props: PrimitiveProps<"div", InputGroupProps>): JSX.Element {
  const { children, className, size = "md", ...rest } = props;

  return (
    <div className={tx("flex items-stretch self-stretch", className)} {...rest}>
      <InputGroupContext value={{ size }}>{children}</InputGroupContext>
    </div>
  );
}
