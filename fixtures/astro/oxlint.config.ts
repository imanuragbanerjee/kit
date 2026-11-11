import { ignorePatterns } from "@anuragbanerjee/oxc-config/oxlint";
import astro from "@anuragbanerjee/oxc-config/oxlint/astro";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [astro],
  ignorePatterns: [...ignorePatterns, "src/components/ui/**"],
});
