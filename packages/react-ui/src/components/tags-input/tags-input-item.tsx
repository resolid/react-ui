import { useListItem } from "@floating-ui/react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { useComposite } from "../../primitives/composite/composite-context";
import { ariaAttr, tx } from "../../utils";
import { CloseButton } from "../close-button/close-button";
import { useLocale } from "../provider/locale-context";

type TagsInputItemProps = {
  value: string;
  disabled: boolean;
  onDelete: (index: number) => void;
};

export const TagsInputItem = (
  props: PrimitiveProps<"div", TagsInputItemProps, "ref" | "children">,
): JSX.Element => {
  const { value, disabled, onDelete, className, ...rest } = props;

  const { ref: itemRef, index } = useListItem();
  const { activeIndex } = useComposite();

  const selected = activeIndex === index;

  const handelDelete = () => {
    onDelete(index);
  };

  const { t } = useLocale();

  return (
    <div
      ref={itemRef}
      aria-disabled={ariaAttr(disabled)}
      aria-selected={ariaAttr(selected)}
      data-index={index}
      className={tx(
        "inline-flex items-center gap-1 rounded-md pe-1",
        selected ? "bg-bg-subtle" : "bg-bg-subtlest",
        className,
      )}
      {...rest}
    >
      {value}
      <CloseButton
        radius
        disabled={disabled}
        className={"pointer-events-auto h-full"}
        onClick={handelDelete}
        tabIndex={-1}
        noPadding
        aria-label={t("tagsInput.deleteTag")}
        size={"1em"}
      />
    </div>
  );
};
