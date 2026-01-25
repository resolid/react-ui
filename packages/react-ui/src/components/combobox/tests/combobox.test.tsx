import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import type { ListboxItem } from "../../listbox/use-listbox";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
} from "../combobox";
import type { ComboboxProps } from "../use-combobox";

const ComponentUnderTest = (props: Omit<ComboboxProps<ListboxItem>, "collection">) => {
  const collection = [
    { value: "react" },
    { value: "solid" },
    { value: "vue" },
    { value: "svelte", disabled: true },
  ];

  return (
    <Combobox collection={collection} {...props}>
      <ComboboxAnchor>
        <ComboboxInput placeholder={"搜索"} />
        <ComboboxTrigger>Open</ComboboxTrigger>
      </ComboboxAnchor>
      <ComboboxPopup>
        <ComboboxContent>
          <ComboboxList />
        </ComboboxContent>
      </ComboboxPopup>
    </Combobox>
  );
};

describe("Combobox", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should show options on click", async () => {
    render(<ComponentUnderTest />);

    fireEvent.click(screen.getByText("Open"));

    await waitFor(() => expect(screen.getByText("Open")).toHaveAttribute("aria-expanded", "true"));
    await waitFor(() => expect(screen.getByRole("option", { name: "react" })).toBeVisible());
  });

  it("should handle item selection", async () => {
    render(<ComponentUnderTest />);

    fireEvent.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByRole("option", { name: "react" })).toBeVisible());

    fireEvent.click(screen.getByRole("option", { name: "react" }));
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue("react"));
  });

  it("should call onChange when item is selected", async () => {
    const onChange = vi.fn();
    render(<ComponentUnderTest onChange={onChange} />);

    fireEvent.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByRole("option", { name: "react" })).toBeVisible());

    fireEvent.click(screen.getByRole("option", { name: "react" }));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  it("should open menu when onOpenChange is called", async () => {
    const onOpenChange = vi.fn();
    render(<ComponentUnderTest onOpenChange={onOpenChange} />);

    fireEvent.click(screen.getByText("Open"));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
  });
});
