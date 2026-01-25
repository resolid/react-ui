import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "../tooltip";
import type { TooltipProps } from "../use-tooltip";

const ComponentUnderTest = (props: TooltipProps) => (
  <Tooltip openDelay={0} closeDelay={0} {...props}>
    <TooltipTrigger>trigger</TooltipTrigger>
    <TooltipContent>
      <TooltipArrow />
      content
    </TooltipContent>
  </Tooltip>
);

describe("Tooltip", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should show the tooltip on pointerover and close on pointer leave", async () => {
    render(<ComponentUnderTest />);

    const tooltipTrigger = screen.getByText("trigger");

    await userEvent.hover(tooltipTrigger);

    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument());

    await userEvent.unhover(tooltipTrigger);

    await waitFor(() => {
      expect(screen.queryByText("content")).not.toBeInTheDocument();
    });
  });

  it("should hide the tooltip when escape is pressed", async () => {
    render(<ComponentUnderTest />);

    const tooltipTrigger = screen.getByText("trigger");
    await userEvent.hover(tooltipTrigger);

    await screen.findByRole("tooltip");
    expect(screen.getByText("content")).toBeInTheDocument();

    await userEvent.keyboard("[Escape]");

    await waitFor(() => {
      expect(screen.queryByText("content")).not.toBeInTheDocument();
    });
  });

  it("should have pointer-events none style if interactive is set to false", async () => {
    render(<ComponentUnderTest interactive={false} />);

    const tooltipTrigger = screen.getByText("trigger");
    await userEvent.hover(tooltipTrigger);

    const tooltipContent = screen.getByText("content");

    expect(tooltipContent).toHaveClass("select-none");
  });
});
