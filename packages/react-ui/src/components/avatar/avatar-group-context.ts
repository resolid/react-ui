import type { Radius } from "../../shared/utils";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type AvatarBaseProps = {
  /**
   * 大小
   * @default 64
   */
  size?: number | string;

  /**
   * 圆角
   * @default "full"
   */
  radius?: Radius;
};

export type AvatarGroupContextValue = AvatarBaseProps;

const [context, hook] = createSafeContext<AvatarGroupContextValue>({
  name: "AvatarGroupContext",
});

export const AvatarGroupContext: SafeContext<AvatarBaseProps> = context;
export const useAvatarGroup: UseSafeContext<AvatarBaseProps> = hook;
