import {
  type ElementProps,
  type FloatingRootContext,
  useListNavigation,
  useTypeahead,
} from "@floating-ui/react";
import { isArray } from "@resolid/utils";
import {
  type Dispatch,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  type SetStateAction,
  useMemo,
} from "react";
import type { CollectionProps } from "../../primitives/collection/collection-types";
import type { AnyObject } from "../../primitives/polymorphic";
import type { MultipleValueProps } from "../../shared/types";
import { useControllableState } from "../../hooks/use-controllable-state";
import { useCollection } from "../../primitives/collection/use-collection";
import { hasValue } from "../../shared/utils";
import { useDirection } from "../provider/direction-context";

export type ListboxValue = (string | number)[] | string | number | null;
export type ListboxFlatItem<T extends AnyObject> = {
  key: string;
  item: T;
  index: number;
  group: boolean;
  selected: boolean;
  disabled: boolean;
};

export type ListboxBaseProps<T extends AnyObject> = MultipleValueProps<string | number> &
  CollectionProps<T> & {
    /**
     * 自定义项目渲染
     */
    renderItem?: (item: T, status: { active: boolean; selected: boolean }) => ReactNode;

    /**
     * 自定义组标签渲染
     */
    renderGroupLabel?: (group: T) => ReactNode;
  };

export type UseListboxOptions<T extends AnyObject> = Omit<
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

export type UseListboxResult<T extends AnyObject = AnyObject> = {
  getItemValue: (item: T) => string | number;
  getItemLabel: (item: T) => string;
  flatItems: ListboxFlatItem<T>[];
  selectedItems: T[];
  handleSelect: (item: T) => void;
  firstIndex: number;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  selectedIndex: number | null;
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

export function useListbox<T extends AnyObject>(
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
    defaultKeyword,
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
    defaultKeyword,
  });

  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const { flatItems, firstIndex, selectedItems, selectedIndex } = useMemo(() => {
    const flatItems: ListboxFlatItem<T>[] = [];
    const selectedItems: T[] = [];
    let firstIndex: number = -1;
    let selectedIndex: number | null = null;

    const pushItem = (item: T, selected: boolean) => {
      const index = flatItems.length;
      const disabled = getItemDisabled(item);

      flatItems.push({
        key: String(getItemValue(item)),
        item,
        index,
        group: false,
        selected,
        disabled,
      });

      if (firstIndex == -1 && !disabled) {
        firstIndex = index;
      }

      if (selected) {
        selectedItems.push(item);
        // oxlint-disable-next-line typescript/prefer-nullish-coalescing
        if (selectedIndex == null) {
          selectedIndex = index;
        }
      }
    };

    for (const item of collection) {
      const itemChildren = getItemChildren(item);

      if (itemChildren) {
        const flatChildren: { child: T; selected: boolean }[] = [];

        for (const child of itemChildren) {
          const childSelected = hasValue(valueState, getItemValue(child));

          if (childSelected || filterPredicate(child)) {
            flatChildren.push({ child, selected: childSelected });
          }
        }

        if (flatChildren.length > 0) {
          flatItems.push({
            item,
            key: getItemLabel(item),
            index: flatItems.length,
            group: true,
            selected: false,
            disabled: true,
          });
        }

        for (const { child, selected } of flatChildren) {
          pushItem(child, selected);
        }
      } else {
        const selected = hasValue(valueState, getItemValue(item));

        if (selected || filterPredicate(item)) {
          pushItem(item, selected);
        }
      }
    }

    return { flatItems, firstIndex, selectedItems, selectedIndex };
  }, [
    getItemValue,
    collection,
    getItemLabel,
    getItemChildren,
    filterPredicate,
    valueState,
    getItemDisabled,
  ]);

  const handleSelect = (item: T): void => {
    const itemValue = getItemValue(item);

    if (isArray(valueState)) {
      if (valueState.includes(itemValue)) {
        setValueState(valueState.filter((p) => p != itemValue));
      } else {
        setValueState([...valueState, itemValue]);
      }
    } else {
      if (itemValue == valueState) {
        setValueState(null);
      } else {
        setValueState(itemValue);
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
      handleSelect(flatItems[activeIndex]!.item);
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
        handleSelect(flatItems[activeIndex]!.item);
      }
    },
  };

  return {
    getItemValue,
    getItemLabel,
    flatItems,
    firstIndex,
    selectedItems,
    selectedIndex,
    handleSelect,
    activeIndex,
    setActiveIndex,
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
