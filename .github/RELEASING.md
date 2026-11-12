# Releasing

Releases use [Changesets](https://github.com/changesets/changesets):

1. Run `bun run changeset`, choose a version bump, and write a changelog entry. Commit the generated file with your change.
2. On `main`, `release.yml` opens or updates the "Version Packages" PR.
3. Merging it versions the packages and writes the changelogs. The workflow then runs `verify`, packs the tarballs and publishes them to npm. Trusted publishing attaches provenance automatically.

Publishing uses OIDC trusted publishing. Each npm package must list this repository and `release.yml` as a trusted publisher, which can only be configured once the package exists, so the owner publishes each package once by hand (`npm publish --access public`, with 2FA) and then configures the trusted publisher. Changesets skips packages marked `private` (`packages/ui` and the fixtures) and never versions or tags them.

One-time repository setting: Settings > Actions > General > "Allow GitHub Actions to create and approve pull requests", otherwise the version job cannot open its PR. Pull requests opened with `GITHUB_TOKEN` do not trigger the CI workflow; pass a PAT or App token as `github-token` if the Version Packages PR needs CI.

`release.yml` is manual (`workflow_dispatch`) until trusted publishing is set up and the repository URL is confirmed, because published packages record it permanently.
