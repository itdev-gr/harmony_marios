import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const srcDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "src");

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": srcDir } },
  test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"], globals: true },
});
