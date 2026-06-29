import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useCallback,
  useDeferredValue,
  useRef,
  useState,
} from "react";
import type { CollectionItem, CollectionProps } from "./collection-types";

export type UseCollectionOptions<T extends CollectionItem> = Omit<CollectionProps<T>, "collection">;

export function useCollection<T extends CollectionItem>({
  valueKey = "value",
  labelKey = "label",
  disabledKey = "disabled",
  childrenKey = "children",
  searchFilter,
  defaultKeyword,
}: UseCollectionOptions<T>): {
  getItemValue: (item: T) => string | number;
  getItemLabel: (item: T) => string;
  getItemDisabled: (item: T) => boolean;
  getItemChildren: <E = T>(item: T) => E[] | undefined;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  pointer: boolean;
  setPointer: Dispatch<SetStateAction<boolean>>;
  elementsRef: RefObject<(HTMLDivElement | null)[]>;
  labelsRef: RefObject<(string | null)[]>;
  typingRef: RefObject<boolean>;
  filterInputRef: RefObject<HTMLInputElement | null>;
  hasFilter: boolean;
  setHasFilter: Dispatch<SetStateAction<boolean>>;
  setFilterKeyword: Dispatch<SetStateAction<string | undefined>>;
  filterPredicate: (item: T) => boolean;
} {
  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const getItemValue = useCallback((item: T) => item[valueKey] as string | number, [valueKey]);
  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const getItemLabel = useCallback((item: T) => item[labelKey] as string, [labelKey]);
  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const getItemDisabled = useCallback((item: T) => item[disabledKey] as boolean, [disabledKey]);
  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const getItemChildren = useCallback(
    <E = T>(item: T) => item[childrenKey] as E[] | undefined,
    [childrenKey],
  );

  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const filterInputRef = useRef<HTMLInputElement | null>(null);
  const labelsRef = useRef<(string | null)[]>([]);
  const typingRef = useRef(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState<string | undefined>(defaultKeyword);
  const deferredKeyword = useDeferredValue(filterKeyword, defaultKeyword);

  // react-doctor-disable-next-line react-doctor/react-compiler-no-manual-memoization
  const filterPredicate = useCallback(
    (item: T) => {
      if (!deferredKeyword || deferredKeyword.length == 0) {
        return true;
      }

      const search =
        searchFilter ??
        ((keyword, listItem) =>
          getItemValue(listItem).toString().toLowerCase().includes(keyword.toLowerCase()));

      return search(deferredKeyword, item);
    },
    [getItemValue, deferredKeyword, searchFilter],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState(false);

  return {
    getItemValue,
    getItemLabel,
    getItemDisabled,
    getItemChildren,
    activeIndex,
    setActiveIndex,
    pointer,
    setPointer,
    elementsRef,
    labelsRef,
    typingRef,
    filterInputRef,
    hasFilter,
    setHasFilter,
    setFilterKeyword,
    filterPredicate,
  };
}
