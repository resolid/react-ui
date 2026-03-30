import type { JSX, PropsWithChildren } from "react";
import type { ListboxItem } from "../listbox/use-listbox";
import type { UserComboboxReturnType } from "./use-combobox";
import { OptionEmptyContext } from "../../primitives/common/option-empty-context";
import { PopperAnchorContext } from "../../primitives/popper/popper-anchor-context";
import { PopperStateContext } from "../../primitives/popper/popper-state-context";
import { PopperTriggerContext } from "../../primitives/popper/popper-trigger-context";
import { ListboxProvider } from "../listbox/listbox-provider";
import { ComboboxInputContext } from "./combobox-input-context";
import { ComboboxPopupContext } from "./combobox-popup-context";
import { ComboboxRootContext } from "./combobox-root-context";
import { ComboboxStateContext } from "./combobox-state-context";
import { ComboboxTriggerContext } from "./combobox-trigger-context";

export type ComboboxProviderProps<T extends ListboxItem> = {
  value: Omit<UserComboboxReturnType<T>, "open" | "setOpen" | "setPosition" | "floatingElement">;
};

export function ComboboxProvider<T extends ListboxItem>({
  value,
  children,
}: PropsWithChildren<ComboboxProviderProps<T>>): JSX.Element {
  return (
    <ComboboxRootContext value={value.rootContext}>
      <ComboboxPopupContext value={value.popupContext}>
        <ComboboxTriggerContext value={value.triggerContext}>
          <ComboboxInputContext value={value.inputContext}>
            <PopperStateContext value={value.popperStateContext}>
              <PopperTriggerContext value={value.popperTriggerContext}>
                <PopperAnchorContext value={value.popperAnchorContext}>
                  <ComboboxStateContext value={value.stateContext}>
                    <OptionEmptyContext value={value.listboxProviderValue.nodeItems.length == 0}>
                      <ListboxProvider value={value.listboxProviderValue}>
                        {children}
                      </ListboxProvider>
                    </OptionEmptyContext>
                  </ComboboxStateContext>
                </PopperAnchorContext>
              </PopperTriggerContext>
            </PopperStateContext>
          </ComboboxInputContext>
        </ComboboxTriggerContext>
      </ComboboxPopupContext>
    </ComboboxRootContext>
  );
}
