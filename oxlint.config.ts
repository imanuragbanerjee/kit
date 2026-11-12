import { ignorePatterns } from "@anuragbanerjee/oxc-config/oxlint";
import react from "@anuragbanerjee/oxc-config/oxlint/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [react],
  ignorePatterns: [
    ...ignorePatterns,
    "**/r",
    "**/components/ui/**",
    "templates/**",
  ],
  options: { typeAware: true },
});
