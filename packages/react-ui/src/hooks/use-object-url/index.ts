import { useEffect, useState } from "react";

export function useObjectUrl(object: Blob | MediaSource | null): string | undefined {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (!object) {
      // oxlint-disable-next-line react-you-might-not-need-an-effect/no-adjust-state-on-prop-change react/react-compiler react/set-state-in-effect
      setUrl(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(object);

    // oxlint-disable-next-line react-you-might-not-need-an-effect/no-adjust-state-on-prop-change
    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [object]);

  return url;
}
