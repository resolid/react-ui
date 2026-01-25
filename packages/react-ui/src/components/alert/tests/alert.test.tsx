import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Alert, AlertContent, AlertDescription, type AlertProps, AlertTitle } from "../alert";

const ComponentUnderTest = (props: AlertProps) => (
  <Alert {...props}>
    <AlertContent>
      <AlertTitle>title</AlertTitle>
      <AlertDescription>description</AlertDescription>
    </AlertContent>
  </Alert>
);

describe("Alert", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
