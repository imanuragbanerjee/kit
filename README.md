# kit

Personal shared repo: a Tailwind v4 theme, tooling presets and a shadcn registry. Framework-neutral on purpose; a Next.js fixture covers it.

| Path                 | Package                      | Published       | What                                                |
| -------------------- | ---------------------------- | --------------- | --------------------------------------------------- |
| `tooling/oxc-config` | `@anuragbanerjee/oxc-config` | npm             | oxfmt preset and oxlint presets (core, react, next) |
| `tooling/tsconfig`   | `@anuragbanerjee/tsconfig`   | npm             | tsconfig bases (base, react-library, nextjs)        |
| `packages/design`    | `@anuragbanerjee/design`     | never (private) | Tailwind v4 CSS: colour mapping, fonts, themes      |
| `packages/ui`        | `@anuragbanerjee/ui`         | never (private) | Home of our own registry components (none yet)      |
| `fixtures/*`         | `@anuragbanerjee/fixture-*`  | never (private) | A minimal Next.js app that consumes it              |

Not published to npm yet.

## Setup

The exact Node and Bun versions live only in `.tool-versions`; local tooling (mise, asdf) and every CI workflow read them from there. `package.json` carries `devEngines` ranges (`node >=26`, `bun ^1.4.4`), which Turborepo needs to detect the package manager but which are compatibility ranges, not pins.

```sh
bun install
bun run verify   # format check + lint + typecheck + build (all packages and fixtures)
```

Other scripts: `format`, `lint`, `lint:fix`, `check`, `typecheck`, `build`, `registry:build`, `registry:validate`, `test:fixtures`, `taze`, `changeset`, `version-packages`, `release`. Git hooks (Lefthook) run oxlint and oxfmt on staged files before commit and the typecheck before push.

## Using the packages

See the README in each package: [oxc-config](tooling/oxc-config/README.md), [tsconfig](tooling/tsconfig/README.md), [design](packages/design/README.md).

## Using the registry

`registry.json` at the repo root includes `packages/ui/registry.json` (our components), `packages/design/registry.json` (the `preset` and two themes) and `registry/registry.json` (project and GitHub files).

| Item                                                                                     | Type  | What it does                                                                                                  |
| ---------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------- |
| `preset`                                                                                 | base  | A whole project setup: base-vega on Base UI, lucide, Geist fonts, the personal theme. Use with `shadcn init`. |
| `theme`, `personal`                                                                      | theme | Colour variables for `:root` and `.dark`.                                                                     |
| `project-files`                                                                          | files | `.editorconfig`, `lefthook.yml`, VS Code settings, oxfmt and oxlint configs, `AGENTS.md`.                     |
| `github-ci`, `github-release`, `github-labeler`, `github-dependabot`, `github-templates` | files | Workflows, labeler, Dependabot and PR and issue templates.                                                    |

```sh
shadcn init imanuragbanerjee/kit/preset
shadcn add imanuragbanerjee/kit/github-ci
```

The shadcn/ui primitives in `packages/ui/src/components/ui` are vendored for development only (`bun run ui:sync`, never edited by hand) and are not republished: our own components declare `registryDependencies: ["button"]` and the CLI fetches the primitive from shadcn's registry.

`bun run registry:build` writes `r/*.json` (generated, git-ignored). Private repositories work through your `gh` login; pin a release with `#<tag-or-sha>`, for example `imanuragbanerjee/kit/theme#<sha>`. `shadcn init ./r/preset.json` and `shadcn add ./r/<item>.json` work locally after a build.

Apps update a theme by re-running `shadcn add … --overwrite` and reviewing the diff. `bun run test:fixtures` (a Turborepo task, also run weekly by `upstream.yml`) installs shadcn's latest Button into each fixture with `shadcn add` and builds each one.
