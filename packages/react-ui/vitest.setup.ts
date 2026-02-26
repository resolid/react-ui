import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import { type AxeMatchers, toHaveNoViolations } from "./plugins/vitest-axe";

expect.extend({ toHaveNoViolations });

declare module "vitest" {
  // oxlint-disable-next-line typescript/no-empty-object-type
  export interface Assertion extends AxeMatchers {}
  // oxlint-disable-next-line typescript/no-empty-object-type
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
