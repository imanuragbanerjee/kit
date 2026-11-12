import { fileURLToPath } from "node:url";
import shadcn from "ultracite/oxlint/shadcn";

// Oxlint resolves a plugin specifier relative to the config being loaded, so
// Ultracite's bare "@shadcn/lint" fails under isolated installs.
/** @type {import("oxlint").OxlintConfig} */
const config = {
  ...shadcn,
  jsPlugins: [
    {
      name: "shadcn",
      specifier: fileURLToPath(import.meta.resolve("@shadcn/lint")),
    },
  ],
};

export default config;
