import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  type AccordionProps,
  AccordionTrigger,
} from "../accordion";

const ComponentUnderTest = (props: AccordionProps) => {
  const items = [
    { value: "React" },
    { value: "Solid" },
    { value: "Svelte", disabled: true },
    { value: "Vue" },
  ];

  return (
    <Accordion {...props}>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item.value} disabled={item.disabled}>
          <AccordionHeader>
            <AccordionTrigger>{item.value} Trigger</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>{item.value} Content</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

describe("Accordion", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should not have an expanded item by default", async () => {
    render(<ComponentUnderTest />);

    expect(screen.getByRole("button", { name: "React Trigger" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("should open item specified in defaultValue", async () => {
    render(<ComponentUnderTest defaultValue={["Solid"]} />);

    expect(screen.getByRole("button", { name: "Solid Trigger" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("should collapse an expanded item when collapsible is true", async () => {
    render(<ComponentUnderTest collapsible multiple={false} />);

    const button = screen.getByRole("button", { name: "React Trigger" });

    await userEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("should disable a single item", async () => {
    render(<ComponentUnderTest />);

    expect(screen.getByRole("button", { name: "Svelte Trigger" })).toBeDisabled();
  });

  it("should disable all items when disabled is true", async () => {
    render(<ComponentUnderTest disabled />);

    expect(screen.getByRole("button", { name: "React Trigger" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Solid Trigger" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Svelte Trigger" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Vue Trigger" })).toBeDisabled();
  });

  it("should allow multiple items to be expanded when multiple is true", async () => {
    render(<ComponentUnderTest multiple />);

    const reactButton = screen.getByRole("button", { name: "React Trigger" });
    const vueButton = screen.getByRole("button", { name: "Vue Trigger" });

    await userEvent.click(reactButton);
    await userEvent.click(vueButton);

    expect(reactButton).toHaveAttribute("aria-expanded", "true");
    expect(vueButton).toHaveAttribute("aria-expanded", "true");
  });

  it("should call onChange when an item is clicked", async () => {
    const onChange = vi.fn();
    render(<ComponentUnderTest onChange={onChange} />);

    const button = screen.getByRole("button", { name: "React Trigger" });

    await userEvent.click(button);
    expect(onChange).toHaveBeenCalled();
  });

  it("should focus the next/previous item on arrow up & down", async () => {
    render(<ComponentUnderTest />);

    const firstButton = screen.getByRole("button", { name: "React Trigger" });
    const secondButton = screen.getByRole("button", { name: "Solid Trigger" });

    await userEvent.click(firstButton);

    await userEvent.type(firstButton, "{arrowdown}");
    expect(secondButton).toHaveFocus();

    await userEvent.type(secondButton, "{arrowup}");
    expect(firstButton).toHaveFocus();
  });

  it("should not collapse the current visible item", async () => {
    render(<ComponentUnderTest multiple={false} collapsible={false} />);

    const button = screen.getByRole("button", { name: "React Trigger" });

    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should move the focus to the next element when pressing tab", async () => {
    render(<ComponentUnderTest />);

    const firstButton = screen.getByRole("button", { name: "React Trigger" });
    const secondButton = screen.getByRole("button", { name: "Solid Trigger" });

    await userEvent.click(firstButton);

    await userEvent.type(firstButton, "{tab}");
    expect(secondButton).toHaveFocus();
  });
});
