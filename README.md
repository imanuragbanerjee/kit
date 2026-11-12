# kit

Personal shared repo: a Tailwind v4 theme, tooling presets and a shadcn registry. Framework-neutral on purpose (Next.js and Astro are covered by fixtures).

| Path                 | Package                      | Published       | What                                                       |
| -------------------- | ---------------------------- | --------------- | ---------------------------------------------------------- |
| `tooling/oxc-config` | `@anuragbanerjee/oxc-config` | npm             | oxfmt preset and oxlint presets (core, react, next, astro) |
| `tooling/tsconfig`   | `@anuragbanerjee/tsconfig`   | npm             | tsconfig bases (base, react-library, nextjs, astro)        |
| `packages/theme`     | `@anuragbanerjee/theme`      | npm             | Tailwind v4 CSS: colour mapping, fonts, typography, themes |
| `packages/ui`        | `@anuragbanerjee/ui`         | never (private) | Home of our own registry components (none yet)             |
| `fixtures/*`         | `@anuragbanerjee/fixture-*`  | never (private) | Minimal Next.js and Astro apps that consume it             |

Not published to npm yet.

## Setup

The exact Node and Bun versions live only in `.tool-versions`; local tooling (mise, asdf) and every CI workflow read them from there. `package.json` carries `devEngines` ranges (`node >=26`, `bun ^1.4.4`), which Turborepo needs to detect the package manager but which are compatibility ranges, not pins.

```sh
bun install
bun run verify   # format check + lint + typecheck + build (all packages and fixtures)
```

Other scripts: `format`, `lint`, `lint:fix`, `check`, `typecheck`, `build`, `registry:build`, `registry:validate`, `test:fixtures`, `taze`, `changeset`, `version-packages`, `release`. Git hooks (Lefthook) run oxlint and oxfmt on staged files before commit and the typecheck before push.

## Using the packages

See the README in each package: [oxc-config](tooling/oxc-config/README.md), [tsconfig](tooling/tsconfig/README.md), [theme](packages/theme/README.md).

## Using the registry

`registry.json` at the repo root includes `packages/ui/registry.json` (our components) and `packages/theme/registry.json` (themes). The shadcn/ui primitives in `packages/ui/src/components/ui` are vendored for development only (`bun run ui:sync`, never edited by hand) and are not republished: our components declare `registryDependencies: ["button"]` and the CLI fetches the primitive from shadcn's own registry in the consumer's style (`base-vega`).

Hosted: `bun run registry:build` writes `r/*.json` (generated, git-ignored), which any static host can serve; then `shadcn add https://<host>/theme-personal.json`. Locally, `shadcn add ./r/theme-personal.json` works after a build.

GitHub-direct (`shadcn add imanuragbanerjee/kit/theme-personal`) reads the source `registry.json` with no build. Private repositories work through your `gh` login; pin a release with `#<tag-or-sha>`, for example `imanuragbanerjee/kit/theme-personal#<sha>`.

`bun run test:fixtures` (a Turborepo task, also run weekly by `upstream.yml`) installs shadcn's latest Button into each fixture with `shadcn add` and builds each one.
