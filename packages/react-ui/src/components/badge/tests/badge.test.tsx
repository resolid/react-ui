import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Badge } from "../badge";

describe("Badge", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<Badge>Badge</Badge>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
