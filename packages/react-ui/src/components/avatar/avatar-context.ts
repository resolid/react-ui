import type { Dispatch, SetStateAction } from "react";
import type { ImageLoadStatus } from "../../hooks/use-image-load";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives/context";

export type AvatarContextValue = {
  name?: string;
  radiusClass?: string;
};

const [context, hook] = createSafeContext<AvatarContextValue>({
  name: "AvatarContext",
});

export const AvatarContext: SafeContext<AvatarContextValue> = context;
export const useAvatar: UseSafeContext<AvatarContextValue> = hook;

export type AvatarStatusContextValue = {
  imageLoadStatus: ImageLoadStatus;
  setImageLoadStatus: Dispatch<SetStateAction<ImageLoadStatus>>;
};

const [statusContext, statusHook] = createSafeContext<AvatarStatusContextValue>({
  name: "AvatarStatusContext",
});

export const AvatarStatusContext: SafeContext<AvatarStatusContextValue> = statusContext;
export const useAvatarStatus: UseSafeContext<AvatarStatusContextValue> = statusHook;
