# kit: agent reference

Bun workspaces, Turborepo, Changesets. [README.md](README.md) has the layout, setup and registry items; this file only adds rules. Keep everything framework-neutral: no Next-only code in the packages.

## Layout notes

- `tooling/oxfmt-config` and `tooling/oxlint-config`: raw JS plus hand-written `.d.ts`, no build. oxfmt has no `extends`, so consumers spread the preset. Packages are named `@anuragbanerjee/<tool>-config` (`tsconfig` is the exception, since that is the tool's own name). The oxlint framework presets include Ultracite's `shadcn` preset, so projects that lint with them install `@shadcn/lint`.
- `tooling/tsconfig`: JSON bases; consumers set `include`, `paths` and `types`.
- Root `registry.json` has `include` plus `items` for the GitHub and project-file items. Those items point at this repo's own files (`.github/**`, `.editorconfig`, `lefthook.yml`, `.vscode`), so edit those files directly: they are what we run and what we publish.
- `templates/` holds the generic starter files that are not ours (`AGENTS.md`, oxfmt/oxlint stubs). Name config templates `*-config.ts` so oxlint does not treat them as nested configs.
- Folder names match the package name suffix; files and folders are kebab-case.

## Conventions

- oxfmt and oxlint (type-aware). Run `bun run check` before committing.
- Exact Node and Bun versions live only in `.tool-versions`; `package.json` has `devEngines` ranges (Turborepo needs one of the two).
- Bun uses the isolated linker: a package can only import what it declares.
- Every external version lives once in `workspaces.catalog` (use `catalog:`). Peer ranges and `dependencies` of published packages stay explicit.
- `options.typeAware` only works in the root oxlint config; nested configs (fixtures) use their own preset. Presets cannot carry `ignorePatterns`, so they are exported.
- Compose with Base UI's `render` prop (`nativeButton={false}` for non-buttons), never `asChild`. No coss ui or other third-party registry dependency.
- Reference public projects (shadcn-ui/ui, shadcn-ui/lint, Ultracite), not company-internal repos.
- Commits: `chore:` / `feat:` / `fix:`, small and logical.

## shadcn

For registry authoring and CLI usage follow the `shadcn` skill (`.agents/skills/shadcn/registry.md`, `cli.md`).

- Never hand-edit `components/ui`: it is upstream `base-vega`, vendored for development only and excluded from oxfmt and oxlint. `bun run ui:sync` re-fetches it (add the name to that script for a new primitive); `upstream.yml` runs weekly and fails on a diff.
- Registry items do not republish primitives; they declare `registryDependencies: ["button"]`.
- Our components live in `packages/ui/src` outside `components/ui` and use `import { cn } from "cn"`. A component that needs `"use client"` must be formatted without semicolons, or the CLI will not strip it for `rsc: false` consumers.
- Component items go in `packages/ui/registry.json` with `target: "@ui/<name>.tsx"` (required, or the CLI nests the file wrongly); plain-file items go in the root `registry.json`. Then `bun run registry:build && bun run registry:validate`. `r/` is generated and git-ignored; `pages.yml` publishes it.
- Themes: add `packages/design/themes/<name>.css` (light on `:root`, dark on `.dark`; an app imports one theme) and a matching item in `packages/design/registry.json` (`theme` for the default `base`, otherwise the name).

## Agent skills

Installed with the skills.sh CLI (`.agents/skills`, symlinked from `.claude/skills`, locked in `skills-lock.json`). Update with `bunx skills update`; they are third-party files, so do not edit them and keep them out of oxfmt and oxlint. Our own skills live in `skills/<name>/SKILL.md`; edit them there, then reinstall with `bunx skills add . --skill <name> --yes`.

## Releases

Published to npm: `tooling/oxfmt-config`, `tooling/oxlint-config` and `tooling/tsconfig`; themes only through the registry. Add a changeset with the `changeset` skill (or `bun run changeset`); `release.yml` runs on every push to `main` and is described in `.github/RELEASING.md`. Everything runs on Bun except publishing, which uses npm (trusted publishing and provenance are npm features). Never publish by hand or from an agent session.

## Safety

- Once the repository is public, never rewrite history on `main`. Re-run the safety scan (no secrets, emails or phone numbers in the tree or history) before any change of visibility.
