import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export function InputAffix(props: PrimitiveProps<"div">): JSX.Element {
  const { children, className, ...rest } = props;

  return (
    <div
      className={tx(
        "pointer-events-none absolute inset-y-0 flex items-center justify-center text-fg-subtlest",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
