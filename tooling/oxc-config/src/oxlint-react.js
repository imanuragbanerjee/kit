import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

import shadcn from "./oxlint-shadcn.js";
import { reactRules, rules } from "./oxlint.js";

/** @type {import("oxlint").OxlintConfig} */
const config = {
  extends: [core, react, shadcn],
  rules: { ...rules, ...reactRules },
};

export default config;
