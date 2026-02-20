import type { JSX } from "react/jsx-runtime";
import { tx } from "../../utils";
import type { EmptyObject, PrimitiveProps } from "../polymorphic";
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
