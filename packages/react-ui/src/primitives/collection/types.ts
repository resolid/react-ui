import type { AnyObject } from "../polymorphic";

export type CollectionItem = AnyObject;

export type CollectionProps<T extends CollectionItem> = {
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
};
