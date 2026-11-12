---
name: changeset
description: Add a changeset for a change to a published package in a Changesets monorepo. Use when you change published package files, when asked to add a changeset, or to decide whether one is needed.
---

# Add a changeset

A changeset records which published packages changed, by how much, and the changelog line. The release workflow turns merged changesets into a "Version Packages" PR, tags and publishes. Never run `changeset version` or `changeset publish` yourself.

## Is one needed?

Look at what changed:

- A published package (a workspace package without `"private": true`) changed in a way its users would see: code, config, exports, dependencies or its README. Add one.
- Anything else (CI, docs at the repo root, tests, private packages, registry items): no changeset.

## Write it

The CLI is interactive, so write the file by hand: `.changeset/<adjective-noun-verb>.md`, for example `quiet-owls-sing.md`.

```md
---
"@scope/package-a": patch
"@scope/package-b": minor
---

One or two plain sentences: what changed and why, plus what a consumer must do if it breaks.
```

- List only the packages that changed, using the exact `name` from each `package.json`.
- Bump: `patch` for fixes, docs and dependency updates, `minor` for new things. A package on `0.x` never gets `major`: breaking changes are a `minor` too. Moving to `1.0.0` or later is the owner's decision, so ask first.
- Majors are rare and batched: if the change is breaking, collect it with other breaking changes into one release instead of shipping each on its own.
- Commit it with the change, in the same PR.
- Check with `bun changeset status --since=main`.

## Releasing

Merge the PR. The workflow opens or updates the Version Packages PR; merging that publishes.
