import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { hasRoundedBaseClass } from "../../shared/utils";
import { tx } from "../../utils";

export const FilePickerItem = (props: PrimitiveProps<"li">): JSX.Element => {
  const { className, children, ...rest } = props;

  return (
    <li
      className={tx("relative", !hasRoundedBaseClass(className) && "rounded-md", className)}
      {...rest}
    >
      {children}
    </li>
  );
};
