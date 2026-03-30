import { isBrowser } from "@resolid/utils";

// reference: https://github.com/component/textarea-caret-position/blob/master/index.js

type CaretCoordinates = {
  top: number;
  left: number;
  height: number;
};

type CaretOptions = {
  debug?: boolean;
};

const CARET_PROPERTIES: (keyof CSSStyleDeclaration | "MozTabSize")[] = [
  "direction",
  "boxSizing",
  "width",
  "height",
  "overflowX",
  "overflowY",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderStyle",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "fontStretch",
  "fontSize",
  "fontSizeAdjust",
  "lineHeight",
  "fontFamily",
  "textAlign",
  "textTransform",
  "textIndent",
  "textDecoration",
  "letterSpacing",
  "wordSpacing",
  "tabSize",
  "MozTabSize",
];

export function getCaretCoordinates(
  element: HTMLTextAreaElement,
  position: number,
  options?: CaretOptions,
): CaretCoordinates {
  if (!isBrowser) {
    throw new Error(
      "textarea-caret-position#getCaretCoordinates should only be called in a browser",
    );
  }

  const debug = options?.debug ?? false;

  const div = document.createElement("div");
  div.id = "textarea-caret-position-mirror-div";
  document.body.appendChild(div);

  const { style } = div;
  const computed = window.getComputedStyle(element);

  style.whiteSpace = "pre-wrap";
  style.overflowWrap = "break-word";
  style.position = "absolute";

  if (!debug) {
    style.visibility = "hidden";
  }

  Object.assign(
    style,
    CARET_PROPERTIES.reduce(
      (acc, prop) => {
        acc[prop as string] = computed.getPropertyValue(prop as string);

        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  if (window.navigator.userAgent.toLowerCase().includes("firefox")) {
    if (element.scrollHeight > parseInt(computed.height)) {
      style.overflowY = "scroll";
    }
  } else {
    style.overflow = "hidden";
  }

  div.textContent = element.value.substring(0, position);

  const span = document.createElement("span");
  span.textContent = element.value.substring(position) || "\u200b";
  div.appendChild(span);

  const coordinates: CaretCoordinates = {
    top: span.offsetTop + parseInt(computed.borderTopWidth),
    left: span.offsetLeft + parseInt(computed.borderLeftWidth),
    height: parseInt(computed.lineHeight),
  };

  if (debug) {
    span.style.backgroundColor = "#aaa";
  } else {
    document.body.removeChild(div);
  }

  return coordinates;
}
