import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { Indicator } from "../../primitives/indicator/indicator";

export function TabsIndicator(
  props: PrimitiveProps<"span", EmptyObject, "role" | "children">,
): JSX.Element {
  const orientation = useOrientation();

  return <Indicator orientation={orientation} {...props} />;
}
