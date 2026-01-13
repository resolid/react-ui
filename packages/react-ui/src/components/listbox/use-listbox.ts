import {
  type ElementProps,
  type FloatingRootContext,
  useListNavigation,
  useTypeahead,
} from "@floating-ui/react";
import {
  type Dispatch,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  type SetStateAction,
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import { useControllableState } from "../../hooks";
import type { AnyObject } from "../../primitives";
import type { MultipleValueProps } from "../../shared/types";
import type { InputSize } from "../input/input.styles";
import { useDirection } from "../provider/direction-context";

export type ListboxValue = (string | number)[] | string | number | null;
export type ListboxItem = AnyObject;
export type ListboxNodeItem = ListboxItem & { __index: number };
export type ListboxFlatItem = ListboxNodeItem & { __group?: boolean };

export type ListboxBaseProps<T extends ListboxItem> = MultipleValueProps & {
  /**
   * 项目的集合
   */
  collection: T[];

  /**
   * 自定义 `value` 字段名
   * @default "value"
   */
  valueKey?: string;

  /**
   * 自定义 `label` 字段名
   * @default "label"
   */
  labelKey?: string;

  /**
   * 自定义 `disabled` 字段名
   * @default "disabled"
   */
  disabledKey?: string;

  /**
   * 自定义 `children` 字段名
   * @default "children"
   */
  childrenKey?: string;

  /**
   * 自定义过滤函数
   */
  searchFilter?: (keyword: string, item: T) => boolean;

  /**
   * 自定义项目渲染
   */
  renderItem?: (item: T, status: { active: boolean; selected: boolean }) => ReactNode;

  /**
   * 自定义组标签渲染
   */
  renderGroupLabel?: (group: T) => ReactNode;

  /**
   * 大小
   * @default "md"
   */
  size?: InputSize;
};

export type UseListboxOptions<T extends ListboxItem> = Omit<
  ListboxBaseProps<T>,
  "renderItem" | "renderGroupLabel"
> & {
  context: FloatingRootContext;
  typeahead?: boolean;
  loop?: boolean;
  onSelect?: () => void;
  disabled: boolean;
  readOnly: boolean;
  focusItemOnOpen?: boolean;
  openOnArrowKeyDown?: boolean;
};

export type UseListboxResult<T extends ListboxItem> = {
  getItemValue: (item: T) => string | number;
  getItemLabel: (item: T) => string;
  getItemDisabled: (item: T) => boolean;
  getItemChildren: <E = T>(item: T) => E[] | undefined;
  childrenKey: string;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  selectedIndex: number | null;
  nodeItems: ListboxNodeItem[];
  selectedItems: T[];
  selectedIndices: number[];
  handleSelect: (item: T) => void;
  navigationInteraction: ElementProps;
  typeaheadInteraction: ElementProps;
  pointer: boolean;
  virtual: boolean;
  interactiveHandlers: {
    onPointerMove: () => void;
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
    onKeyUp: (e: KeyboardEvent<HTMLElement>) => void;
  };
  handleEnterKeydown: (e: KeyboardEvent<HTMLElement>) => void;
  elementsRef: RefObject<(HTMLDivElement | null)[]>;
  typingRef: RefObject<boolean>;
  filterInputRef: RefObject<HTMLInputElement | null>;
  setFilterKeyword: Dispatch<SetStateAction<string | undefined>>;
};

export const useListbox = <T extends ListboxItem>(
  options: UseListboxOptions<T>,
): UseListboxResult<T> => {
  const {
    disabled = false,
    readOnly = false,
    multiple = false,
    value,
    defaultValue = multiple ? [] : null,
    onChange,
    collection = [],
    valueKey = "value",
    labelKey = "label",
    disabledKey = "disabled",
    childrenKey = "children",
    context,
    typeahead = true,
    loop,
    focusItemOnOpen,
    openOnArrowKeyDown,
    onSelect,
    searchFilter,
  } = options;

  const [valueState, setValueState] = useControllableState<ListboxValue>({
    value,
    defaultValue,
    onChange: onChange,
  });

  const direction = useDirection(true);

  const getItemValue = useCallback(
    (item: T) => {
      return item[valueKey] as string | number;
    },
    [valueKey],
  );

  const getItemLabel = useCallback(
    (item: T) => {
      return item[labelKey] as string;
    },
    [labelKey],
  );

  const getItemDisabled = useCallback(
    (item: T) => {
      return item[disabledKey] as boolean;
    },
    [disabledKey],
  );

  const getItemChildren = useCallback(
    <E = T>(item: T) => {
      return item[childrenKey] as E[] | undefined;
    },
    [childrenKey],
  );

  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const filterInputRef = useRef<HTMLInputElement | null>(null);
  const labelsRef = useRef<(string | null)[]>([]);
  const typingRef = useRef(false);
  const [filterKeyword, setFilterKeyword] = useState<string>();
  const deferredKeyword = useDeferredValue(filterKeyword);

  const { nodeItems, indexedItems, selectedItems, selectedIndices } = useMemo(() => {
    const nodeItems: ListboxNodeItem[] = [];
    const indexedItems: T[] = [];
    const selectedItems: T[] = [];
    const selectedIndices: number[] = [];

    let itemIndex = 0;

    const checkFilter = (item: T) => {
      if (!deferredKeyword) {
        return true;
      }

      if (deferredKeyword.length == 0) {
        return true;
      }

      return (
        searchFilter ||
        ((keyword, item) =>
          getItemValue(item).toString().toLowerCase().includes(keyword.toLowerCase()))
      )(deferredKeyword, item);
    };

    const addItem = (item: T) => {
      const value = getItemValue(item);

      const selected = Array.isArray(valueState) ? valueState.includes(value) : valueState == value;

      if (selected) {
        selectedItems.push(item);
        selectedIndices.push(itemIndex);
      }

      if (selected || checkFilter(item)) {
        indexedItems.push(item);
        labelsRef.current[itemIndex] = String(value);

        return true;
      }

      return false;
    };

    for (const item of collection) {
      const children = getItemChildren(item);

      if (Array.isArray(children)) {
        const childrenItems = [];

        for (const child of children) {
          if (addItem(child)) {
            childrenItems.push({ ...child, __index: itemIndex });
            itemIndex++;
          }
        }

        if (childrenItems.length > 0) {
          nodeItems.push({ ...item, [childrenKey]: childrenItems, __index: 0 });
        }
      } else {
        if (addItem(item)) {
          nodeItems.push({ ...item, __index: itemIndex });
          itemIndex++;
        }
      }
    }

    return { nodeItems, indexedItems, selectedItems, selectedIndices };
  }, [
    childrenKey,
    collection,
    deferredKeyword,
    getItemChildren,
    getItemValue,
    searchFilter,
    valueState,
  ]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState(false);

  const selectedIndex = selectedIndices[0] ?? null;

  const handleSelect = (item: T): void => {
    const value = getItemValue(item);

    if (Array.isArray(valueState)) {
      if (valueState.includes(value)) {
        setValueState(valueState.filter((p) => p != value));
      } else {
        setValueState([...valueState, value]);
      }
    } else {
      if (value != valueState) {
        setValueState(value);
      } else {
        setValueState(null);
      }
    }

    onSelect?.();
  };

  const virtual = !!context.elements.reference || !!filterInputRef.current;

  const navigationInteraction = useListNavigation(context, {
    enabled: !disabled && !readOnly,
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop,
    virtual,
    focusItemOnOpen: focusItemOnOpen ?? "auto",
    openOnArrowKeyDown,
    rtl: direction == "rtl",
  });

  // noinspection JSUnusedGlobalSymbols
  const typeaheadInteraction = useTypeahead(context, {
    enabled: !disabled && !readOnly && typeahead,
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    resetMs: 500,
    onMatch: (index) => {
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    onTypingChange: (nextTyping) => {
      typingRef.current = nextTyping;
    },
  });

  const handleEnterKeydown = (e: KeyboardEvent<HTMLElement>): void => {
    if (activeIndex != null && e.key == "Enter") {
      handleSelect(indexedItems[activeIndex]);
    }
  };

  // noinspection JSUnusedGlobalSymbols
  const interactiveHandlers = {
    onPointerMove: (): void => {
      setPointer(true);
    },
    onKeyDown: (e: KeyboardEvent<HTMLElement>): void => {
      setPointer(false);

      handleEnterKeydown(e);

      if (e.key == " " && !typingRef.current) {
        e.preventDefault();
      }
    },
    onKeyUp: (e: KeyboardEvent<HTMLElement>): void => {
      if (activeIndex != null && e.key == " " && !typingRef.current) {
        handleSelect(indexedItems[activeIndex]);
      }
    },
  };

  return {
    getItemValue,
    getItemLabel,
    getItemDisabled,
    getItemChildren,
    childrenKey,
    activeIndex,
    setActiveIndex,
    selectedIndex,
    nodeItems,
    selectedItems,
    selectedIndices,
    handleSelect,
    navigationInteraction,
    typeaheadInteraction,
    pointer,
    interactiveHandlers,
    handleEnterKeydown,
    elementsRef,
    typingRef,
    filterInputRef,
    setFilterKeyword,
    virtual,
  };
};
