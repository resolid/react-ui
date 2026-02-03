import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ProgressBar, type ProgressBarProps } from "../progress-bar";

const ProgressBarUnderTest = (props: ProgressBarProps) => <ProgressBar {...props}></ProgressBar>;

describe("ProgressBar", () => {
  it("should have no a11y violations", async () => {
    const { container } = render(<ProgressBarUnderTest percent={20} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
