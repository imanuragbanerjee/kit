# design

Private source of our theme registry items. Not published to npm: apps get a theme with the shadcn CLI.

Apps install a theme with the shadcn CLI (`shadcn add imanuragbanerjee/kit/theme`); see the root README.

| Theme      | Contents                                  |
| ---------- | ----------------------------------------- |
| `theme`    | Default neutral palette                   |
| `personal` | Neutral palette with translucent surfaces |

Files here:

- `themes/*.css` and `registry.json`: the two palettes as CSS and as `registry:theme` items. Keep them identical.
- `base.css`: the `@theme inline` colour and radius mapping, dark variant and base layer. The Next fixture and `packages/ui` import it.
- `fonts.css`: Geist Sans and Mono through Fontsource, imported by the fixture.
