import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";
import shadcn from "ultracite/oxlint/shadcn";

import { reactRules, rules } from "./index.js";

/** @type {import("oxlint").OxlintConfig} */
const config = {
  extends: [core, react, shadcn, next],
  rules: { ...rules, ...reactRules },
  overrides: [
    {
      // `headers()`, `redirects()` and `rewrites()` are async by contract and have nothing to await.
      files: ["**/next.config.*"],
      rules: { "eslint/require-await": "off" },
    },
  ],
};

export default config;
