import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";

import { rules } from "./oxlint.js";

/**
 * Core + React + tanstack preset. Use as `extends: [preset]`.
 *
 * @type {import("oxlint").OxlintConfig}
 */
const config = {
  extends: [core, react, tanstack],
  rules,
};

export default config;
