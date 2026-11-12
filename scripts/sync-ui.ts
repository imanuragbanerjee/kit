/**
 * Syncs the shadcn/ui primitives listed in packages/ui/primitives.json from
 * upstream into packages/ui/src/components/ui.
 *
 *   bun run ui:sync    write the upstream files
 *   bun run ui:check   sync, then fail if any primitive changed, which means
 *                      either a hand edit or a newer upstream version
 */
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import manifest from "../packages/ui/primitives.json" with { type: "json" };

const ui = path.resolve(import.meta.dirname, "../packages/ui");
const files = manifest.primitives.map((name) =>
  path.join(ui, "src/components/ui", `${name}.tsx`),
);

function snapshot(): Map<string, string> {
  return new Map(
    files.map((file) => [
      file,
      existsSync(file) ? readFileSync(file, "utf-8") : "",
    ]),
  );
}

async function run(command: string, args: string[]): Promise<number> {
  const child = spawn(command, args, { cwd: ui, stdio: "inherit" });
  const result: unknown[] = await once(child, "close");
  return typeof result[0] === "number" ? result[0] : 1;
}

const before = snapshot();
const status = await run("bunx", [
  "shadcn",
  "add",
  ...manifest.primitives,
  "--yes",
  "--overwrite",
]);
if (status !== 0) {
  process.exit(status);
}

if (process.argv.includes("--check")) {
  const after = snapshot();
  const changed = files.filter((file) => before.get(file) !== after.get(file));
  if (changed.length > 0) {
    console.error(
      `Primitives differ from upstream (now restored): ${changed.map((file) => path.relative(ui, file)).join(", ")}.\nDo not hand-edit them; if upstream changed, commit the sync.`,
    );
    process.exit(1);
  }
}
