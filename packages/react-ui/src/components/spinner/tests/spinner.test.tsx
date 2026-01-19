import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { axe } from "vitest-axe";
import { LocaleProvider } from "../../provider/locale-provider";
import { Spinner, type SpinnerProps } from "../spinner";

const ComponentUnderTest = (props: SpinnerProps) => {
  return (
    <LocaleProvider>
      <Spinner {...props} />
    </LocaleProvider>
  );
};

describe("Spinner", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  test("should render with default sr-only", () => {
    const { getByText } = render(<ComponentUnderTest />);

    expect(getByText("Loading")).toHaveClass("sr-only");
  });
});
