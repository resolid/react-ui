import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Radio } from "../radio";
import { RadioGroup, type RadioGroupProps } from "../radio-group";

const ComponentUnderTest = (props: RadioGroupProps) => {
  const items = [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte", disabled: true },
  ];
  return (
    <RadioGroup {...props}>
      {items.map((item) => (
        <Radio key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

describe("Radio", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should invoke onChange if another value has selected", async () => {
    const onChange = vi.fn();

    render(<ComponentUnderTest onChange={onChange} />);

    await userEvent.click(screen.getByLabelText("Solid"));

    expect(onChange).toHaveBeenCalledWith("solid");
  });

  it("should not invoke onChange if option is disabled", async () => {
    const onChange = vi.fn();

    render(<ComponentUnderTest onChange={onChange} />);

    await userEvent.click(screen.getByLabelText("Svelte"));

    expect(onChange).not.toHaveBeenCalled();
  });
});
