import base, { ignorePatterns } from "@anuragbanerjee/oxfmt-config";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...base,
  ignorePatterns: [...ignorePatterns, "**/components/ui"],
});
