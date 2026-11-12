import type { ReactElement, ReactNode } from "react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function RootDocument({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en" data-theme="forest">
      <head>
        <HeadContent />
      </head>
      {/* Base UI portals and iOS 26+ Safari backdrops need `position: relative`
          on body and an isolated stacking context on the app root. */}
      <body className="relative">
        <div className="isolate min-h-dvh">{children}</div>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    links: [{ href: appCss, rel: "stylesheet" }],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: "kit fixture: TanStack Start" },
    ],
  }),
  shellComponent: RootDocument,
});
