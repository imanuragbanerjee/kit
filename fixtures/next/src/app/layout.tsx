import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "kit fixture: Next.js",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en" data-theme="personal">
      {/* Base UI: iOS 26+ Safari backdrops need a relative body and an isolated app root. */}
      <body className="relative">
        <div className="isolate min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
