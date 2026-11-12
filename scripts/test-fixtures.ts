/**
 * Installs the Button registry item into each fixture the way a consumer
 * would, then builds the fixture.
 *
 *   1. `shadcn build` writes r/*.json from registry.json.
 *   2. A throwaway static server serves r/ (what a hosted registry would do).
 *   3. `shadcn add <url>/button.json` writes the item into every fixture.
 *   4. The fixture builds.
 *
 * The installed files are committed, so `git diff` after a run shows drift
 * between the registry source and what the fixtures contain.
 */
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const fixtures = ["next", "astro", "tanstack-start"];

// Must be async: the static server lives in this process, so a blocking
// spawn would starve it and `shadcn add` would hang.
async function run(
  command: string,
  args: string[],
  cwd: string,
): Promise<void> {
  const child = spawn(command, args, { cwd, stdio: "inherit" });
  const result: unknown[] = await once(child, "close");
  if (result[0] !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed in ${cwd}`);
  }
}

await run("bun", ["run", "registry:build"], root);

const server = createServer((request, response) => {
  const name = (request.url ?? "/").replace(/^\//u, "");
  const file = path.join(root, "r", name);
  if (!name || !existsSync(file)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { "content-type": "application/json" });
  response.end(readFileSync(file));
});
server.listen(0, "127.0.0.1");
await once(server, "listening");
const address = server.address();
const port = typeof address === "object" && address ? address.port : 0;
const registry = `http://127.0.0.1:${port}`;

try {
  for (const name of fixtures) {
    const cwd = path.join(root, "fixtures", name);
    const target = path.join(cwd, "src/components/ui/button.tsx");
    rmSync(target, { force: true });
    await run(
      "bunx",
      ["shadcn", "add", `${registry}/button.json`, "--yes", "--overwrite"],
      cwd,
    );
    // The registry must hand out the synced primitive byte for byte.
    if (
      readFileSync(target, "utf-8") !==
      readFileSync(
        path.join(root, "packages/ui/src/components/ui/button.tsx"),
        "utf-8",
      )
    ) {
      throw new Error(
        `${name}: installed button differs from the registry source`,
      );
    }
    await run("bun", ["run", "build"], cwd);
  }
} finally {
  server.close();
}

console.log(
  "All fixtures installed the button from the local registry and built.",
);
