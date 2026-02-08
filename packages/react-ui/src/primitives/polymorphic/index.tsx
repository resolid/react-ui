import type { JSX, ReactNode } from "react";

export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<never, never>;
export type Dict<V> = Record<string, V>;

export type PrimitiveProps<
  T extends keyof JSX.IntrinsicElements,
  P extends AnyObject = EmptyObject,
  O extends keyof JSX.IntrinsicElements[T] = never,
> = P & Omit<JSX.IntrinsicElements[T], keyof P | O>;

type StateProp<S> = S extends undefined ? { state?: undefined } : { state: S };

type RenderProps<S = undefined> = {
  render?: S extends undefined
    ? (props: AnyObject) => ReactNode
    : (props: AnyObject, state: S) => ReactNode;
};

export type PolymorphicProps<
  T extends keyof JSX.IntrinsicElements,
  P extends AnyObject = EmptyObject,
  O extends keyof JSX.IntrinsicElements[T] = never,
  S = undefined,
> = RenderProps<S> & PrimitiveProps<T, P, O>;

export const Polymorphic = <T extends keyof JSX.IntrinsicElements, S = undefined>(
  props: { as: string } & RenderProps<S> & StateProp<S> & JSX.IntrinsicElements[T],
): ReactNode => {
  const { render, as: Tag, state, ...rest } = props;

  if (render) {
    return render(rest, state as S);
  }

  return <Tag {...rest} />;
};
