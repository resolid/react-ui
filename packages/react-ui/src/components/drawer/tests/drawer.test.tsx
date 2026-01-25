import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  type DrawerProps,
} from "../drawer";

const ComponentUnderTest = (props: DrawerProps) => (
  <Drawer {...props}>
    <DrawerTrigger>Open Drawer</DrawerTrigger>
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <DrawerDescription>Drawer Description</DrawerDescription>
        <DrawerClose>Close</DrawerClose>
      </DrawerContent>
    </DrawerPortal>
  </Drawer>
);

describe("Drawer", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should show drawer content when opened", async () => {
    render(<ComponentUnderTest />);

    await userEvent.click(screen.getByText("Open Drawer"));
    expect(await screen.findByText("Drawer Title")).toBeVisible();

    await userEvent.click(screen.getByText("Close"));

    await waitFor(() => expect(screen.queryByText("Drawer Title")).not.toBeInTheDocument());
  });

  it("should invoke onOpenChange if drawer is closed", async () => {
    const onOpenChange = vi.fn();
    render(<ComponentUnderTest open onOpenChange={onOpenChange} />);

    await userEvent.click(screen.getByText("Close"));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it("should be fully controlled (true)", async () => {
    render(<ComponentUnderTest open={true} />);

    expect(screen.queryByRole("button", { name: "Close" })).toBeVisible();

    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("button", { name: "Close" })).toBeVisible();
  });

  it("should be fully controlled (false)", async () => {
    render(<ComponentUnderTest open={false} />);

    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Open Drawer" }));
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});
