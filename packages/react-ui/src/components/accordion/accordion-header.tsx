import type { ReactNode } from "react";
import { Polymorphic, type PolymorphicProps } from "../../primitives/polymorphic";

export function AccordionHeader(props: PolymorphicProps<"h3">): ReactNode {
  const { render, ...rest } = props;

  return <Polymorphic<"h3"> as="h3" render={render} {...rest} />;
}
