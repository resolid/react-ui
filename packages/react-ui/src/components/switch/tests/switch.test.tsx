import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Switch } from "../switch";

describe("Switch", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<Switch>Switch</Switch>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should toggle state when clicked", async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);

    const switchControl = screen.getByRole("switch");

    await userEvent.click(switchControl);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("should not toggle when disabled", async () => {
    const onChange = vi.fn();

    render(<Switch onChange={onChange} disabled />);

    expect(screen.getByRole("switch")).toBeDisabled();

    const switchControl = screen.getByRole("switch");
    await userEvent.click(switchControl);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should show invalid attribute when invalid", async () => {
    render(<Switch invalid />);

    const switchControl = screen.getByRole("switch");

    expect(switchControl).toHaveAttribute("aria-invalid", "true");
  });

  it("should be required when required is true", async () => {
    render(<Switch required />);

    expect(screen.getByRole("switch")).toBeRequired();
  });
});
