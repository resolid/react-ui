import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Tabs, TabsList, TabsPanel, type TabsProps, TabsTab } from "../tabs";

const ComponentUnderTest = (props: TabsProps) => {
  const items = [
    { value: "React" },
    { value: "Solid" },
    { value: "Svelte", disabled: true },
    { value: "Vue" },
  ];
  return (
    <Tabs {...props}>
      <TabsList>
        {items.map((item, id) => (
          <TabsTab key={id} value={item.value} disabled={item.disabled}>
            {item.value} Trigger
          </TabsTab>
        ))}
      </TabsList>
      {items.map((item, id) => (
        <TabsPanel key={id} value={item.value}>
          {item.value} Content
        </TabsPanel>
      ))}
    </Tabs>
  );
};

describe("Tabs", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest defaultValue={"React"} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should activate tab on click", async () => {
    const onChange = vi.fn();
    render(<ComponentUnderTest defaultValue={"React"} onChange={onChange} />);

    const tab = screen.getByText("Vue Trigger");

    await userEvent.click(tab);
    expect(onChange).toHaveBeenCalledWith("Vue");
  });

  it("should not focus disabled tab", async () => {
    render(<ComponentUnderTest defaultValue={"React"} />);

    const disabledTab = screen.getByText("Svelte Trigger");

    await userEvent.click(disabledTab);

    expect(disabledTab).not.toHaveFocus();
  });

  it("should show content when tab is activated", async () => {
    render(<ComponentUnderTest defaultValue={"Vue"} />);

    const firstTab = screen.getByText("React Trigger");

    expect(screen.queryByText("React Content")).not.toBeInTheDocument();

    await userEvent.click(firstTab);
    expect(screen.getByText("React Content")).toBeVisible();
  });

  it("should loop focus", async () => {
    render(<ComponentUnderTest defaultValue={"React"} />);

    const firstTab = screen.getByText("React Trigger");
    const lastTab = screen.getByText("Vue Trigger");

    await userEvent.click(lastTab);
    await waitFor(() => expect(lastTab).toHaveFocus());

    await userEvent.keyboard("[ArrowRight]");
    await waitFor(() => expect(firstTab).toHaveFocus());
  });

  it("should handle orientation", async () => {
    render(<ComponentUnderTest defaultValue={"React"} orientation="vertical" />);

    const firstTab = screen.getByText("React Trigger");
    const secondTab = screen.getByText("Solid Trigger");

    await userEvent.click(firstTab);
    await waitFor(() => expect(firstTab).toHaveFocus());

    await userEvent.keyboard("[ArrowDown]");
    await waitFor(() => expect(secondTab).toHaveFocus());
  });
});
