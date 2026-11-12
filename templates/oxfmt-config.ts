import base, { ignorePatterns } from "@anuragbanerjee/oxc-config/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...base,
  ignorePatterns: [...ignorePatterns, "**/components/ui"],
});
