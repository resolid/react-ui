import { tx } from "@resolid/react-ui";
import spriteIcons from "~/assets/icons/sprite.svg?no-inline";

type SpriteIconProps = {
  name: string;
  size?: string | number;
  color?: string;
  className?: string;
};

export function SpriteIcon(props: SpriteIconProps) {
  const { name, size = "1em", color, className } = props;

  return (
    <svg style={{ width: size }} className={tx("aspect-square", className)}>
      <use color={color} href={`${spriteIcons}#${name}`} />
    </svg>
  );
}
