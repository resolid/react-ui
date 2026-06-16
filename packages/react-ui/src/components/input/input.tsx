import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives";
import { InputBase, type InputBaseProps } from "./input-base";

export type InputProps = Omit<InputBaseProps, "focusable">;

export function Input(props: PrimitiveProps<"input", InputProps, "children">): ReactNode {
  return <InputBase {...props} />;
}
