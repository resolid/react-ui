import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Listbox, ListboxContent, ListboxList, type ListboxProps } from "../listbox";

const ComponentUnderTest = (props: Omit<ListboxProps, "collection">) => {
  return (
    <Listbox
      collection={[
        { value: "1", label: "One", disabled: false },
        { value: "2", label: "Two", disabled: false },
        { value: "3", label: "Three", disabled: true },
      ]}
      {...props}
    >
      <ListboxContent aria-label={"Listbox"}>
        <ListboxList />
      </ListboxContent>
    </Listbox>
  );
};

describe("Listbox", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("allows user to change option focus via up/down arrow keys", async () => {
    const { getAllByRole } = render(<ComponentUnderTest />);

    const options = getAllByRole("option");

    await userEvent.click(options[0]);

    expect(document.activeElement).toBe(options[0]);

    await userEvent.keyboard("[ArrowDown]");

    expect(document.activeElement).toBe(options[1]);

    await userEvent.keyboard("[ArrowUp]");

    expect(document.activeElement).toBe(options[0]);
  });

  it("allows user to select an option by clicking", async () => {
    const handleChange = vi.fn();
    const { getAllByRole } = render(<ComponentUnderTest onChange={handleChange} />);

    const options = getAllByRole("option");

    await userEvent.click(options[1]);

    expect(handleChange).toHaveBeenCalledWith("2");
  });

  it("does not allow user to select a disabled option", async () => {
    const handleChange = vi.fn();
    const { getAllByRole } = render(<ComponentUnderTest onChange={handleChange} />);

    const options = getAllByRole("option");

    await userEvent.click(options[2]);

    expect(handleChange).not.toHaveBeenCalled();
  });
});
