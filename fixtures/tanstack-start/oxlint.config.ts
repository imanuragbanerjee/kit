import { ignorePatterns } from "@anuragbanerjee/oxc-config/oxlint";
import tanstack from "@anuragbanerjee/oxc-config/oxlint/tanstack";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [tanstack],
  ignorePatterns: [...ignorePatterns, "src/components/ui/**"],
});
