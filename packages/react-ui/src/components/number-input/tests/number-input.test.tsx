import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { NumberInput } from "../number-input";

describe("NumberInput", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<NumberInput aria-label={"Input"} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should handle wheel event when allowMouseWheel is true", async () => {
    render(<NumberInput defaultValue={0} changeOnWheel />);

    const input = screen.getByRole("spinbutton");

    act(() => {
      input.focus();
    });

    fireEvent.wheel(input, { deltaY: -1 });

    await waitFor(() => {
      expect(input).toHaveValue("1");
    });
  });

  it("should clamp value on blur", async () => {
    render(<NumberInput min={0} max={10} defaultValue={15} />);

    const input = screen.getByRole("spinbutton");

    act(() => {
      input.focus();
    });

    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveValue("10");
    });
  });

  it("should handle custom format and parse functions", async () => {
    render(
      <NumberInput
        parse={(value) => value.replace(/\$\s?|(,*)/g, "")}
        format={(value) =>
          !Number.isNaN(value) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "$ "
        }
        defaultValue={1999}
      />,
    );

    const input = screen.getByRole("spinbutton");

    await waitFor(() => {
      expect(input).toHaveValue("$ 1,999");
    });
  });

  it("should increment value by step when using increment button", async () => {
    render(<NumberInput step={5} defaultValue={0} />);

    const incrementBtn = screen.getByLabelText("increment value");

    await userEvent.click(incrementBtn);

    const input = screen.getByRole("spinbutton");

    await waitFor(() => {
      expect(input).toHaveValue("5");
    });
  });
});
