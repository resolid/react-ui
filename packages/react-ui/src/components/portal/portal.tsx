import type { JSX } from "react/jsx-runtime";
import { FloatingPortal, type FloatingPortalProps } from "@floating-ui/react";

export type PortalProps = FloatingPortalProps;

export const Portal = (props: PortalProps): JSX.Element => <FloatingPortal {...props} />;
