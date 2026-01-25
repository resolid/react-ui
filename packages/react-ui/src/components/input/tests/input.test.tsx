import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Input } from "../input";

describe("Input", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<Input aria-label={"Input"} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
