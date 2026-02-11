import { formatBytes, isNullish, matchesAccept, omit, random } from "@resolid/utils";
import { type ChangeEvent, useReducer, useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import type { FormFieldProps, MultipleValueProps } from "../../shared/types";
import { tx } from "../../utils";
import { useLocale } from "../provider/locale-context";
import { FileHiddenInput } from "./file-hidden-input";
import {
  type FileItem,
  FilePickerActionContext,
  type FilePickerActionContextValue,
  FilePickerFilesContext,
  FilePickerInputRefContext,
  FilePickerStatusContext,
  type FilePickerStatusContextValue,
  type LocalFileItem,
  type RemoteFile,
} from "./file-picker-context";
import { useFileUpload } from "./file-upload-context";

export type FilePickerProps = FormFieldProps & {
  /**
   * 允许多文件
   * @default false
   */
  multiple?: boolean;
} & Omit<MultipleValueProps<FileItem, RemoteFile>, "multiple"> & {
    /**
     * 允许文件类型
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
     * @default "*"
     */
    accept?: string;

    /**
     * 最大文件数量
     * @default Infinity
     */
    maxFiles?: number;

    /**
     * 最大文件大小（字节单位）
     * @default Infinity
     */
    maxSize?: number;

    /**
     * 最小文件大小（字节单位）
     * @default 0
     */
    minSize?: number;

    /**
     * 选取文件出现错误回调
     */
    onError?: (error: string[] | string) => void;

    /**
     * 用于转换已接受的文件
     */
    transformFile?: (file: File) => Promise<File>;
  };

type PickerReducerBaseAction = {
  multiple: boolean;
  onChange: (value: FileItem[] | FileItem) => void;
};

type PickerReducerAction =
  | {
      type: "ADD_FILES";
      payload: {
        files: FileItem[];
      } & PickerReducerBaseAction;
    }
  | {
      type: "UPDATE_FILE";
      payload: { file: FileItem } & PickerReducerBaseAction;
    }
  | {
      type: "REMOVE_FILE";
      payload: { id: string; cancelUpload?: (id: string) => void } & PickerReducerBaseAction;
    };

const reducer = (state: FileItem[], action: PickerReducerAction): FileItem[] => {
  switch (action.type) {
    case "ADD_FILES": {
      const next = action.payload.multiple
        ? [...state, ...action.payload.files]
        : action.payload.files;

      action.payload.onChange?.(action.payload.multiple ? next : (next[0] ?? null));

      return next;
    }
    case "UPDATE_FILE": {
      const index = state.findIndex((item) => item.id === action.payload.file.id);

      if (index > -1) {
        const next = [...state.slice(0, index), action.payload.file, ...state.slice(index + 1)];

        action.payload.onChange?.(action.payload.multiple ? next : (next[0] ?? null));

        return next;
      }

      return state;
    }
    case "REMOVE_FILE": {
      const index = state.findIndex((item) => item.id === action.payload.id);

      if (index > -1) {
        if (action.payload.cancelUpload) {
          action.payload.cancelUpload(action.payload.id);
        }

        const next = [...state.slice(0, index), ...state.slice(index + 1)];

        action.payload.onChange?.(action.payload.multiple ? next : (next[0] ?? null));

        return next;
      }

      return state;
    }
    default:
      return state;
  }
};

export const FilePicker = (
  props: PrimitiveProps<"input", FilePickerProps, "type">,
): JSX.Element => {
  const {
    name,
    disabled = false,
    required = false,
    readOnly = false,
    multiple = false,
    accept = "*",
    maxFiles = Infinity,
    maxSize = Infinity,
    minSize = 0,
    value,
    defaultValue,
    onChange,
    onError,
    transformFile,
    style,
    className,
    children,
    ref,
    ...rest
  } = props;

  const { t } = useLocale();
  const upload = useFileUpload(true);

  const [state, dispatch] = useReducer(
    reducer,
    value !== undefined
      ? Array.isArray(value)
        ? value
        : value !== null
          ? [value]
          : []
      : isNullish(defaultValue)
        ? []
        : (Array.isArray(defaultValue) ? defaultValue : [defaultValue]).map(
            (file) =>
              ({
                id: file.id,
                kind: "remote",
                file: omit(file, ["id"]),
              }) as FileItem,
          ),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeCallback = (value: FileItem[] | FileItem) => {
    queueMicrotask(() => {
      if (inputRef.current) {
        try {
          const dataTransfer = new DataTransfer();

          (Array.isArray(value) ? value : [value]).forEach((file) => {
            if (file.kind == "local") {
              dataTransfer.items.add(file.file);
            }
          });

          inputRef.current.files = dataTransfer.files;
        } catch {
          // do nothing
        }
      }
    });

    onChange?.(value);
  };

  const addFiles = async (files: File[] | FileList) => {
    if (!files || files.length === 0) {
      return;
    }

    const newFiles = Array.from(files);

    if (multiple && maxFiles !== Infinity && state.length + newFiles.length > maxFiles) {
      onError?.(t("fileUpload.maxFiles", { maxFiles }));
      return;
    }

    const errors: string[] = [];
    const validFiles: LocalFileItem[] = [];

    for (const file of newFiles) {
      let transformed;

      if (transformFile) {
        try {
          transformed = await transformFile(file);
        } catch (e) {
          errors.push(
            t("fileUpload.transform", { fileName: file.name, error: (e as Error).message }),
          );
          continue;
        }
      } else {
        transformed = file;
      }

      if (multiple) {
        if (
          state.some(
            (item) => item.file.name === transformed.name && item.file.size === transformed.size,
          )
        ) {
          continue;
        }
      }

      if (file.size > maxSize) {
        errors.push(
          t("fileUpload.maxSize", { fileName: file.name, maxSize: formatBytes(maxSize) }),
        );
        continue;
      }

      if (file.size < minSize) {
        errors.push(
          t("fileUpload.minSize", { fileName: file.name, minSize: formatBytes(minSize) }),
        );
        continue;
      }

      if (!matchesAccept(file.name, file.type, accept)) {
        errors.push(t("fileUpload.notAccept", { fileName: file.name }));
        continue;
      }

      validFiles.push({
        id: random(),
        file: transformed,
        kind: "local",
        status: "ready",
        progress: 0,
      } as LocalFileItem);
    }

    if (errors.length > 0) {
      onError?.(errors);
    }

    if (validFiles.length > 0) {
      dispatch({
        type: "ADD_FILES",
        payload: {
          files: validFiles,
          multiple,
          onChange: onChangeCallback,
        },
      });

      if (upload && upload.autoUpload) {
        let index = 0;

        const worker = async () => {
          while (index < validFiles.length) {
            const current = index++;
            await upload.uploadFile(validFiles[current], updateFile);
          }
        };

        const workers = Array(upload.maxParallel)
          .fill(null)
          .map(() => worker());

        await Promise.all(workers);
      }
    }
  };

  const updateFile = (file: FileItem) => {
    dispatch({
      type: "UPDATE_FILE",
      payload: {
        file,
        multiple,
        onChange: onChangeCallback,
      },
    });
  };

  const removeFile = async (id: string) => {
    dispatch({
      type: "REMOVE_FILE",
      payload: {
        id,
        cancelUpload: upload?.cancelUpload,
        multiple,
        onChange: onChangeCallback,
      },
    });

    if (upload) {
      const file = state.find((item) => item.id === id);

      if (file && file.kind == "remote") {
        await upload.deleteFile(file.id);
      }
    }
  };

  const actionContext: FilePickerActionContextValue = {
    addFiles,
    updateFile,
    removeFile,
  };

  const statusContext: FilePickerStatusContextValue = {
    disabled: disabled || readOnly,
    multiple,
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await addFiles(e.target.files);
    }
  };

  const refs = useMergeRefs(ref, inputRef);

  return (
    <div className={tx("relative isolate flex gap-2", className)} style={style}>
      <FilePickerStatusContext value={statusContext}>
        <FilePickerActionContext value={actionContext}>
          <FilePickerInputRefContext value={inputRef}>
            <FilePickerFilesContext value={state}>{children}</FilePickerFilesContext>
          </FilePickerInputRefContext>
        </FilePickerActionContext>
      </FilePickerStatusContext>
      <input
        ref={refs}
        type="file"
        name={!upload ? name : undefined}
        disabled={disabled}
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className={"sr-only"}
        {...rest}
      />
      {upload && name && (
        <FileHiddenInput
          required={required}
          disabled={disabled}
          multiple={multiple}
          name={name}
          files={state}
          {...rest}
        />
      )}
    </div>
  );
};
