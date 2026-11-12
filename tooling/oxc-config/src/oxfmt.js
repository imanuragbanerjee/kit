export const ignorePatterns = [
  ".agents",
  ".claude",
  ".next",
  ".output",
  ".turbo",
  "bun.lock",
  "dist",
];

/** @type {import("oxfmt").OxfmtConfig} */
const config = {
  arrowParens: "always",
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
    groups: [
      "type",
      { newlinesBetween: false },
      "builtin",
      { newlinesBetween: false },
      "external",
      "internal",
      ["parent", "sibling", "index"],
    ],
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
