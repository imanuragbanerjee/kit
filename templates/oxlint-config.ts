import { ignorePatterns } from "@anuragbanerjee/oxlint-config";
import next from "@anuragbanerjee/oxlint-config/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [next],
  ignorePatterns: [...ignorePatterns, "**/components/ui/**"],
  options: { typeAware: true },
});
