import type { PropsWithChildren, ReactPortal } from "react";
import { useFloatingPortalNode, type UseFloatingPortalNodeProps } from "@floating-ui/react";
import { createPortal } from "react-dom";

export type PortalLiteProps = UseFloatingPortalNodeProps;

export const PortalLite = ({
  id,
  root,
  children,
}: PropsWithChildren<PortalLiteProps>): ReactPortal | null => {
  const node = useFloatingPortalNode({ root, id });

  if (node) {
    return createPortal(children, node);
  }

  return null;
};
