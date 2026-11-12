# @anuragbanerjee/oxc-config

Shared [oxfmt](https://oxc.rs/docs/guide/usage/formatter) and [oxlint](https://oxc.rs/docs/guide/usage/linter) presets. The lint presets compose [Ultracite](https://www.ultracite.ai)'s `core`, `react`, `next`, `astro` and `tanstack` presets.

```sh
bun add -d @anuragbanerjee/oxc-config oxfmt oxlint oxlint-tsgolint
```

## oxfmt

oxfmt has no `extends`, so spread the preset into your own config:

```ts
// oxfmt.config.ts
import base, { ignorePatterns } from "@anuragbanerjee/oxc-config/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...base,
  ignorePatterns: [...ignorePatterns, "src/content"],
});
```

The spread is shallow: overriding `sortImports`, `sortTailwindcss` or `astro` replaces the whole nested object. For `.astro` files install `@astrojs/compiler-rs`; the preset sets `astro: { compressHTML: "html" }` because the default mode inserts whitespace into links.

## oxlint

| Import                                       | Contents                                                           |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `@anuragbanerjee/oxc-config/oxlint`          | Ultracite `core` plus shared rule decisions                        |
| `@anuragbanerjee/oxc-config/oxlint/react`    | `core` + `react` + `shadcn`                                        |
| `@anuragbanerjee/oxc-config/oxlint/next`     | `core` + `react` + `shadcn` + `next`                               |
| `@anuragbanerjee/oxc-config/oxlint/astro`    | `core` + `react` + `shadcn` + `astro`                              |
| `@anuragbanerjee/oxc-config/oxlint/tanstack` | `core` + `react` + `shadcn` + `tanstack`                           |
| `@anuragbanerjee/oxc-config/oxlint/shadcn`   | Only the [`@shadcn/lint`](https://github.com/shadcn-ui/lint) rules |

```ts
// oxlint.config.ts
import { ignorePatterns } from "@anuragbanerjee/oxc-config/oxlint";
import next from "@anuragbanerjee/oxc-config/oxlint/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [next],
  // oxlint does not inherit ignorePatterns from extended configs.
  ignorePatterns: [...ignorePatterns, "src/components/ui/**"],
  // Presets cannot carry root options.
  options: { typeAware: true },
});
```

The framework presets include [`@shadcn/lint`](https://github.com/shadcn-ui/lint) (Ultracite's `shadcn` preset, every rule at `error`, `allow: ["layout"]`). The package depends on the plugin and resolves it itself, so projects do not install it. Components and theme tokens are found through the project's `components.json`. Turn the restyle rules off for a directory that defines components:

```ts
overrides: [
  {
    files: ["packages/ui/src/components/**"],
    rules: {
      "shadcn/no-arbitrary-values": "off",
      "shadcn/no-restyle": "off",
      "shadcn/require-static-classes": "off",
    },
  },
],
```

Shared decisions: `eslint/sort-keys` and `eslint/func-style` are off, and `typescript/strict-boolean-expressions` allows nullable booleans, numbers and strings.
