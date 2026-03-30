import type { JSX } from "react/jsx-runtime";
import { Polymorphic, type PolymorphicProps } from "../../primitives";

export function AccordionHeader(props: PolymorphicProps<"h3">): JSX.Element {
  const { render, ...rest } = props;

  return <Polymorphic<"h3"> as="h3" render={render} {...rest} />;
}
