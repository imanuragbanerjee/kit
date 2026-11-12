import type { ReactElement } from "react";

import { Button } from "@/components/ui/button";

export function ButtonDemo(): ReactElement {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button nativeButton={false} render={<a href="https://example.com" />}>
        As a link
      </Button>
    </div>
  );
}
