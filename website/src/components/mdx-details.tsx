import type { ComponentProps, ReactElement } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@resolid/react-ui";
import { SpriteIcon } from "~/components/sprite-icon";

export type MdxDetailsProps = {
  summary?: ReactElement | string;
} & ComponentProps<"details">;

export const MdxDetails = ({ summary, children }: MdxDetailsProps) => {
  return (
    <Collapsible className={"mb-3 border-b border-bd-normal pt-0 pb-3"}>
      <CollapsibleTrigger className={"group flex w-full flex-row items-center justify-between"}>
        <h6 className={"font-medium [&>summary]:list-none"}>{summary}</h6>

        <SpriteIcon
          className={"transition-transform duration-(--dv) group-aria-expanded:rotate-180"}
          size={"1.5em"}
          name={"angle-down"}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className={"py-1 [&>p]:mt-1 [&>p]:mb-0"}>{children}</CollapsibleContent>
    </Collapsible>
  );
};
