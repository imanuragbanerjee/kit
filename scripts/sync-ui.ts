/** Re-fetches the shadcn/ui primitives in packages/ui/primitives.json from upstream. */
import { $ } from "bun";

import manifest from "../packages/ui/primitives.json" with { type: "json" };

await $`bunx shadcn add ${manifest.primitives} --yes --overwrite`.cwd(
  `${import.meta.dirname}/../packages/ui`,
);
