import { fileURLToPath } from "node:url";
import shadcn from "ultracite/oxlint/shadcn";

/**
 * Ultracite's shadcn/lint preset with the plugin resolved from this package.
 *
 * Oxlint resolves a JS plugin specifier relative to the config file that is
 * being loaded, so the bare `@shadcn/lint` in Ultracite's preset only works
 * when every consuming project installs the plugin itself (and fails under
 * isolated installs). Resolving it here makes `@anuragbanerjee/oxc-config` the
 * single owner of the dependency.
 *
 * @type {import("oxlint").OxlintConfig}
 */
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
