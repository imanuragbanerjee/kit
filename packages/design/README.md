# @anuragbanerjee/design

Tailwind CSS v4 theme: the shadcn colour mapping, fonts and colour themes. CSS only, no build step.

```sh
bun add @anuragbanerjee/design tailwindcss
# optional peers: fonts
bun add @fontsource-variable/geist @fontsource-variable/geist-mono
# for shadcn components that animate (Dialog, Select, ...)
bun add tw-animate-css shadcn
```

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@import "@anuragbanerjee/design/base";
@import "@anuragbanerjee/design/fonts"; /* optional, needs the fontsource peers */
@import "@anuragbanerjee/design/themes/base"; /* or themes/personal */
```

| Import            | Contents                                                            |
| ----------------- | ------------------------------------------------------------------- |
| `base`            | `@theme inline` colour and radius mapping, dark variant, base layer |
| `fonts`           | Geist Sans and Mono via Fontsource, `--font-sans`, `--font-mono`    |
| `themes/base`     | Neutral palette on `:root` and `.dark`                              |
| `themes/personal` | Placeholder indigo palette on `:root` and `.dark`                   |

Import exactly one theme per app. Dark mode follows a `.dark` class on an ancestor.

The same palettes ship as shadcn `registry:theme` items (`theme-base`, `theme-personal`) from the repository registry.
