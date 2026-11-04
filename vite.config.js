import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The base path is only needed for the production build (GitHub Pages)
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/YOUR-TASK3-REPO-NAME/" : "/",
  plugins: [react()],
}));
