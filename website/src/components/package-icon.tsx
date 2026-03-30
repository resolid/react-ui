import { tx } from "@resolid/react-ui";
import packageIcons from "~/assets/icons/package.svg?no-inline";

type SpriteIconProps = {
  name: string;
  size?: string | number;
  className?: string;
};

export function PackageIcon(props: SpriteIconProps) {
  const { name, size = "1em", className } = props;

  return (
    <svg style={{ width: size }} className={tx("aspect-square", className)}>
      <use href={`${packageIcons}#${name}`} />
    </svg>
  );
}
