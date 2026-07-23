import { useEffect, useState } from "react";

export function useObjectUrl(object: Blob | MediaSource | null): string | undefined {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    // oxlint-disable-next-line typescript/no-unnecessary-condition
    if (!object) {
      // oxlint-disable-next-line react-you-might-not-need-an-effect-js/no-adjust-state-on-prop-change react/react-compiler
      setUrl(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(object);

    // oxlint-disable-next-line react-you-might-not-need-an-effect-js/no-adjust-state-on-prop-change
    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [object]);

  return url;
}
