import { useEffect, useState } from "react";

export type UseClipboardOptions = {
  duration?: number;
  onError?: (error: Error) => void;
};

export function useClipboard(
  options?: UseClipboardOptions,
): readonly [boolean, (source: string) => Promise<void>] {
  const { duration = 2000, onError } = options ?? {};

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const id = setTimeout(() => setCopied(false), duration);

    return () => {
      clearTimeout(id);
    };
  }, [duration, copied]);

  const copy = async (source: string) => {
    try {
      await navigator.clipboard.writeText(source);
    } catch (e) {
      onError?.(e as Error);
    }

    setCopied(true);
  };

  return [copied, copy] as const;
}
