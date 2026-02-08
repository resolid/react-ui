import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useLocale } from "../provider/locale-context";
import { useFilePickerAction } from "./file-picker-context";
import { useFilePickerItem } from "./file-picker-item-context";
import { useFileUpload } from "./file-upload-context";

export const FileUploadButton = (
  props: PrimitiveProps<"button", EmptyObject, "type" | "onClick" | "children">,
): JSX.Element | null => {
  const { className, ...rest } = props;

  const { t } = useLocale();

  const file = useFilePickerItem();

  const { autoUpload, uploadFile } = useFileUpload();
  const { updateFile } = useFilePickerAction();

  if (file.kind == "remote" || file.status == "uploading") {
    return null;
  }

  const retry = file.status == "error";

  if (autoUpload && !retry) {
    return null;
  }

  const label = retry ? t("fileUpload.retry") : t("fileUpload.upload");

  const handleClick = async () => {
    await uploadFile(file, updateFile);
  };

  return (
    <button
      aria-label={label}
      type="button"
      className={tx(
        "cursor-pointer rounded-md px-2 py-1 text-sm",
        "bg-bg-neutral hover:bg-bg-neutral-hovered active:bg-bg-neutral-pressed",
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      {label}
    </button>
  );
};
