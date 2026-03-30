import type { PropsWithChildren } from "react";
import { SiteNavbar } from "~/components/site-navbar";

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b border-b-bd-normal bg-bg-normal">
        <SiteNavbar />
      </header>
      <div className="min-h-[calc(100vh-var(--spacing)*16-78px)]">{children}</div>
      <footer className="border-t border-t-bd-normal">
        <div className="mx-auto flex max-w-288 flex-col gap-1 p-4 text-center text-sm text-fg-muted">
          <p>Released under the MIT License</p>
          <p>Copyright Ⓒ 2022-present Resolid Tech</p>
        </div>
      </footer>
    </>
  );
}
