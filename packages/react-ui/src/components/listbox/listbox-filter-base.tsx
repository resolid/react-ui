import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { useMergeRefs } from "../../hooks";
import { SearchIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { InputBase, type InputBaseProps } from "../input/input-base";
import { useListboxFilter } from "./listbox-filter-context";
import { useListboxState } from "./listbox-state-context";

export type ListboxFilterBaseProps = Omit<
  InputBaseProps,
  "type" | "name" | "required" | "readOnly" | "invalid" | "suffix" | "suffixWidth"
>;

export function ListboxFilterBase(
  props: PrimitiveProps<"input", ListboxFilterBaseProps, "children" | "type" | "disabled">,
): JSX.Element {
  const { size: listboxSize, disabled } = useListboxState();

  const { getNavigationProps, filterInputRef, setHasFilter, setFilterKeyword } = useListboxFilter();

  const {
    size = listboxSize,
    prefix,
    prefixWidth,
    value,
    defaultValue,
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
      value={value}
      defaultValue={defaultValue}
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
