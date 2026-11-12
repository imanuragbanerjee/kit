# @anuragbanerjee/theme

Tailwind CSS v4 theme: the shadcn colour mapping, fonts, typography and colour themes. CSS only, no build step.

```sh
bun add @anuragbanerjee/theme tailwindcss
# optional peers: fonts and prose styles
bun add @fontsource-variable/geist @fontsource-variable/geist-mono @tailwindcss/typography
```

```css
@import "tailwindcss";

@import "@anuragbanerjee/theme/base";
@import "@anuragbanerjee/theme/fonts"; /* optional, needs the fontsource peers */
@import "@anuragbanerjee/theme/typography"; /* optional, needs @tailwindcss/typography */
@import "@anuragbanerjee/theme/themes/base";
@import "@anuragbanerjee/theme/themes/personal";
```

| Import            | Contents                                                            |
| ----------------- | ------------------------------------------------------------------- |
| `base`            | `@theme inline` colour and radius mapping, dark variant, base layer |
| `fonts`           | Geist Sans and Mono via Fontsource, `--font-sans`, `--font-mono`    |
| `typography`      | `@plugin "@tailwindcss/typography"`                                 |
| `themes/base`     | Neutral palette on `:root` and `.dark`                              |
| `themes/personal` | Placeholder indigo palette, opt in with `data-theme="personal"`     |

Dark mode follows a `.dark` class on an ancestor. Pair a theme with it, for example `<html class="dark" data-theme="personal">`.

The same palettes ship as shadcn `registry:theme` items (`theme-base`, `theme-personal`) from the repository registry.
