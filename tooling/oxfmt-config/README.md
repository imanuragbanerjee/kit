# @anuragbanerjee/oxfmt-config

Shared [oxfmt](https://oxc.rs/docs/guide/usage/formatter) options. For linting see `@anuragbanerjee/oxlint-config`.

```sh
bun add -d @anuragbanerjee/oxfmt-config oxfmt
```

oxfmt has no `extends`, so spread the preset into your own config:

```ts
// oxfmt.config.ts
import base, { ignorePatterns } from "@anuragbanerjee/oxfmt-config";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...base,
  ignorePatterns: [...ignorePatterns, "src/content"],
});
```

The spread is shallow: overriding `sortImports` or `sortTailwindcss` replaces the whole nested object.
