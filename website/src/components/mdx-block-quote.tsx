import type { ComponentProps } from "react";
import { Alert, AlertDescription, AlertIndicator, type AlertProps } from "@resolid/react-ui";
import { SpriteIcon } from "~/components/sprite-icon";

export function MdxBlockQuote(props: ComponentProps<"blockquote"> & { "data-type"?: string }) {
  const { children, "data-type": dataType, ...rest } = props;

  if (dataType) {
    const alertColors = {
      NOTE: "primary",
      IMPORTANT: "secondary",
      TIP: "success",
      WARNING: "warning",
      CAUTION: "danger",
    };

    return (
      <Alert
        color={alertColors[dataType as keyof typeof alertColors] as AlertProps["color"]}
        className="not-prose my-5 flex flex-row gap-2"
      >
        <AlertIndicator className="pt-1.75">
          <SpriteIcon name={`github-${dataType}`} />
        </AlertIndicator>
        <AlertDescription className="[&_code]:text-sm">{children}</AlertDescription>
      </Alert>
    );
  }

  return <blockquote {...rest}>{children}</blockquote>;
}
