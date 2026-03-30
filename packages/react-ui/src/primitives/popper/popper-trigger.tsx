import type { JSX } from "react/jsx-runtime";
import { useButtonProps, useMergeRefs } from "../../hooks";
import { dataAttr } from "../../utils";
import { Polymorphic, type PolymorphicProps } from "../polymorphic";
import { usePopperState } from "./popper-state-context";
import { usePopperTrigger } from "./popper-trigger-context";

type PopperTriggerProps = { active?: boolean };

export function PopperTrigger(
  props: PolymorphicProps<"button", PopperTriggerProps, "type">,
): JSX.Element {
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
