import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

import { rules } from "./oxlint.js";

/**
 * Core + React + react preset. Use as `extends: [preset]`.
 *
 * @type {import("oxlint").OxlintConfig}
 */
const config = {
  extends: [core, react],
  rules,
};

export default config;
