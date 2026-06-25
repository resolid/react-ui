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
  useMemo,
} from "react";
import type {
  CollectionFields,
  CollectionItem,
  CollectionProps,
} from "../../primitives/collection/types";
import type { MultipleValueProps } from "../../shared/types";
import type { InputSize } from "../input/input.styles";
import { useControllableState } from "../../hooks/use-controllable-state";
import { useCollection } from "../../primitives/collection/use-collection";
import { useDirection } from "../provider/direction-context";

export type ListboxValue = (string | number)[] | string | number | null;
export type ListboxItem = CollectionItem;
export type ListboxNodeItem = ListboxItem & { __index: number };
export type ListboxFlatItem = ListboxNodeItem & { __group?: boolean };

export type ListboxBaseProps<T extends ListboxItem> = MultipleValueProps<string | number> &
  CollectionProps<T> & {
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
  "renderItem" | "renderGroupLabel" | "size"
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

export type UseListboxResult<T extends ListboxItem> = CollectionFields<T> & {
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
  labelsRef: RefObject<(string | null)[]>;
  typingRef: RefObject<boolean>;
  filterInputRef: RefObject<HTMLInputElement | null>;
  setHasFilter: Dispatch<SetStateAction<boolean>>;
  setFilterKeyword: Dispatch<SetStateAction<string | undefined>>;
};

export function useListbox<T extends ListboxItem>(
  options: UseListboxOptions<T>,
): UseListboxResult<T> {
  const {
    disabled,
    readOnly,
    multiple = false,
    value,
    defaultValue = multiple ? [] : null,
    onChange,
    collection,
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

  const direction = useDirection(true);

  const [valueState, setValueState] = useControllableState<ListboxValue>({
    value,
    defaultValue,
    onChange,
  });

  const {
    getItemValue,
    getItemLabel,
    getItemDisabled,
    getItemChildren,
    elementsRef,
    filterInputRef,
    labelsRef,
    typingRef,
    hasFilter,
    setHasFilter,
    filterPredicate,
    setFilterKeyword,
    activeIndex,
    setActiveIndex,
    pointer,
    setPointer,
  } = useCollection({
    valueKey,
    labelKey,
    childrenKey,
    disabledKey,
    searchFilter,
  });

  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const { nodeItems, indexedItems, selectedItems, selectedIndices } = useMemo(() => {
    const nodes: ListboxNodeItem[] = [];
    const indexes: T[] = [];
    const selects: T[] = [];
    const indices: number[] = [];

    let itemIndex = 0;

    const addItem = (item: T) => {
      const itemValue = getItemValue(item);

      const selected = Array.isArray(valueState)
        ? valueState.includes(itemValue)
        : valueState == itemValue;

      if (selected) {
        selects.push(item);
        indices.push(itemIndex);
      }

      if (selected || filterPredicate(item)) {
        indexes.push(item);

        return true;
      }

      return false;
    };

    for (const item of collection) {
      const children = getItemChildren(item);

      if (Array.isArray(children)) {
        const childrenNodes = [];

        for (const child of children) {
          if (addItem(child)) {
            childrenNodes.push({ ...child, __index: itemIndex });
            // react-doctor-disable-next-line
            itemIndex++;
          }
        }

        if (childrenNodes.length > 0) {
          nodes.push({ ...item, [childrenKey]: childrenNodes, __index: 0 });
        }
      } else {
        if (addItem(item)) {
          nodes.push({ ...item, __index: itemIndex });
          // react-doctor-disable-next-line
          itemIndex++;
        }
      }
    }

    return {
      nodeItems: nodes,
      indexedItems: indexes,
      selectedItems: selects,
      selectedIndices: indices,
    };
  }, [childrenKey, collection, getItemChildren, getItemValue, filterPredicate, valueState]);

  const selectedIndex = selectedIndices[0] ?? null;

  const handleSelect = (item: T): void => {
    const itemValue = getItemValue(item);

    if (Array.isArray(valueState)) {
      if (valueState.includes(itemValue)) {
        setValueState(valueState.filter((p) => p != itemValue));
      } else {
        setValueState([...valueState, itemValue]);
      }
    } else {
      if (itemValue != valueState) {
        setValueState(itemValue);
      } else {
        setValueState(null);
      }
    }

    onSelect?.();
  };

  const virtual = !!context.elements.reference || hasFilter;

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
      handleSelect(indexedItems[activeIndex]!);
    }
  };

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
        handleSelect(indexedItems[activeIndex]!);
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
    labelsRef,
    typingRef,
    filterInputRef,
    setHasFilter,
    setFilterKeyword,
    virtual,
  };
}
