import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from "../avatar";

const ComponentUnderTest = (props: AvatarProps) => {
  return (
    <Avatar name={"avatar"} {...props}>
      <AvatarImage src="https://file.resolid.tech/images%2Fa001.jpg" />
      <AvatarFallback>PA</AvatarFallback>
    </Avatar>
  );
};

describe("Avatar", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
