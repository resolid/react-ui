import { callAll } from "@resolid/utils";
import { tx } from "../clsx";
import { css } from "../css";

type Props = Record<string | symbol, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TupleTypes<T extends any[]> = T[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

export const mergeProps = <T extends Props>(
  ...args: (T | null | undefined)[]
): UnionToIntersection<TupleTypes<T[]>> => {
  const result: Props = { ...args[0] };

  for (let i = 1; i < args.length; i++) {
    const props = args[i];

    if (!props) {
      continue;
    }

    for (const key of Object.keys(props)) {
      const a = result[key];
      const b = props[key];

      if (
        typeof a === "function" &&
        typeof b === "function" &&
        key[0] === "o" &&
        key[1] === "n" &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        result[key] = callAll(a, b);
        continue;
      }

      if (key === "className") {
        result[key] = tx(a, b);
        continue;
      }

      if (key === "style") {
        result[key] = css(a, b);
        continue;
      }

      result[key] = b !== undefined ? b : a;
    }
  }

  return result as UnionToIntersection<TupleTypes<T[]>>;
};
