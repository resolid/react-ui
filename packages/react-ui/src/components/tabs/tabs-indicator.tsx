import type { ReactNode } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives/polymorphic";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { Indicator } from "../../primitives/indicator/indicator";

export function TabsIndicator(
  props: PrimitiveProps<"span", EmptyObject, "role" | "children">,
): ReactNode {
  const orientation = useOrientation();

  return <Indicator orientation={orientation} {...props} />;
}
