# kit

Personal shared repo: a Tailwind v4 theme, tooling presets and a shadcn registry. Framework-neutral on purpose (Next.js, Astro and TanStack Start are all covered by fixtures).

| Path                 | Package                      | Published       | What                                                                 |
| -------------------- | ---------------------------- | --------------- | -------------------------------------------------------------------- |
| `tooling/oxc-config` | `@anuragbanerjee/oxc-config` | npm             | oxfmt preset and oxlint presets (core, react, next, astro, tanstack) |
| `tooling/tsconfig`   | `@anuragbanerjee/tsconfig`   | npm             | tsconfig bases (base, react-library, nextjs, astro, tanstack-start)  |
| `packages/theme`     | `@anuragbanerjee/theme`      | npm             | Tailwind v4 CSS: colour mapping, fonts, typography, themes           |
| `packages/ui`        | `@anuragbanerjee/ui`         | never (private) | Source of the registry items (Button on Base UI)                     |
| `fixtures/*`         | `@anuragbanerjee/fixture-*`  | never (private) | Minimal Next.js, Astro and TanStack Start apps that consume it       |

Not published to npm yet. Third-party notices (shadcn/ui, MIT) are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Setup

Runtimes are pinned in `.tool-versions` (Node, Bun); `packageManager` pins Bun.

```sh
bun install
bun run verify   # format check + lint + typecheck + build (all packages and fixtures)
```

Other scripts: `format`, `lint`, `lint:fix`, `check`, `typecheck`, `build`, `registry:build`, `registry:validate`, `test:fixtures`, `taze`, `changeset`, `version-packages`, `release`. Git hooks (Lefthook) run oxlint and oxfmt on staged files before commit and the typecheck before push.

## Using the packages

See the README in each package: [oxc-config](tooling/oxc-config/README.md), [tsconfig](tooling/tsconfig/README.md), [theme](packages/theme/README.md).

## Using the registry

`registry.json` at the repo root includes `packages/ui/registry.json` (components) and `packages/theme/registry.json` (themes). Items use the `base-vega` shadcn style on Base UI and compose through the `render` prop, never `asChild`.

Hosted: `bun run registry:build` writes `r/*.json` (generated, git-ignored), which any static host can serve; then `shadcn add https://<host>/button.json`. Locally, `shadcn add ./r/button.json` works after a build.

GitHub-direct (`shadcn add imanuragbanerjee/kit/button`) reads the source `registry.json` with no build. Private repositories work through your `gh` login; pin a release with `#<tag-or-sha>`, for example `imanuragbanerjee/kit/button#<sha>`.

`bun run test:fixtures` builds the registry, serves `r/` from a throwaway server, installs the Button into each fixture and builds each one.
