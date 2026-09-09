import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const srcDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "src");

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": srcDir } },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    // Without this, Vitest hands next-intl's "next/navigation" deep import to
    // Node's native SSR resolver, which (unlike Vite's) requires the literal
    // ".js" extension since "next" has no package.json "exports" map.
    server: { deps: { inline: [/next-intl/] } },
  },
});
