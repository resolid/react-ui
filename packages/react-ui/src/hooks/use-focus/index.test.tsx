import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFocus } from "./index";

const ComponentUnderTest = () => {
  const [ref, focused] = useFocus<HTMLDivElement>();

  return (
    <div data-testid="target" ref={ref}>
      {focused ? "true" : "false"}
    </div>
  );
};

describe("useFocus", () => {
  it("changes `focused` on focus correctly", () => {
    render(<ComponentUnderTest />);
    const target = screen.getByTestId("target");

    expect(target).toHaveTextContent("false");

    fireEvent.focus(target);
    expect(target).toHaveTextContent("true");
  });
});
