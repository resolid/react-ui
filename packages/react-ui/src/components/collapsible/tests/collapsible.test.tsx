import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import {
  Collapsible,
  CollapsibleContent,
  type CollapsibleProps,
  CollapsibleTrigger,
} from "../collapsible";

const ComponentUnderTest = (props: CollapsibleProps) => (
  <Collapsible {...props}>
    <CollapsibleTrigger>Toggle</CollapsibleTrigger>
    <CollapsibleContent>Content</CollapsibleContent>
  </Collapsible>
);

describe("Collapsible", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should toggle", async () => {
    render(<ComponentUnderTest />);

    expect(screen.queryByText("Content")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Content")).toBeVisible();

    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    await waitFor(() => expect(screen.queryByText("Content")).not.toBeInTheDocument());
  });

  it("should be fully controlled (true)", async () => {
    render(<ComponentUnderTest open={true} />);

    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Content")).toBeVisible();
  });

  it("should be fully controlled (false)", async () => {
    render(<ComponentUnderTest open={false} />);

    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    await waitFor(() => expect(screen.queryByText("Content")).not.toBeInTheDocument());
  });
});
