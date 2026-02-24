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

export const ListboxFilterBase = (
  props: PrimitiveProps<"input", ListboxFilterBaseProps, "children" | "type" | "disabled">,
): JSX.Element => {
  const { size: listboxSize, disabled } = useListboxState();

  const { getNavigationProps, filterInputRef, setFilterKeyword } = useListboxFilter();

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

  const handleChange = (value: string | number) => {
    onChange?.(value);

    setFilterKeyword(value.toString());
  };

  const refs = useMergeRefs(ref, filterInputRef);

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
      type={"text"}
      autoComplete={"off"}
      autoCapitalize={"none"}
      autoCorrect={"off"}
      spellCheck={false}
      aria-autocomplete={"list"}
      focusable={focusable}
      className={tx("w-full", className)}
      {...getNavigationProps(rest)}
    />
  );
};
