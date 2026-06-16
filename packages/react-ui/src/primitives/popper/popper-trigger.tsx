import type { ReactNode } from "react";
import { useButtonProps } from "../../hooks/use-button-props";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { dataAttr } from "../../utils/dom";
import { Polymorphic, type PolymorphicProps } from "../polymorphic";
import { usePopperState } from "./popper-state-context";
import { usePopperTrigger } from "./popper-trigger-context";

type PopperTriggerProps = { active?: boolean };

export function PopperTrigger(
  props: PolymorphicProps<"button", PopperTriggerProps, "type">,
): ReactNode {
  const { render, active, disabled, tabIndex, children, ref, ...rest } = props;

  const { open } = usePopperState();
  const { setReference, getReferenceProps } = usePopperTrigger();

  const refs = useMergeRefs(ref, setReference);

  const buttonProps = useButtonProps({
    hasRender: !!render,
    disabled,
    tabIndex,
  });

  return (
    <Polymorphic<"button">
      as="button"
      render={render}
      {...buttonProps}
      ref={refs}
      data-active={dataAttr(active && open)}
      {...getReferenceProps(rest)}
    >
      {children}
    </Polymorphic>
  );
}
