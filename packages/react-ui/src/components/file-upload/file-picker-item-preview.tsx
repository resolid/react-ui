import type { ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { hasRoundedBaseClass } from "../../shared/utils";
import { tx } from "../../utils";
import { FilePickerImagePreview } from "./file-picker-image-preview";
import { useFilePickerItem } from "./file-picker-item-context";

export type FilePickerItemPreviewProps = {
  /**
   * 预览内容显示规则列表（按顺序匹配, 命中即停止）
   *
   * ## type 匹配的文件 mimeType 类型
   * - `image/*`：匹配所有图片类型
   * - `video/*`：匹配所有视频类型
   * - `application/pdf`：精确匹配 PDF
   *
   * ## render 渲染的预览内容
   */
  rules?: { type: string; render: ReactNode }[];
};

export const FilePickerItemPreview = (
  props: PrimitiveProps<"div", FilePickerItemPreviewProps, "children">,
): JSX.Element => {
  const { rules = [], className, ...rest } = props;

  const file = useFilePickerItem();

  const rule = rules.find((r) => file.file.type.match(r.type));

  return (
    <div
      className={tx(
        "flex items-center justify-center overflow-hidden",
        !hasRoundedBaseClass(className) && "rounded-md",
        className,
      )}
      {...rest}
    >
      {rule ? (
        rule.render
      ) : file.file.type.match("image/*") ? (
        <FilePickerImagePreview />
      ) : (
        <svg className={"size-2/3 text-fg-subtle"} viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
            <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
          </g>
        </svg>
      )}
    </div>
  );
};
