import { ignorePatterns } from "@anuragbanerjee/oxc-config/oxlint";
import react from "@anuragbanerjee/oxc-config/oxlint/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [react],
  ignorePatterns: [
    ...ignorePatterns,
    "**/r",
    // Written by `shadcn add` from the local registry; lint fixes would be
    // replayed on the next install (see scripts/test-fixtures.ts).
    "fixtures/*/src/components/ui/**",
  ],
  options: { typeAware: true },
});
