# Releasing

Releases use [Changesets](https://github.com/changesets/changesets) and npm trusted publishing (OIDC), so no npm token is stored anywhere.

1. Run `bun run changeset`, choose a version bump and write a changelog entry. Commit the generated file with your change.
2. On every push to `main`, `release.yml` opens or updates the "Version Packages" PR, which collects every pending changeset.
3. Merging that PR versions the packages and writes the changelogs. The workflow then runs `verify`, packs the tarballs and publishes them with provenance.

Pushes to `main` never publish by themselves; a release happens when you merge the Version Packages PR, so you pick the cadence. Each package is bumped once per release, by the largest bump among the batched changesets.

To keep version numbers low:

- Add a changeset only when a published package changes in a way consumers notice. Docs, CI and fixture changes need none (`bun run changeset --empty` if a PR touches a published package but should not release).
- Stay on `0.x` until the presets are stable: `patch` for fixes, `minor` for features and breaking changes.

Published: `@anuragbanerjee/oxfmt-config`, `@anuragbanerjee/oxlint-config`, `@anuragbanerjee/tsconfig`. Changesets skips private packages (`packages/design`, `packages/ui`, fixtures).

## Setup already done

- GitHub: Settings > Actions > General > "Allow GitHub Actions to create and approve pull requests".
- npm: a trusted publisher on each package (owner `imanuragbanerjee`, repo `kit`, workflow `release.yml`). To add a package later: `npm trust github <package> --file release.yml --repo imanuragbanerjee/kit --allow-publish` (needs 2FA). If npm refuses a package that does not exist yet, publish it once by hand (`npm publish --access public`) first.
- Optional hardening: each package's Settings > Publishing access > "Require two-factor authentication and disallow tokens".

Pull requests opened with `GITHUB_TOKEN` do not trigger CI. The release workflow still runs `verify` before publishing; for CI on the Version Packages PR itself, pass a GitHub App token to `changesets/action/version` through `github-token`.
