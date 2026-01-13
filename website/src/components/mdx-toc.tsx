import { tx, useEventListener } from "@resolid/react-ui";
import { type RefObject, useState } from "react";

export const MdxToc = ({
  toc,
  contentRef,
}: {
  toc: { depth: number; text: string; slug: string }[];
  contentRef: RefObject<HTMLDivElement | null>;
}) => {
  const [activeHeading, setActiveHeading] = useState("");

  useEventListener("scroll", () => {
    const node = contentRef.current;

    if (!node) {
      return;
    }

    const h2 = Array.from(node.querySelectorAll("h2"));
    const h3 = Array.from(node.querySelectorAll("h3"));

    const combinedHeadings = [...h2, ...h3].sort((a, b) => a.offsetTop - b.offsetTop).reverse();

    for (const heading of combinedHeadings) {
      if (window.scrollY + 112 > heading.offsetTop) {
        setActiveHeading("#" + heading.id);
        break;
      }
    }
  });

  return (
    <ul className={"sticky top-16 p-4 text-sm"}>
      {toc.map(({ depth, slug, text }) => {
        const href = `#${slug}`;

        return (
          <li key={slug}>
            <a
              href={href}
              className={tx(
                "-ms-px block border-s border-s-bd-normal py-1",
                depth == 2 ? "ps-4" : depth == 3 ? "ps-8" : "ps-10",
                href == activeHeading
                  ? "border-link text-link"
                  : "text-fg-muted hover:border-link-hovered hover:text-fg-subtle",
              )}
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
