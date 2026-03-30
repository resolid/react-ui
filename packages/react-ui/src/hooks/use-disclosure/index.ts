import { useControllableState } from "../use-controllable-state";

export type UseDisclosureOptions = {
  /**
   * 受控打开状态
   */
  open?: boolean;

  /**
   * 初始渲染时的默认打开状态
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * 打开状态改变时调用
   */
  onOpenChange?: (open: boolean) => void;
};

export function useDisclosure(options: UseDisclosureOptions): readonly [
  boolean,
  {
    readonly handleOpen: () => void;
    readonly handleClose: () => void;
    readonly handleToggle: () => void;
  },
] {
  const { open, defaultOpen = false, onOpenChange } = options;

  const [openState, setOpenState] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const handleOpen = () => setOpenState(true);
  const handleClose = () => setOpenState(false);
  const handleToggle = () => setOpenState((prev) => !prev);

  return [openState, { handleOpen, handleClose, handleToggle }] as const;
}
