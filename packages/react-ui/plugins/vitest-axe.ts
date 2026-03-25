import { format, plugins } from "@vitest/pretty-format";
import {
  type AxeResults,
  configure,
  getRules,
  type ImpactValue,
  type Result,
  run,
  type RunOptions,
  type Spec,
} from "axe-core";
import { styleText } from "node:util";

function mount(html: Element | string): [HTMLElement, () => void] {
  // noinspection SuspiciousTypeOfGuard
  if (!!html && typeof html === "object" && typeof html.tagName === "string") {
    if (document.body.contains(html)) {
      return [html as HTMLElement, () => undefined];
    }

    html = html.outerHTML;
  }

  if (typeof html === "string" && /(<([^>]+)>)/i.test(html)) {
    const originalHTML = document.body.innerHTML;

    const restore = () => {
      document.body.innerHTML = originalHTML;
    };

    document.body.innerHTML = html;

    return [document.body, restore];
  }

  if (typeof html === "string") {
    throw new Error(`html parameter ("${html}") has no elements`);
  }

  throw new Error(`html parameter should be an HTML string or an HTML element`);
}

const AXE_RULES_COLOR = getRules(["cat.color"]);

function configureAxe(
  options: RunOptions & {
    globalOptions?: Spec;
    impactLevels?: ImpactValue[];
  } = {},
): (html: Element | string, additionalOptions?: RunOptions) => Promise<AxeResults> {
  const { globalOptions = {}, ...runnerOptions } = options;

  const { rules = [], ...otherGlobalOptions } = globalOptions;

  const defaultRules = AXE_RULES_COLOR.map(({ ruleId: id }) => ({
    id,
    enabled: false,
  }));

  configure({
    rules: [...defaultRules, ...rules],
    ...otherGlobalOptions,
  });

  return function axe(
    html: Element | string,
    additionalOptions: RunOptions = {},
  ): Promise<AxeResults> {
    const [element, restore] = mount(html);

    const options: RunOptions = { ...runnerOptions, ...additionalOptions };

    return new Promise<AxeResults>((resolve) => {
      run(element, options, (err, results) => {
        restore();

        // oxlint-disable-next-line typescript/no-unnecessary-condition
        if (err) {
          throw err;
        }

        resolve(results);
      });
    });
  };
}

export type NoViolationsMatcherResult = {
  actual: Result[];
  message(): string;
  pass: boolean;
};

export type AxeMatchers = {
  toHaveNoViolations(): NoViolationsMatcherResult;
};

const {
  AsymmetricMatcher,
  DOMCollection,
  DOMElement,
  Immutable,
  ReactElement,
  ReactTestComponent,
} = plugins;

const PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher,
];

const SPACE_SYMBOL = "\u{00B7}";

function stringify(object: unknown, maxDepth = 10, maxWidth = 10): string {
  const MAX_LENGTH = 10000;
  let result: string;

  try {
    result = format(object, {
      maxDepth,
      maxWidth,
      min: true,
      plugins: PLUGINS,
    });
  } catch {
    result = format(object, {
      callToJSON: false,
      maxDepth,
      maxWidth,
      min: true,
      plugins: PLUGINS,
    });
  }

  if (result.length >= MAX_LENGTH && maxDepth > 1) {
    return stringify(object, Math.floor(maxDepth / 2), maxWidth);
  }

  if (result.length >= MAX_LENGTH && maxWidth > 1) {
    return stringify(object, maxDepth, Math.floor(maxWidth / 2));
  }

  return result;
}

function replaceTrailingSpaces(text: string): string {
  return text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL.repeat(spaces.length));
}

function filterViolations(violations: Result[], impactLevels: ImpactValue[]) {
  if (impactLevels.length > 0) {
    return violations.filter((v) => impactLevels.includes(v.impact!));
  }

  return violations;
}

type MatcherHintOptions = {
  comment?: string;
  isDirectExpectCall?: boolean;
  isNot?: boolean;
  promise?: string;
  secondArgument?: string;
};

function matcherHint(
  matcherName: string,
  received = "received",
  expected = "expected",
  options: MatcherHintOptions = {},
): string {
  const {
    comment = "",
    isDirectExpectCall = false,
    isNot = false,
    promise = "",
    secondArgument = "",
  } = options;
  let hint = "";
  let dimString = "expect";

  if (!isDirectExpectCall && received !== "") {
    hint += styleText("dim", `${dimString}(`) + styleText("red", received);
    dimString = ")";
  }

  if (promise !== "") {
    hint += styleText("dim", `${dimString}.`) + promise;
    dimString = "";
  }

  if (isNot) {
    hint += `${styleText("dim", `${dimString}.`)}not`;
    dimString = "";
  }

  if (matcherName.includes(".")) {
    dimString += matcherName;
  } else {
    hint += styleText("dim", `${dimString}.`) + matcherName;
    dimString = "";
  }

  if (expected === "") {
    dimString += "()";
  } else {
    hint += styleText("dim", `${dimString}(`) + styleText("green", expected);
    if (secondArgument) {
      hint += styleText("dim", ", ") + styleText("green", secondArgument);
    }
    dimString = ")";
  }

  if (comment !== "") {
    dimString += ` // ${comment}`;
  }

  if (dimString !== "") {
    hint += styleText("dim", dimString);
  }

  return hint;
}

function toHaveNoViolations(results: AxeResults): NoViolationsMatcherResult {
  if (typeof results.violations === "undefined") {
    throw new Error(
      "Unexpected aXe results object. No violations property found.\nDid you change the `reporter` in your aXe configuration?",
    );
  }

  const violations = filterViolations(
    results.violations,
    // @ts-expect-error impactLevels
    results.toolOptions.impactLevels ?? [],
  );

  function reporter(violations: Result[]) {
    if (violations.length === 0) {
      return [];
    }

    const lineBreak = "\n\n";
    const horizontalLine = "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500";

    return violations
      .map((violation) => {
        return violation.nodes
          .map((node) => {
            return [
              `Expected the HTML found at $('${node.target.join(", ")}') to have no violations:`,
              styleText("gray", node.html),
              "Received:",
              styleText(
                "red",
                replaceTrailingSpaces(stringify(`${violation.help} (${violation.id})`)),
              ),
              styleText("yellow", node.failureSummary ?? ""),
              violation.helpUrl
                ? `You can find more information on this issue here: \n${styleText(
                    "blue",
                    violation.helpUrl,
                  )}`
                : "",
            ].join(lineBreak);
          })
          .join(lineBreak);
      })
      .join(lineBreak + horizontalLine + lineBreak);
  }

  const formatedViolations = reporter(violations);
  const pass = formatedViolations.length === 0;

  function message(): string {
    if (pass) {
      return "";
    }

    return `${matcherHint(".toHaveNoViolations")}

${formatedViolations as string}`;
  }

  return { actual: violations, message, pass };
}

const axe: (html: Element | string, additionalOptions?: RunOptions) => Promise<AxeResults> =
  configureAxe();

export { configureAxe, axe, toHaveNoViolations };
