/**
 * Shared oxfmt options. oxfmt has no `extends`, so consumers spread this
 * object into their own `oxfmt.config.ts`:
 *
 *   import { defineConfig } from "oxfmt";
 *   import base, { ignorePatterns } from "@anuragbanerjee/oxc-config/oxfmt";
 *
 *   export default defineConfig({
 *     ...base,
 *     ignorePatterns: [...ignorePatterns, "src/content"],
 *   });
 *
 * Spreading is shallow: overriding `sortImports`, `sortTailwindcss` or
 * `astro` replaces the whole nested object, so repeat any key you still need.
 */

/** Paths no project wants formatted (tool state, build output, lockfiles). */
export const ignorePatterns = [
  ".agents",
  ".astro",
  ".claude",
  ".next",
  ".nitro",
  ".output",
  ".tanstack",
  ".turbo",
  "bun.lock",
  "dist",
  "routeTree.gen.ts",
];

/** @type {import("oxfmt").OxfmtConfig} */
const config = {
  arrowParens: "always",
  // Formats .astro files through oxfmt's bundled Prettier; needs
  // `@astrojs/compiler-rs`. Keep compressHTML on "html": the default "jsx"
  // treats whitespace like JSX and inserts spaces inside links and before
  // punctuation.
  astro: { compressHTML: "html" },
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "lf",
  ignorePatterns,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  semi: true,
  singleQuote: false,
  sortImports: {
    newlinesBetween: true,
  },
  sortPackageJson: true,
  sortScripts: true,
  sortTailwindcss: {
    functions: ["cn", "cva", "clsx"],
  },
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
};

export default config;
