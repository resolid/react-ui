import type { JSX, ReactNode } from "react";

export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<never, never>;
export type Dict<V> = Record<string, V>;
export type ElementTag = keyof JSX.IntrinsicElements;
export type ElementProps<T extends ElementTag> = JSX.IntrinsicElements[T];

export type PrimitiveProps<
  T extends ElementTag,
  P extends AnyObject = EmptyObject,
  O extends keyof ElementProps<T> = never,
> = P & Omit<ElementProps<T>, keyof P | O>;

type StateProp<S> = S extends undefined ? { state?: undefined } : { state: S };

type RenderProps<S = undefined> = {
  render?: S extends undefined
    ? (props: AnyObject) => ReactNode
    : (props: AnyObject, state: S) => ReactNode;
};

export type PolymorphicProps<
  T extends ElementTag,
  P extends AnyObject = EmptyObject,
  O extends keyof ElementProps<T> = never,
  S = undefined,
> = RenderProps<S> & PrimitiveProps<T, P, O>;

export function Polymorphic<T extends ElementTag, S = undefined>(
  props: { as: string } & RenderProps<S> & StateProp<S> & ElementProps<T>,
): ReactNode {
  const { render, as: Tag, state, ...rest } = props;

  if (render) {
    return render(rest, state as S);
  }

  return <Tag {...rest} />;
}
