/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import tsconfigPath from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  process.env = Object.assign(process.env, env);
  return {
    plugins: [react(), tsconfigPath()],
  };
});
