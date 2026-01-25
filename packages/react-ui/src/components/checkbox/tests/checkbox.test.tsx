import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Checkbox, type CheckboxProps } from "../checkbox";

const ComponentUnderTest = (props: CheckboxProps) => <Checkbox {...props}>Checkbox</Checkbox>;

const ControlledComponentUnderTest = (props: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setChecked(true)}>
        set checked
      </button>
      <ComponentUnderTest {...props} checked={checked} />
    </>
  );
};

describe("Checkbox", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should handle check and unchecked", async () => {
    const onChange = vi.fn();
    render(<ComponentUnderTest onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("should invoke onChange", async () => {
    const onChange = vi.fn();
    render(<ComponentUnderTest onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(true));

    fireEvent.click(checkbox);
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(false));
  });

  it("should allow controlled usage", async () => {
    render(<ControlledComponentUnderTest />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(screen.getByText("set checked"));
    await waitFor(() => expect(checkbox).toBeChecked());
  });
});
