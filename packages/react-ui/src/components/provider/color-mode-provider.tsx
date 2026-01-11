import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import type { JSX } from "react/jsx-runtime";
import { useLocalStorage, useMediaQuery } from "../../hooks";
import {
  type ColorMode,
  ColorModeDispatchContext,
  ColorModeStateContext,
} from "./color-mode-context";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const COLOR_MODE_STORAGE_KEY = "rui:color-mode";

export type ColorModeProviderProps = {
  nonce?: string;
  disableTransition?: boolean;
};

export const ColorModeProvider = ({
  children,
  nonce,
  disableTransition = true,
}: PropsWithChildren<ColorModeProviderProps>): JSX.Element => {
  const osDark = useMediaQuery(COLOR_SCHEME_QUERY);

  const [value, setValue] = useLocalStorage<ColorMode>(COLOR_MODE_STORAGE_KEY, "auto");

  useEffect(() => {
    let style: HTMLStyleElement | undefined;

    if (disableTransition) {
      style = document.createElement("style");

      if (nonce) {
        style.setAttribute("nonce", nonce);
      }

      style.appendChild(
        document.createTextNode(
          `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`,
        ),
      );

      document.head.appendChild(style);
    }

    if (value == "dark" || (value == "auto" && osDark)) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }

    if (style) {
      void window.getComputedStyle(style).opacity;

      requestAnimationFrame(() => {
        document.head.removeChild(style);
      });
    }
  }, [value, osDark, disableTransition, nonce]);

  return (
    <ColorModeDispatchContext value={setValue}>
      <ColorModeStateContext value={value}>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `try{var dark=localStorage.getItem("${COLOR_MODE_STORAGE_KEY}");(dark?'"dark"'==dark:matchMedia("${COLOR_SCHEME_QUERY}").matches)&&document.documentElement.classList.add("dark-mode")}catch(a){}`,
          }}
        />
        {children}
      </ColorModeStateContext>
    </ColorModeDispatchContext>
  );
};
