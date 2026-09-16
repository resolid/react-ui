import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import { type NoViolationsMatcherResult, toHaveNoViolations } from "./plugins/vitest-axe";

expect.extend({ toHaveNoViolations });

declare module "vitest" {
  interface Matchers<R, T> {
    toHaveNoViolations: () => NoViolationsMatcherResult;
  }
}
