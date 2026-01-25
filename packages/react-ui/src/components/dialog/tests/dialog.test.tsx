import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  type DialogProps,
} from "../dialog";

const ComponentUnderTest = (props: DialogProps) => (
  <Dialog {...props}>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogPortal>
      <DialogBackdrop />
      <DialogContent>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>Dialog Description</DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </DialogPortal>
  </Dialog>
);

describe("Dialog", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should show dialog content when opened", async () => {
    render(<ComponentUnderTest />);

    await userEvent.click(screen.getByText("Open Dialog"));
    expect(await screen.findByText("Dialog Title")).toBeVisible();

    await userEvent.click(screen.getByText("Close"));

    await waitFor(() => expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument());
  });

  it("should invoke onOpenChange if dialog is closed", async () => {
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

    await userEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});
