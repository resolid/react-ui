import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Separator } from "../separator";

describe("Separator", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a div with the `separator` role", async () => {
    const { getByRole } = render(<Separator />);

    expect(getByRole("separator")).toBeVisible();
  });

  it("should have implicit 'aria-orientation' by default", () => {
    const { getByRole } = render(<Separator />);

    const separator = getByRole("separator");

    expect(separator).toHaveAttribute("aria-orientation");
  });
});
