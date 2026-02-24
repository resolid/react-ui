import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";
import { tx } from "../../utils";
import { usePopperAria } from "./popper-aria-context";

export const PopperTitle = (props: PrimitiveProps<"h2", EmptyObject, "id">): JSX.Element => {
  const { className, children, ...rest } = props;

  const { labelId } = usePopperAria();

  return (
    <h2 id={labelId} className={tx("font-medium", className)} {...rest}>
      {children}
    </h2>
  );
};
