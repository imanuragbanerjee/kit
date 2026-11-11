import { defineConfig } from "taze";

export default defineConfig({
  // bump to the latest stable version of every dependency
  mode: "latest",
  // `bun run taze` only reports; `bun run taze:fix` writes and installs
  write: false,
  install: false,
  // catalogs and workspace packages are covered by recursive mode
  recursive: true,
  // never auto-pin pre-releases
  includeLocked: false,
});
