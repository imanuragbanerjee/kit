import { ignorePatterns } from "@anuragbanerjee/oxc-config/oxlint";
import react from "@anuragbanerjee/oxc-config/oxlint/react";
import { defineConfig } from "oxlint";

import primitives from "./packages/ui/primitives.json" with { type: "json" };

// shadcn/ui primitives are synced from upstream; lint fixes would be replayed
// (and hand edits are forbidden) on the next `bun run ui:sync`.
const synced = primitives.primitives.map(
  (name) => `packages/ui/src/components/ui/${name}.tsx`,
);

export default defineConfig({
  extends: [react],
  ignorePatterns: [
    ...ignorePatterns,
    "**/r",
    ...synced,
    // Written by `shadcn add` from the local registry; lint fixes would be
    // replayed on the next install (see scripts/test-fixtures.ts).
    "fixtures/*/src/components/ui/**",
  ],
  options: { typeAware: true },
  overrides: [
    {
      // Registry sources own their appearance, like any components/ui
      // directory: they define variants, so structural arbitrary values and
      // sibling restyling are expected here (the shadcn preset already does
      // this for `**/components/ui/**`).
      files: ["packages/ui/src/components/**"],
      rules: {
        "shadcn/no-arbitrary-values": "off",
        "shadcn/no-restyle": "off",
        "shadcn/require-static-classes": "off",
      },
    },
    {
      // Scripts run steps in order on purpose.
      files: ["scripts/**"],
      rules: { "eslint/no-await-in-loop": "off" },
    },
  ],
});
