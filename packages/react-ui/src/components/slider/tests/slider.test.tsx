import { act, cleanup, render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { DirectionContext } from "../../provider/direction-context";
import { Slider, type SliderProps, SliderThumb, SliderTrack } from "../slider";

const ComponentUnderTest = (props: SliderProps): JSX.Element => {
  const { onChange, ...rest } = props;

  const [value, setValue] = useState<[number, number]>([-20, 20]);

  return (
    <Slider
      min={-50}
      max={50}
      value={value}
      onChange={(v) => {
        setValue(v as [number, number]);
        onChange?.(v);
      }}
      {...rest}
    >
      <SliderTrack />
      <SliderThumb aria-label="Volume" />
    </Slider>
  );
};

describe("Slider", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = await act(() => render(<ComponentUnderTest />));
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should be possible to control it with the arrow keys", async () => {
    const { getAllByRole } = render(<ComponentUnderTest />);

    const [leftThumb, rightThumb] = getAllByRole("slider");

    leftThumb.focus();
    await user.keyboard("[ArrowRight]");
    expect(leftThumb).toHaveAttribute("aria-valuenow", "-19");

    await user.keyboard("[ArrowLeft]");
    expect(leftThumb).toHaveAttribute("aria-valuenow", "-20");

    rightThumb.focus();
    await user.keyboard("[ArrowRight]");
    expect(rightThumb).toHaveAttribute("aria-valuenow", "21");

    await user.keyboard("[ArrowLeft]");
    expect(rightThumb).toHaveAttribute("aria-valuenow", "20");
  });

  it("should not be possible to overlap the right thumb with the left thumb", async () => {
    const { getAllByRole } = render(<ComponentUnderTest />);

    const [leftThumb] = getAllByRole("slider");

    leftThumb.focus();
    await user.keyboard("[End]");
    await waitFor(() => expect(leftThumb).toHaveAttribute("aria-valuenow", "20"));

    await user.keyboard("[ArrowRight]");
    await waitFor(() => expect(leftThumb).toHaveAttribute("aria-valuenow", "20"));
  });

  it("should be possible to control it with the arrow keys in rtl mode", async () => {
    const { getAllByRole } = render(
      <DirectionContext value={"rtl"}>
        <ComponentUnderTest />
      </DirectionContext>,
    );

    const [leftThumb, rightThumb] = getAllByRole("slider");

    leftThumb.focus();
    await user.keyboard("[ArrowRight]");
    expect(leftThumb).toHaveAttribute("aria-valuenow", "-21");

    await user.keyboard("[ArrowLeft]");
    expect(leftThumb).toHaveAttribute("aria-valuenow", "-20");

    rightThumb.focus();
    await user.keyboard("[ArrowRight]");
    expect(rightThumb).toHaveAttribute("aria-valuenow", "19");

    await user.keyboard("[ArrowLeft]");
    expect(rightThumb).toHaveAttribute("aria-valuenow", "20");
  });

  it("should be possible to control it with the arrow keys in vertical mode", async () => {
    const { getAllByRole } = render(<ComponentUnderTest orientation="vertical" />);

    const [leftThumb, rightThumb] = getAllByRole("slider");

    leftThumb.focus();
    await user.keyboard("[ArrowUp]");
    expect(leftThumb).toHaveAttribute("aria-valuenow", "-19");

    await user.keyboard("[ArrowDown]");
    expect(leftThumb).toHaveAttribute("aria-valuenow", "-20");

    rightThumb.focus();
    await user.keyboard("[ArrowUp]");
    expect(rightThumb).toHaveAttribute("aria-valuenow", "21");

    await user.keyboard("[ArrowDown]");
    expect(rightThumb).toHaveAttribute("aria-valuenow", "20");
  });

  it("should handle disabled state", async () => {
    const { getAllByRole } = render(<ComponentUnderTest disabled />);

    const [leftThumb, rightThumb] = getAllByRole("slider");

    expect(leftThumb).toHaveAttribute("aria-disabled", "true");
    expect(rightThumb).toHaveAttribute("aria-disabled", "true");
  });

  it("should emit correct onValueChange events", async () => {
    const onChange = vi.fn();

    const { getAllByRole } = render(<ComponentUnderTest onChange={onChange} />);

    const [leftThumb] = getAllByRole("slider");

    leftThumb.focus();
    await user.keyboard("[ArrowRight]");

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });
});
