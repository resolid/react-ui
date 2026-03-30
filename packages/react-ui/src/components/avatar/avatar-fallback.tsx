import type { JSX } from "react/jsx-runtime";
import { type CSSProperties, useEffect, useState } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useAvatar, useAvatarStatus } from "./avatar-context";

export type AvatarFallbackProps = {
  /**
   * 显示图像回退之前的延迟（以毫秒为单位）
   * @default 200
   */
  delay?: number;
};

export function AvatarFallback(
  props: PrimitiveProps<"div", AvatarFallbackProps, "role" | "translate">,
): JSX.Element | null {
  const { delay = 200, className, style, children, ...rest } = props;

  const { name, radiusClass } = useAvatar();

  const hasChildren = !!children;

  const initials =
    !hasChildren && name
      ? name
          .split(" ")
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : undefined;

  const color = !hasChildren && name ? stringToColor(name) : undefined;

  const { imageLoadStatus } = useAvatarStatus();

  const [render, setRender] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => setRender(true), delay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [delay]);

  if (imageLoadStatus == "loaded" || (imageLoadStatus != "error" && !render)) {
    return null;
  }

  return (
    <div
      role="img"
      translate="no"
      aria-label={name}
      style={{ ...style, "--cv": color ? color.color : undefined } as CSSProperties}
      className={tx(
        "inline-flex h-full w-full items-center justify-center text-[calc(var(--sv)/3)] leading-none font-medium uppercase",
        color
          ? ["bg-(--cv)", color.light ? "text-black" : "text-white"]
          : !hasChildren && "bg-bg-muted",

        radiusClass,
        className,
      )}
      {...rest}
    >
      {children ?? initials ?? (
        <svg className="h-full w-full" color="#fff" viewBox="0 0 128 128">
          <path
            fill="currentColor"
            d="M103 102.139C93.094 111.92 79.35 118 64.164 118c-15.358 0-29.235-6.232-39.164-16.21V95.2C25 86.81 31.981 80 40.6 80h46.8c8.619 0 15.6 6.81 15.6 15.2v6.939zM63.996 24C51.294 24 41 34.294 41 46.996 41 59.706 51.294 70 63.996 70 76.7 70 87 59.706 87 46.996 87 34.294 76.699 24 63.996 24"
          />
        </svg>
      )}
    </div>
  );
}

function stringToColor(str: string): { color: string; light: boolean } {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }

  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return {
    color: `rgb(${r},${g},${b})`,
    light: brightness > 127,
  };
}
