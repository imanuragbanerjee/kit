import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

import shadcn from "./oxlint-shadcn.js";
import { reactRules, rules } from "./oxlint.js";

/**
 * Core + React + shadcn/lint + next preset. Use as `extends: [preset]`.
 *
 * @type {import("oxlint").OxlintConfig}
 */
const config = {
  extends: [core, react, shadcn, next],
  rules: { ...rules, ...reactRules },
};

export default config;
