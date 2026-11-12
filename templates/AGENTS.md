# Agent guide

## Commands

- `bun run check`: format and lint.
- `bun run typecheck`: TypeScript.
- `bun run build`: production build.

## Conventions

- Format with oxfmt and lint with oxlint; hooks run both on staged files.
- Never hand-edit `components/ui`: it is shadcn/ui code written by `shadcn add`.
- Commits: `feat:`, `fix:`, `chore:`, small and logical.
