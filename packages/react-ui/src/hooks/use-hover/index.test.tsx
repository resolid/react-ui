import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useHover } from "./index";

const ComponentUnderTest = () => {
  const [ref, hovered] = useHover<HTMLDivElement>();

  return (
    <div data-testid="target" ref={ref}>
      {hovered ? "true" : "false"}
    </div>
  );
};

describe("userHover", () => {
  it("changes `hovered` on mouseenter/mouseleave correctly", () => {
    render(<ComponentUnderTest />);
    const target = screen.getByTestId("target");

    expect(target).toHaveTextContent("false");

    fireEvent.mouseEnter(target);
    expect(target).toHaveTextContent("true");

    fireEvent.mouseLeave(target);
    expect(target).toHaveTextContent("false");
  });
});
