import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { inputTextShareStyles } from "../../shared/styles";
import { hasBackgroundBaseClass } from "../../shared/utils";
import { tx } from "../../utils";
import { useInputGroup } from "./input-group-context";
import { inputGroupStyles, inputPxStyles } from "./input.styles";

export const InputAddon = (props: PrimitiveProps<"div">): JSX.Element => {
  const { className, children, ...rest } = props;

  const group = useInputGroup();

  return (
    <div
      className={tx(
        "inline-flex items-center rounded-md border border-bd-normal text-nowrap text-fg-muted",
        inputGroupStyles,
        inputPxStyles[group.size],
        inputTextShareStyles[group.size],
        !hasBackgroundBaseClass(className) && "bg-bg-subtlest",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
