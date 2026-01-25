import { cleanup, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Select, SelectContent, SelectList, type SelectProps } from "../select";

const ComponentUnderTest = (props: Omit<SelectProps, "collection">) => {
  const items = [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte", disabled: true },
  ];
  return (
    <Select aria-label={"Framework"} collection={items} {...props}>
      <SelectContent>
        <SelectList></SelectList>
      </SelectContent>
    </Select>
  );
};

describe("Select", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should handle item selection", async () => {
    render(<ComponentUnderTest />);

    const trigger = screen.getByRole("combobox", { name: "Framework" });
    await user.click(trigger);

    const item = screen.getByText("React", { ignore: "option" });

    await user.click(item);
    await waitFor(() => expect(trigger).toHaveTextContent("React"));
  });

  it("should close on select", async () => {
    render(<ComponentUnderTest />);

    const trigger = screen.getByRole("combobox", { name: "Framework" });
    await user.click(trigger);

    const item = screen.getByText("React", { ignore: "option" });

    await user.click(item);
    await waitFor(() => expect(screen.queryByText("Frameworks")).not.toBeInTheDocument());
  });

  it("should be disabled when disabled is true", async () => {
    render(<ComponentUnderTest disabled />);

    const trigger = screen.getByRole("combobox", { name: "Framework" });

    expect(trigger).toHaveAttribute("aria-disabled", "true");
  });

  it("should handle multiple selection", async () => {
    render(<ComponentUnderTest multiple />);

    const trigger = screen.getByRole("combobox", { name: "Framework" });

    await user.click(trigger);

    const itemReact = screen.getByText("React", { ignore: "option" });
    const itemVue = screen.getByText("Vue", { ignore: "option" });

    await user.click(itemReact);
    await user.click(itemVue);
    await waitFor(() => expect(trigger).toHaveTextContent("ReactVue"));
  });

  it("should call onChange when item is selected", async () => {
    const onChange = vi.fn();
    render(<ComponentUnderTest onChange={onChange} />);

    const trigger = screen.getByRole("combobox", { name: "Framework" });

    await user.click(trigger);

    const item = screen.getByText("React", { ignore: "option" });

    await user.click(item);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  it("should open menu when onOpenChange is called", async () => {
    const onOpenChange = vi.fn();
    render(<ComponentUnderTest onOpenChange={onOpenChange} />);

    const trigger = screen.getByRole("combobox", { name: "Framework" });

    await user.click(trigger);
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
  });

  it("should be read-only when readOnly is true", async () => {
    render(<ComponentUnderTest readOnly />);

    const trigger = screen.getByRole("combobox", { name: "Framework" });

    await user.click(trigger);
    await waitFor(() =>
      expect(screen.queryByText("React", { ignore: "option" })).not.toBeInTheDocument(),
    );
  });
});
