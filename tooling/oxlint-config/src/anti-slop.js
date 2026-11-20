import antiSlop from "ultracite/oxlint/anti-slop";

/** @type {import("oxlint").OxlintConfig} */
const config = {
  extends: [antiSlop],
  rules: {
    // Blank-line taste on top of the formatter; it touches most files.
    "anti-slop/require-readable-spacing": "off",
    // Bans the substring `shape` in names, which design tokens use freely.
    "anti-slop/no-shape-in-symbol-names": "off",
  },
};

export default config;
