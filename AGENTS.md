# kit: agent reference

Personal monorepo (Bun workspaces, Turborepo, Changesets). See [README.md](README.md). Keep everything framework-neutral: no Next-only code in the packages.

## Layout

- `tooling/oxc-config`: oxfmt preset (spread it, oxfmt has no `extends`) and oxlint presets `./oxlint`, `./oxlint/{react,next}`. Raw JS plus hand-written `.d.ts`, no build. The framework presets include Ultracite's `shadcn` preset, so every project that lints with them needs `@shadcn/lint` installed.
- `tooling/tsconfig`: JSON bases; consumers set `include`, `paths` and `types`.
- `packages/design`: CSS only; every export lists `style` and `default` conditions.
- `packages/ui` (private): our own components and `registry.json`, plus the vendored shadcn primitives in `src/components/ui`.
- `fixtures/*` (private): a Next.js app; their `src/components/ui/button.tsx` comes from `shadcn add`.
- Root `registry.json` only has `name`, `homepage` and `include`.

Folder names match the package name suffix. Files and folders are kebab-case.

## Conventions

- oxfmt and oxlint (type-aware). Run `bun run check` before committing.
- Exact Node and Bun versions live only in `.tool-versions`; `package.json` has `devEngines` ranges.
- Bun uses the isolated linker: a package can only import what it declares.
- Every external version lives once in `workspaces.catalog` (use `catalog:`). Peer ranges and `dependencies` of published packages stay explicit.
- `options.typeAware` only works in the root oxlint config; nested configs (fixtures) use their own preset. Presets cannot carry `ignorePatterns`, so they are exported.
- Compose with Base UI's `render` prop (`nativeButton={false}` for non-buttons), never `asChild`. No coss ui or other third-party registry dependency.
- Reference public projects (shadcn-ui/ui, shadcn-ui/lint, Ultracite), not company-internal repos.
- Commits: `chore:` / `feat:` / `fix:`, small and logical.

## shadcn primitives and registry items

- Never hand-edit `components/ui`. It is upstream `base-vega`, vendored for development only, excluded from oxfmt and oxlint. `bun run ui:sync` re-fetches it (add the name to that script for a new primitive); `upstream.yml` runs weekly and fails on a diff.
- Registry items do not republish primitives. They declare `registryDependencies: ["button"]` so consumers get upstream from shadcn.
- Our components live in `packages/ui/src` outside `components/ui`. Use `import { cn } from "cn"`. A component that needs `"use client"` must be formatted without semicolons, or the CLI will not strip it for `rsc: false` consumers.

Add an item: put it in `packages/ui/registry.json` with `files: [{ "path": "src/<name>.tsx", "type": "registry:ui", "target": "@ui/<name>.tsx" }]` (the `@ui/` target is required), then `bun run registry:build && bun run registry:validate`. `r/` is generated and git-ignored.

## Themes

Add `packages/design/themes/<name>.css` (light on `:root`, dark on `.dark`; an app imports exactly one theme), a matching `theme-<name>` item in `packages/design/registry.json`, a README row and a `minor` changeset.

## Releases

Published: `tooling/oxc-config`, `tooling/tsconfig`, `packages/design`. Add a changeset with `bun run changeset`. `release.yml` (split `check`, `version`, `publish` jobs, manual for now) is described in `.github/RELEASING.md`. Everything runs on Bun except publishing, which uses npm because trusted publishing and provenance are npm features. Never publish by hand or from an agent session.

## Not done yet

- npm publishing: trusted publishing can only be configured after the first publish, and published versions record the repository URL permanently.
- Once the repository is public, never rewrite history on `main`. Re-run the safety scan (no secrets, emails or phone numbers in the tree or history) before any change of visibility.
