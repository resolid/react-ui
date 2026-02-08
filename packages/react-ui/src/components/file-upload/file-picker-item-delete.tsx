import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { CloseButton, type CloseButtonProps } from "../close-button/close-button";
import { useLocale } from "../provider/locale-context";
import { useFilePickerAction, useFilePickerStatus } from "./file-picker-context";
import { useFilePickerItem } from "./file-picker-item-context";

export const FilePickerItemDelete = (
  props: PrimitiveProps<"button", CloseButtonProps, "onClick" | "disabled">,
): JSX.Element => {
  const { t } = useLocale();
  const { disabled } = useFilePickerStatus();
  const { removeFile } = useFilePickerAction();

  const file = useFilePickerItem();

  const handleClick = async () => {
    await removeFile(file.id);
  };

  return (
    <CloseButton
      aria-label={t("fileUpload.remove")}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    />
  );
};
