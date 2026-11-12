import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";

import shadcn from "./oxlint-shadcn.js";
import { reactRules, rules } from "./oxlint.js";

/**
 * Core + React + shadcn/lint + tanstack preset. Use as `extends: [preset]`.
 *
 * @type {import("oxlint").OxlintConfig}
 */
const config = {
  extends: [core, react, shadcn, tanstack],
  rules: { ...rules, ...reactRules },
};

export default config;
