---
"@anuragbanerjee/oxlint-config": patch
---

The `next` preset turns off `eslint/require-await` for `next.config.*`, since Next's async `headers()`, `redirects()` and `rewrites()` have nothing to await.
