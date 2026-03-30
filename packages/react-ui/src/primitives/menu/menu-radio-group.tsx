import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../polymorphic";
import { MenuGroup } from "./menu-group";
import { MenuRadioGroupContext, type MenuRadioGroupContextValue } from "./menu-radio-group-context";

export type MenuRadioGroupProps = MenuRadioGroupContextValue;

export function MenuRadioGroup(props: PrimitiveProps<"div", MenuRadioGroupProps>): JSX.Element {
  const { value, onChange, ...rest } = props;

  const contextValue: MenuRadioGroupContextValue = {
    value,
    onChange,
  };

  return (
    <MenuRadioGroupContext value={contextValue}>
      <MenuGroup {...rest} />
    </MenuRadioGroupContext>
  );
}
