import base, { ignorePatterns } from "@anuragbanerjee/oxfmt-config";
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
  overrides: [{ files: ["packages/ui/src/**"], options: { semi: false } }],
  sortTailwindcss: {
    functions: ["cn", "cva", "clsx"],
    stylesheet: "./packages/ui/src/styles/globals.css",
  },
});
