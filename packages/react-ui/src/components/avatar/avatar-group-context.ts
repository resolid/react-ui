import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { Radius } from "../../shared/utils";

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

const desc = createSafeContext<AvatarGroupContextValue>({
  name: "AvatarGroupContext",
});

export const AvatarGroupContext: SafeContext<AvatarBaseProps> = desc[0];
export const useAvatarGroup: UseSafeContext<AvatarBaseProps> = desc[1];
