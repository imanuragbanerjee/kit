import core from "ultracite/oxlint/core";

export const ignorePatterns = [
  ...(core.ignorePatterns ?? []),
  "**/.agents",
  "**/.claude",
];

/** @type {NonNullable<import("oxlint").OxlintConfig["rules"]>}
 */
export const rules = {
  // `export const GET: APIRoute = ...` (Astro) is idiomatic as an expression.
  "eslint/func-style": "off",
  // Key order is deliberate in JSON-LD, content schemas and config objects.
  "eslint/sort-keys": "off",
  "typescript/strict-boolean-expressions": [
    "error",
    {
      allowNullableBoolean: true,
      allowNullableNumber: true,
      allowNullableString: true,
    },
  ],
};

/** @type {NonNullable<import("oxlint").OxlintConfig["rules"]>}
 */
export const reactRules = {
  // False positive on `<Button render={<a href="/" />}>`: children come from the host.
  "jsx-a11y/control-has-associated-label": "off",
  "react/function-component-definition": [
    "error",
    { namedComponents: "function-declaration" },
  ],
};

/** @type {import("oxlint").OxlintConfig}
 */
const config = {
  extends: [core],
  rules,
};

export default config;
