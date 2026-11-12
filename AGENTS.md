# kit: agent reference

Personal monorepo (Bun workspaces + Turborepo + Changesets). Read [README.md](README.md) first. Everything must stay framework-neutral: no Next-only or Astro-only code in the packages.

## Layout

- `tooling/oxc-config`: `@anuragbanerjee/oxc-config`. Raw JS in `src/` (no build) with hand-written `.d.ts`; `exports` map: `./oxfmt`, `./oxlint`, `./oxlint/{react,next,astro,shadcn}`. oxfmt has no `extends`, so consumers spread the object. Ultracite supplies the lint rules; every framework preset also includes the `@shadcn/lint` design-system rules (Ultracite's `shadcn` preset, with the plugin resolved from this package via `import.meta.resolve` so consumers install nothing extra). Components and the theme are discovered from each project's `components.json`; a UI source directory needs an override that turns off `shadcn/no-arbitrary-values`, `shadcn/no-restyle` and `shadcn/require-static-classes` (see the root `oxlint.config.ts`).
- `tooling/tsconfig`: `@anuragbanerjee/tsconfig`. JSON bases, no `include`/`paths`/`types` (consumers set them).
- `packages/theme`: `@anuragbanerjee/theme`. CSS only. Every export lists `style` and `default` conditions.
- `packages/ui`: `@anuragbanerjee/ui`, **private**. Upstream primitives in `src/components/ui` (see `primitives.json`), our own components beside them, `registry.json` with the items. `components.json` uses style `base-vega`.
- `fixtures/*`: private apps. `src/components/ui/button.tsx` in each is written by `shadcn add` from the local registry; do not hand-edit it.
- Root `registry.json`: only `name`, `homepage` and `include`. Add items to the included files, not here.

Folder names equal the package name suffix (`tooling/oxc-config` is `@anuragbanerjee/oxc-config`). Files and folders are kebab-case.

## Conventions

- Format with oxfmt, lint with oxlint (type-aware). Run `bun run check` before committing; hooks run on staged files. CI (`.github/workflows/ci.yml`) runs format check, lint, typecheck, build and `test:fixtures`, then fails if the fixtures drift from the registry source.
- `.astro` formatting needs `@astrojs/compiler-rs` and `astro: { compressHTML: "html" }`.
- `astro check` needs TypeScript 6, so TypeScript is pinned to `^6` in the catalog.
- Exact tool versions live only in `.tool-versions`; workflows use `node-version-file` and `bun-version-file` pointing at it. `package.json` has `devEngines` ranges instead of a pinned `packageManager` (Turborepo requires one of the two). Bump Node or Bun by editing `.tool-versions` only.
- `prepare` is `lefthook install || true` (it fails without a `.git`).
- Bun uses the isolated linker (`bunfig.toml`), so a package can only import what it declares; an undeclared (phantom) dependency fails the build. Do not switch it back to hoisted.
- Every external version lives once in the root `workspaces.catalog`; package manifests use `catalog:`. Exceptions: `peerDependencies` (explicit ranges) and `dependencies` of published packages (explicit, see Changesets below). `bun run taze` reports updates, `bun run taze:fix` writes them; TypeScript stays on 6 until `@astrojs/check` supports 7.
- oxlint ignores `ignorePatterns` from extended configs, so presets export them. `options.typeAware` only works in the root config; nested `oxlint.config.ts` files (fixtures) pick up their own preset.
- Components compose with Base UI's `render` prop (add `nativeButton={false}` when rendering a non-button element), never `asChild`; custom components that need it use `useRender` + `mergeProps` from `@base-ui/react`. No coss ui or other third-party registry dependency.
- Take reference from public, well-maintained projects (shadcn-ui/ui, shadcn-ui/lint, Ultracite), not from company-internal repos.
- Commit style: `chore:` / `feat:` / `fix:`, small and logical.

## UI primitives and registry items

**Core primitives are never edited by hand.** `packages/ui/src/components/ui/<name>.tsx` files listed in `packages/ui/primitives.json` are the shadcn/ui `base-vega` components written by `shadcn add`. They are excluded from oxfmt and oxlint, and they only change through `bun run ui:sync` (re-fetches them from upstream). `bun run ui:check` syncs and fails if the result differs from what is committed, which catches hand edits. If a primitive needs different behaviour, build a custom component that wraps it instead.

The primitives are React-only, not framework-specific: shadcn publishes one component set per style and the same `button.tsx` works in Next.js and Astro (the two fixtures hold byte-identical copies). If something genuinely needs a framework API (for example `next/link`), make it a separate item with its own name instead of forking a primitive.

Add a primitive: add its name to `primitives.json`, run `bun run ui:sync`, then add the registry item (below). Commit the generated file as is.

Custom components (ours, not upstream) live in `packages/ui/src/components/` (next to, not inside, the synced files, or inside `ui/` under a name that is not in `primitives.json`). They are formatted and linted normally, with the `@shadcn/lint` restyle rules off for this directory. Import the class helper like upstream does: `import { cn } from "cn"` (the `cn` package, not a local `utils` file).

The registry sources follow the shadcn house style (no semicolons; `oxfmt.config.ts` override for `packages/ui/src/**`). With `rsc: false` the shadcn CLI strips `"use client"` only when the directive has no trailing semicolon, so keep custom components that need the directive semicolon-free.

Add an item (primitive or custom):

1. Add the item to `packages/ui/registry.json`: `name`, `type`, `title`, `description`, `dependencies` (npm), `files: [{ "path": "src/components/ui/<name>.tsx", "type": "registry:ui", "target": "@ui/<name>.tsx" }]`. The `@ui/` target is required: without it a path containing the `ui` folder is nested wrongly. Item names are unique across all included files.
2. `bun run registry:build && bun run registry:validate`.
3. Add the item to each fixture's `test:registry` script, run `bun run test:fixtures`, commit the changed fixture files.
4. Dependencies on other items in this registry must use the full GitHub address (`imanuragbanerjee/kit/<item>`), which does not resolve for hosted registries; prefer self-contained items.

`r/` is generated by `shadcn build` and is git-ignored. GitHub-direct installs read the source files, and a hosting app will rebuild `r/`.

## Themes

1. Add `packages/theme/themes/<name>.css`: light variables on `[data-theme="<name>"]`, dark on `.dark [data-theme="<name>"], [data-theme="<name>"].dark`. `default.css` is the only theme on `:root`/`.dark`.
2. Add a `theme-<name>` item (`registry:theme`, `cssVars.light` and `cssVars.dark` mirroring the CSS) to `packages/theme/registry.json`.
3. Add a row to `packages/theme/README.md`. The `themes/*` export is a wildcard, so `package.json` needs no change.
4. Add a changeset (`minor`).

## Changesets and releases

Published packages: `tooling/oxc-config`, `tooling/tsconfig`, `packages/theme` (`access: public`). `packages/ui` and the fixtures are private, so Changesets skips them.

1. `bun run changeset`, pick the packages and bump type, describe the change.
2. Commit the generated `.changeset/*.md` with the change.
3. `release.yml` follows shadcn-ui/lint: a `check` job picks the mode, a `version` job opens the "Version Packages" PR, and a `publish` job (the only one with `id-token: write`) publishes the tarballs `check` packed. It is manual-only for now; see `.github/RELEASING.md`. Changelogs use `@changesets/changelog-github`; private packages are never versioned or tagged (`privatePackages`). Never publish by hand and never from an agent session.
4. Everything runs on Bun except publishing: Changesets publishes with the npm CLI, because OIDC trusted publishing and provenance are npm features (`bun publish` has neither). The runner's Node 26 already ships a new enough npm, so there is no npm install step.
5. Published packages set `publishConfig.provenance`, which needs trusted publishing from GitHub Actions. Published manifests must not use `workspace:` or `catalog:` in `dependencies` or `peerDependencies` (`npm publish` does not rewrite them). They are fine in `devDependencies`.

## Not done yet

- npm publishing: the packages do not exist on npm, and trusted publishing can only be configured once they do (first publish needs a token). Published versions record the repository URL permanently, so confirm it is `imanuragbanerjee/kit` first.
- Once the repository is public, never rewrite history on `main`: old commits stay reachable on GitHub through pull request references. Re-run the safety scan (no secrets, emails or phone numbers in the tree or history) before any change of visibility.
