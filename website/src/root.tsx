import { ResolidProvider } from "@resolid/react-ui";
import type { PropsWithChildren } from "react";
import { Links, type LinksFunction, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { RouteProcessBar } from "~/components/route-process-bar";
import { VercelAnalytics } from "~/components/vercel-analytics";

import { ErrorComponent } from "~/components/error-component";
import { SiteLayout } from "~/components/site-layout";
import styles from "~/root.css?url";

// noinspection JSUnusedGlobalSymbols
export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

// noinspection JSUnusedGlobalSymbols
export const meta = () => {
  return [
    { title: "Resolid UI" },
    {
      name: "description",
      content: "React 19 and TailwindCSS components",
    },
  ];
};

// noinspection JSUnusedGlobalSymbols
export const Layout = ({ children }: PropsWithChildren) => {
  // noinspection HtmlRequiredTitleElement
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0969da" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Meta />
        <Links />
      </head>
      <body className={"min-h-screen overflow-y-scroll"}>
        <RouteProcessBar />
        <ResolidProvider colorMode={{ disableTransition: true }}>
          <SiteLayout>{children}</SiteLayout>
        </ResolidProvider>
        <ScrollRestoration />
        <Scripts />
        {!!import.meta.env.VITE_VERCEL_URL && (
          <VercelAnalytics endpoint={"/growth"} scriptSrc={"/growth/script.js"} />
        )}
      </body>
    </html>
  );
};

// noinspection JSUnusedGlobalSymbols
export default function Root() {
  return <Outlet />;
}

// noinspection JSUnusedGlobalSymbols
export const ErrorBoundary = ErrorComponent;
