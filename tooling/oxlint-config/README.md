# @anuragbanerjee/oxlint-config

Shared [oxlint](https://oxc.rs/docs/guide/usage/linter) presets, composed from [Ultracite](https://www.ultracite.ai)'s `core`, `react` and `next` presets. For formatting, see [`@anuragbanerjee/oxfmt-config`](https://www.npmjs.com/package/@anuragbanerjee/oxfmt-config).

## Install

```sh
bun add -d @anuragbanerjee/oxlint-config oxlint oxlint-tsgolint @shadcn/lint
```

## Presets

| Import                                    | Contents                                                    |
| ----------------------------------------- | ----------------------------------------------------------- |
| `@anuragbanerjee/oxlint-config`           | Ultracite `core` plus shared rule decisions                 |
| `@anuragbanerjee/oxlint-config/react`     | `core` + `react` + `shadcn`                                 |
| `@anuragbanerjee/oxlint-config/next`      | `core` + `react` + `shadcn` + `next`                        |
| `@anuragbanerjee/oxlint-config/anti-slop` | Opt-in [anti-slop](#anti-slop) rules, listed after a preset |

## Usage

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

## shadcn/lint

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

Shared decisions: `eslint/sort-keys` and `eslint/func-style` are off, and `typescript/strict-boolean-expressions` allows nullable booleans, numbers and strings. The `next` preset also turns off `eslint/require-await` for `next.config.*`.

## anti-slop

Opt-in: Ultracite's bundled build of [anti-slop](https://github.com/dmmulroy/anti-slop), which rejects low-evidence patterns such as unjustified type assertions, `unknown` in signatures, `Reflect.get` and module mocking. It runs as a JS plugin and needs no extra install. List it after the framework preset, because it turns off three core rules that conflict with it (`typescript/consistent-indexed-object-style`, `unicorn/no-immediate-mutation` and `unicorn/prefer-reflect-apply`):

```ts
import antiSlop from "@anuragbanerjee/oxlint-config/anti-slop";
import next from "@anuragbanerjee/oxlint-config/next";

export default defineConfig({
  extends: [next, antiSlop],
});
```

Shared decisions: `anti-slop/require-readable-spacing` and `anti-slop/no-shape-in-symbol-names` are off. The first only adds blank lines and `oxlint --fix` applies it, so set it to `"error"` if you want it. `no-known-value-widening` and `no-unsafe-dictionary-type` flag `Record<string, unknown>` return types; for open-ended output such as JSON-LD, turn them off for those files with an override.

Part of [kit](https://github.com/imanuragbanerjee/kit).
