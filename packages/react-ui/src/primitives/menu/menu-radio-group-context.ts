import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type MenuRadioGroupContextValue = {
  /**
   * 要选中的菜单单选项目的控制值
   */
  value?: string | number;

  /**
   * 值更改时调用的事件处理程序
   */
  onChange?: (value: string | number) => void;
};

const [context, hook] = createSafeContext<MenuRadioGroupContextValue>({
  name: "MenuRadioGroupContext",
});

export const MenuRadioGroupContext: SafeContext<MenuRadioGroupContextValue> = context;
export const useMenuRadioGroup: UseSafeContext<MenuRadioGroupContextValue> = hook;
