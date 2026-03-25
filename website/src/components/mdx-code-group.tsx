import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from "@resolid/react-ui";
import { Children, isValidElement, type ReactElement, useMemo } from "react";
import { PackageIcon } from "~/components/package-icon";

export const MdxCodeGroup = ({
  children,
}: {
  children: ReactElement<{ children: ReactElement<{ codeGroup: string }> }>[];
}) => {
  const tabs = useMemo(
    () =>
      Children.map(children, (child) => {
        if (!isValidElement(child) || !child.props.children.props.codeGroup) {
          return false;
        }

        return {
          name: child.props.children.props.codeGroup,
          node: child,
        };
      }).filter(Boolean),
    [children],
  );

  if (tabs.length == 0) {
    return children;
  }

  return (
    <Tabs defaultValue="pnpm" className="w-auto rounded-md border border-bd-normal">
      <TabsList className="gap-1 border-b border-bd-normal p-2">
        <TabsIndicator className="-z-1 h-(--hv) w-(--wv) rounded-md bg-bg-subtle" />
        {tabs.map((tab) => (
          <TabsTab key={tab.name} value={tab.name} className="inline-flex gap-2 rounded-md px-3">
            <PackageIcon size="1em" name={tab.name} />
            {tab.name}
          </TabsTab>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsPanel tabIndex={-1} key={tab.name} value={tab.name}>
          {tab.node}
        </TabsPanel>
      ))}
    </Tabs>
  );
};
