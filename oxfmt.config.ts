import base, { ignorePatterns } from "@anuragbanerjee/oxc-config/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...base,
  ignorePatterns: [
    ...ignorePatterns,
    "r",
    "**/components/ui",
    ".changeset/*.md",
    "**/CHANGELOG.md",
  ],
  sortTailwindcss: {
    functions: ["cn", "cva", "clsx"],
    stylesheet: "./packages/ui/src/styles/globals.css",
  },
});
