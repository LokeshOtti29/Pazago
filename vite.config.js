import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcssVite from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcssVite()],
  base: process.env.VITE_BASE_PATH || "/weatherAgentApp-LokeshOtti",
});
