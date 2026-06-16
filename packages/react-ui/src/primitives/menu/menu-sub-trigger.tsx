import type { ComponentProps, ReactNode } from "react";
import type { PolymorphicProps } from "../polymorphic";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { AngleRightIcon } from "../../shared/icons";
import { tx } from "../../utils/clsx";
import { dataAttr } from "../../utils/dom";
import { usePopperState } from "../popper/popper-state-context";
import { usePopperTrigger } from "../popper/popper-trigger-context";
import { MenuBaseItem, type MenuBaseItemProps } from "./menu-base-item";
import { useMenuHover } from "./menu-hover-context";

export type MenuSubTriggerProps = MenuBaseItemProps;

export function MenuSubTrigger(
  props: PolymorphicProps<"div", MenuSubTriggerProps, "role" | "tabIndex">,
): ReactNode {
  const { render, children, ref, className, disabled, ...rest } = props;

  const { open } = usePopperState();
  const { setReference, getReferenceProps } = usePopperTrigger();
  const { setHoverEnabled } = useMenuHover();

  const refs = useMergeRefs(ref, setReference);

  return (
    <MenuBaseItem
      render={render}
      ref={refs}
      data-open={dataAttr(open)}
      className={tx("justify-between pe-0.5 open:not-active:bg-bg-subtlest", className)}
      {...(getReferenceProps({
        ...rest,
        onMouseEnter: () => {
          setHoverEnabled(true);
        },
      }) as ComponentProps<typeof MenuBaseItem>)}
    >
      {children}
      <span className={tx("ms-5", disabled ? "text-fg-subtle" : "text-fg-muted")}>
        <AngleRightIcon />
      </span>
    </MenuBaseItem>
  );
}
