import { ignorePatterns } from "@anuragbanerjee/oxc-config/oxlint";
import next from "@anuragbanerjee/oxc-config/oxlint/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [next],
  ignorePatterns: [...ignorePatterns, "src/components/ui/**"],
});
