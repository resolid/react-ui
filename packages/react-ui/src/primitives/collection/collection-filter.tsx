import type { ReactNode } from "react";
import type { PrimitiveProps } from "../../primitives/polymorphic";
import { InputBase, type InputBaseProps } from "../../components/input/input-base";
import { useMergeRefs } from "../../hooks/use-merge-refs";
import { useCollectionState } from "../../primitives/collection/collection-state-context";
import { SearchIcon } from "../../shared/icons";
import { tx } from "../../utils/clsx";
import { useCollectionFilter } from "./collection-filter-context";

export type CollectionFilterProps = Omit<
  InputBaseProps,
  | "type"
  | "name"
  | "required"
  | "readOnly"
  | "invalid"
  | "suffix"
  | "suffixWidth"
  | "value"
  | "defaultValue"
>;

export function CollectionFilter(
  props: PrimitiveProps<"input", CollectionFilterProps, "children" | "type" | "disabled">,
): ReactNode {
  const { size: initSize, disabled: initDisabled } = useCollectionState();

  const { getNavigationProps, filterInputRef, setHasFilter, filterKeyword, setFilterKeyword } =
    useCollectionFilter();

  const {
    size = initSize,
    disabled = initDisabled,
    prefix,
    prefixWidth,
    onChange,
    className,
    focusable,
    ref,
    ...rest
  } = props;

  const handleChange = (changed: string | number) => {
    onChange?.(changed);
    setFilterKeyword(changed.toString());
  };

  const refs = useMergeRefs(ref, filterInputRef, () => {
    setHasFilter(true);
    return () => {
      setHasFilter(false);
    };
  });

  return (
    <InputBase
      ref={refs}
      defaultValue={filterKeyword}
      onChange={handleChange}
      prefix={prefix}
      prefixWidth={prefixWidth}
      suffix={<SearchIcon />}
      disabled={disabled}
      size={size}
      type="text"
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      aria-autocomplete="list"
      focusable={focusable}
      className={tx("w-full", className)}
      {...getNavigationProps(rest)}
    />
  );
}
