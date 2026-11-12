# @anuragbanerjee/oxlint-config

Shared [oxlint](https://oxc.rs/docs/guide/usage/linter) presets, composed from [Ultracite](https://www.ultracite.ai)'s `core`, `react` and `next` presets. For formatting see `@anuragbanerjee/oxfmt-config`.

```sh
bun add -d @anuragbanerjee/oxlint-config oxlint oxlint-tsgolint @shadcn/lint
```

| Import                                | Contents                                    |
| ------------------------------------- | ------------------------------------------- |
| `@anuragbanerjee/oxlint-config`       | Ultracite `core` plus shared rule decisions |
| `@anuragbanerjee/oxlint-config/react` | `core` + `react` + `shadcn`                 |
| `@anuragbanerjee/oxlint-config/next`  | `core` + `react` + `shadcn` + `next`        |

```ts
// oxlint.config.ts
import { ignorePatterns } from "@anuragbanerjee/oxlint-config";
import next from "@anuragbanerjee/oxlint-config/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [next],
  // oxlint does not inherit ignorePatterns from extended configs.
  ignorePatterns: [...ignorePatterns, "src/components/ui/**"],
  // Presets cannot carry root options.
  options: { typeAware: true },
});
```

The framework presets include [`@shadcn/lint`](https://github.com/shadcn-ui/lint) (Ultracite's `shadcn` preset, every rule at `error`, `allow: ["layout"]`). Oxlint resolves the plugin relative to your config file, so install it in every project that has an `oxlint.config.ts`: `bun add -d @shadcn/lint`. Components and theme tokens are found through the project's `components.json`. Directories named `components/ui` are already exempt from the restyle rules; for another directory that defines components, turn them off:

```ts
overrides: [
  {
    files: ["src/ds/**"],
    rules: {
      "shadcn/no-arbitrary-values": "off",
      "shadcn/no-restyle": "off",
      "shadcn/require-static-classes": "off",
    },
  },
],
```

Shared decisions: `eslint/sort-keys` and `eslint/func-style` are off, and `typescript/strict-boolean-expressions` allows nullable booleans, numbers and strings.

Part of [kit](https://github.com/imanuragbanerjee/kit).
