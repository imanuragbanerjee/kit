import { ignorePatterns } from "@anuragbanerjee/oxlint-config";
import antiSlop from "@anuragbanerjee/oxlint-config/anti-slop";
import react from "@anuragbanerjee/oxlint-config/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [react, antiSlop],
  ignorePatterns: [
    ...ignorePatterns,
    "**/r",
    "**/components/ui/**",
    "templates/**",
  ],
  options: { typeAware: true },
});
