# Releasing

Releases use [Changesets](https://github.com/changesets/changesets):

1. Run `bun run changeset`, choose a version bump, and write a changelog entry. Commit the generated file with your change.
2. On `main`, `release.yml` opens or updates the "Version Packages" PR.
3. Merging it versions the packages and writes the changelogs. The workflow then runs `verify`, packs the tarballs and publishes them to npm. Trusted publishing attaches provenance automatically.

Publishing uses npm trusted publishing (OIDC), so no npm token is stored anywhere.

## One-time setup

1. GitHub: Settings > Actions > General > "Allow GitHub Actions to create and approve pull requests". Without it the version job cannot open its PR.
2. npm, for each of the two packages: add a trusted publisher (package Settings > Trusted Publisher > GitHub Actions) with owner `imanuragbanerjee`, repository `kit`, workflow `release.yml`, allowing `npm publish`. The CLI equivalent is `npm trust github <package> --file release.yml --repo imanuragbanerjee/kit --allow-publish` (npm 11.10 or later, needs 2FA). A new configuration must complete a successful publish within 2 days, so create it right before enabling the release trigger.
3. If npm refuses to configure a package that has never been published, publish it once by hand (`npm publish --access public`, with 2FA), then do step 2.
4. Optional hardening once it works: package Settings > Publishing access > "Require two-factor authentication and disallow tokens".
5. Enable the `push: branches: [main]` trigger in `release.yml`.

Pull requests opened with `GITHUB_TOKEN` do not trigger the CI workflow. The release workflow still runs `verify` before publishing; if you also want CI on the Version Packages PR, create a GitHub App and pass its token to `changesets/action/version` through `github-token` (shadcn-ui/lint does this).

Changesets skips packages marked `private` (`packages/ui` and the fixtures) and never versions or tags them.

## Cadence and version numbers

Pushes to `main` never publish. With the push trigger on, they only open or update the Version Packages PR, which accumulates every pending changeset. A release happens when you merge that PR, so you choose the cadence (for example weekly, or earlier by merging it yourself). However many changesets are batched, each package is bumped once per release, by the largest bump among them.

To keep version numbers low:

- Only add a changeset when a published package changes in a way consumers notice; docs, CI and fixture changes need none (`bun run changeset --empty` if a PR touches a published package but should not release).
- Stay on `0.x` until the presets are stable: `patch` for fixes, `minor` for features and breaking changes.
- Do not merge the Version PR on every push; let several changes accumulate.

`release.yml` is manual (`workflow_dispatch`) until trusted publishing is set up and the repository URL is confirmed, because published packages record it permanently.
