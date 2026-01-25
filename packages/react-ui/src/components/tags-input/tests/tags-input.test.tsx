import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { LocaleProvider } from "../../provider/locale-provider";
import { TagsInput, TagsInputInput, type TagsInputProps } from "../tags-input";

const ComponentUnderTest = (props: TagsInputProps) => {
  return (
    <LocaleProvider>
      <TagsInput placeholder={"Add tag"} defaultValue={["react", "solid", "vue"]} {...props}>
        <TagsInputInput aria-label={"Input"} />
      </TagsInput>
    </LocaleProvider>
  );
};

describe("TagsInput", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should allow to add a new item", async () => {
    render(<ComponentUnderTest />);

    const input = screen.getByPlaceholderText("Add tag");

    await userEvent.type(input, "angular");
    await userEvent.keyboard("[Enter]");

    expect(screen.getByText("angular")).toBeInTheDocument();
  });

  it("should allow to add and delete a new item", async () => {
    render(<ComponentUnderTest />);
    const input = screen.getByPlaceholderText("Add tag");
    await userEvent.type(input, "angular[enter]");

    expect(screen.queryByText("angular")).toBeInTheDocument();

    await userEvent.type(input, "[ArrowLeft]", { delay: 10 });
    await waitFor(() =>
      expect(screen.getByText("angular")).toHaveAttribute("aria-selected", "true"),
    );

    await userEvent.type(input, "[Delete]");
    expect(screen.queryByText("angular")).not.toBeInTheDocument();
  });
});
