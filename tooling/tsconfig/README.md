# @anuragbanerjee/tsconfig

Shared `tsconfig` bases. Requires TypeScript 6 or newer.

## Install

```sh
bun add -d @anuragbanerjee/tsconfig typescript
```

## Bases

| File                 | Use                                             |
| -------------------- | ----------------------------------------------- |
| `base.json`          | Strict, bundler resolution, no emit, no `types` |
| `react-library.json` | `base` + `react-jsx` + DOM libs                 |
| `nextjs.json`        | `react-library` + Next.js plugin                |

## Usage

```json
{
  "extends": "@anuragbanerjee/tsconfig/nextjs.json",
  "compilerOptions": { "paths": { "@/*": ["./src/*"] } },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

`include` and `paths` are resolved relative to the config that declares them, so every project sets its own. Ambient types (`types`) are not preset: TypeScript 6 and later default `types` to `[]`, so add `"types": ["node"]` where you need Node globals.

Part of [kit](https://github.com/imanuragbanerjee/kit). See also [`@anuragbanerjee/oxlint-config`](https://www.npmjs.com/package/@anuragbanerjee/oxlint-config) and [`@anuragbanerjee/oxfmt-config`](https://www.npmjs.com/package/@anuragbanerjee/oxfmt-config).
