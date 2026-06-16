import type { ReactNode } from "react";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { Polymorphic, type PolymorphicProps } from "../polymorphic";
import { usePopperAnchor } from "./popper-anchor-context";

export function PopperAnchor(props: PolymorphicProps<"div">): ReactNode {
  const { render, ref, ...rest } = props;

  const { setPositionReference } = usePopperAnchor();

  const refs = useMergeRefs(ref, setPositionReference);

  return <Polymorphic as="div" render={render} ref={refs} {...rest} />;
}
