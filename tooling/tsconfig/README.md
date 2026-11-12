# @anuragbanerjee/tsconfig

Shared `tsconfig` bases. Requires TypeScript 6 or newer (`astro check` does not support TypeScript 7 yet).

| File                 | Use                                             |
| -------------------- | ----------------------------------------------- |
| `base.json`          | Strict, bundler resolution, no emit, no `types` |
| `react-library.json` | `base` + `react-jsx` + DOM libs                 |
| `nextjs.json`        | `react-library` + Next.js plugin                |
| `astro.json`         | `react-library` + React islands                 |

```json
{
  "extends": "@anuragbanerjee/tsconfig/nextjs.json",
  "compilerOptions": { "paths": { "@/*": ["./src/*"] } },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

`include` and `paths` are resolved relative to the config that declares them, so every project sets its own. Ambient types (`types`) are not preset: TypeScript 6 defaults `types` to `[]`, so add `"types": ["node"]` or reference `astro/client` in your project.
