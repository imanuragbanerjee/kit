/**
 * Syncs the shadcn/ui primitives listed in packages/ui/primitives.json from
 * upstream into packages/ui/src/components/ui, then (with --check) fails if
 * that changed anything, which is how hand edits are caught.
 *
 *   bun run ui:sync    write the upstream files
 *   bun run ui:check   sync, then fail if the working tree differs
 */
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";

import manifest from "../packages/ui/primitives.json" with { type: "json" };

const root = path.resolve(import.meta.dirname, "..");
const ui = path.join(root, "packages/ui");
async function run(
  command: string,
  args: string[],
  cwd: string,
): Promise<number> {
  const child = spawn(command, args, { cwd, stdio: "inherit" });
  const result: unknown[] = await once(child, "close");
  return typeof result[0] === "number" ? result[0] : 1;
}

const sync = await run(
  "bunx",
  ["shadcn", "add", ...manifest.primitives, "--yes", "--overwrite"],
  ui,
);
if (sync !== 0) {
  process.exit(sync);
}

if (process.argv.includes("--check")) {
  const drift = await run(
    "git",
    ["diff", "--exit-code", "--", "src/components/ui"],
    ui,
  );
  if (drift !== 0) {
    console.error(
      "Primitives differ from upstream. Do not hand-edit them: revert, or commit the sync if upstream changed.",
    );
    process.exit(1);
  }
}
