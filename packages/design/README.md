# design

Private source of our theme registry items. Not published to npm: apps get a theme with the shadcn CLI.

```sh
bunx shadcn@latest init
bunx shadcn@latest add imanuragbanerjee/kit/theme
```

`shadcn init` writes the Tailwind colour mapping; the theme item then writes its colour variables to `:root` and `.dark`. To update an app later, re-run the `add` with `--overwrite` and review the diff. Pin a release with `#<tag-or-sha>`.

| Theme      | Contents                                  |
| ---------- | ----------------------------------------- |
| `theme`    | Default neutral palette                   |
| `personal` | Neutral palette with translucent surfaces |

Files here:

- `themes/*.css` and `registry.json`: the two palettes as CSS and as `registry:theme` items. Keep them identical.
- `base.css`: the `@theme inline` colour and radius mapping, dark variant and base layer. The Next fixture and `packages/ui` import it.
- `fonts.css`: Geist Sans and Mono through Fontsource, imported by the fixture.

The `preset` item uses our own `geist-mono` font item instead of shadcn's `font-geist-mono`. `shadcn init` makes every font item the site-wide default unless the item sets a `selector`; ours sets `code, kbd, pre, samp`, so Geist Sans stays the body font and Geist Mono is `--font-mono` for code.
