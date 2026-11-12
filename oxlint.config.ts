import { ignorePatterns } from "@anuragbanerjee/oxlint-config";
import react from "@anuragbanerjee/oxlint-config/react";
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
