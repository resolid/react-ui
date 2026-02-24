import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { InputBase, type InputBaseProps } from "./input-base";

export type InputProps = Omit<InputBaseProps, "focusable">;

export const Input = (props: PrimitiveProps<"input", InputProps, "children">): JSX.Element => (
  <InputBase {...props} />
);
