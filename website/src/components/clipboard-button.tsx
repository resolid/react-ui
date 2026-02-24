import { Button, useClipboard } from "@resolid/react-ui";
import { SpriteIcon } from "~/components/sprite-icon";

export const ClipboardButton = ({ content }: { content: string }) => {
  const [copied, copy] = useClipboard();

  return (
    <Button
      title="复制代码"
      size="xs"
      iconOnly
      color="neutral"
      variant="soft"
      onClick={() => copy(content)}
    >
      {copied ? (
        <SpriteIcon size={16} className="text-fg-success" name="clipboard-check" />
      ) : (
        <SpriteIcon size={16} className="text-fg-muted hover:text-link-hovered" name="clipboard" />
      )}
    </Button>
  );
};
