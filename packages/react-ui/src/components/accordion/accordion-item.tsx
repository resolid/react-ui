import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { dataAttr } from "../../utils";
import { CollapsibleRoot } from "../collapsible/collapsible-root";
import { useAccordion } from "./accordion-context";

export type AccordionItemProps = {
  /**
   * 项目的唯一价值
   */
  value: string | number;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export function AccordionItem(props: PrimitiveProps<"div", AccordionItemProps>): JSX.Element {
  const {
    disabled: accordionDisabled,
    duration,
    collapsible,
    openedValue,
    setOpenedValue,
  } = useAccordion();

  const { value, disabled = accordionDisabled, children, ...rest } = props;

  const opened = Array.isArray(openedValue) ? openedValue.includes(value) : openedValue == value;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      if (Array.isArray(openedValue)) {
        setOpenedValue((prev) => [value, ...(prev as (string | number)[])]);
      } else {
        setOpenedValue(value);
      }
    } else {
      if (Array.isArray(openedValue)) {
        setOpenedValue((prev) => (prev as (string | number)[]).filter((p) => p != value));
      } else {
        if (collapsible) {
          setOpenedValue(null);
        }
      }
    }
  };

  return (
    <CollapsibleRoot
      open={opened}
      onOpenChange={handleOpenChange}
      duration={duration}
      disabled={disabled}
      data-open={dataAttr(opened)}
      {...rest}
    >
      {children}
    </CollapsibleRoot>
  );
}
