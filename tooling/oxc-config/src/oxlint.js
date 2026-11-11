import core from "ultracite/oxlint/core";

/**
 * Oxlint does not apply `ignorePatterns` from extended configs, so consumers
 * spread this list into their own config. `core.ignorePatterns` may be
 * undefined in some Ultracite versions, hence the fallback.
 */
export const ignorePatterns = [
  ...(core.ignorePatterns ?? []),
  "**/.agents",
  "**/.claude",
  "**/.nitro",
  "**/.tanstack",
];

/**
 * Rule decisions shared by every preset. Spread into `rules` of the preset;
 * consumers can still override per project.
 *
 * @type {NonNullable<import("oxlint").OxlintConfig["rules"]>}
 */
export const rules = {
  // The shadcn `cn` helper is a declaration while `export const GET: APIRoute`
  // (Astro) and route definitions (TanStack) are idiomatic as expressions;
  // one style cannot cover both.
  "eslint/func-style": "off",
  // Alphabetising keys would scramble JSON-LD, content schemas and config
  // objects whose order is deliberate (e.g. `@context` before `@type`).
  "eslint/sort-keys": "off",
  // Optional frontmatter fields are checked for truthiness.
  "typescript/strict-boolean-expressions": [
    "error",
    {
      allowNullableBoolean: true,
      allowNullableNumber: true,
      allowNullableString: true,
    },
  ],
};

/**
 * Framework-neutral core preset. Type-aware linting is a root option that
 * presets cannot carry, so set `options: { typeAware: true }` in your config.
 *
 * @type {import("oxlint").OxlintConfig}
 */
const config = {
  extends: [core],
  rules,
};

export default config;
