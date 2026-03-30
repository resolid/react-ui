import { type AnalyticsProps, computeRoute } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/react";
import { useLocation, useParams } from "react-router";

export function VercelAnalytics(props: Omit<AnalyticsProps, "route">) {
  const params = useParams();
  const { pathname } = useLocation();

  return (
    <Analytics
      route={computeRoute(pathname, params as never)}
      path={pathname}
      {...props}
      framework="react-router"
    />
  );
}
