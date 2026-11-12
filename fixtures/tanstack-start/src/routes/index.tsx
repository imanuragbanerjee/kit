import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

function Home(): ReactElement {
  return (
    <main className="mx-auto flex max-w-xl flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold">TanStack Start fixture</h1>
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
        <Button size="sm">Small</Button>
        <Button render={<a href="https://example.com" />}>As a link</Button>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/")({ component: Home });
