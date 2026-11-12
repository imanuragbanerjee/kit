# Releasing

Releases use [Changesets](https://github.com/changesets/changesets):

1. Run `bun run changeset`, choose a version bump, and write a changelog entry. Commit the generated file with your change.
2. On `main`, `release.yml` opens or updates the "Version Packages" PR.
3. Merging it versions the packages and writes the changelogs. The workflow then runs `verify`, packs the tarballs and publishes them to npm with provenance.

Publishing uses OIDC trusted publishing. Each npm package must list this repository and `release.yml` as a trusted publisher, which can only be configured once the package exists (the first publish needs a token). Changesets skips packages marked `private` (`packages/ui` and the fixtures) and never versions or tags them.

`release.yml` is manual (`workflow_dispatch`) until trusted publishing is set up and the repository URL is confirmed, because published packages record it permanently.
